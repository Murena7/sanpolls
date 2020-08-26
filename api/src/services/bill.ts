import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { IBasicResponse } from '../interfaces/response-types';
import { User } from '../entity/user';
import {
  Currency,
  IBillCreateBody,
  IBillCreateResponse,
  IStatusObmenkaBody,
  IStatusObmenkaResponse,
  PayType,
  Status,
} from '../interfaces/bill';
import { Bill } from '../entity/bill';
import config from '../config';
import { ResponseStatusMessage } from '../interfaces/response';
import axios from 'axios';
import crypto from 'crypto';
import { AddVoiceByTypeTransaction } from '../transaction/addVoiceByType';
import { IAddVoiceByTypeBody } from '../interfaces/admin';
import { TransactionSource } from '../interfaces/poll-transaction';

@Service()
export default class BillService {
  pollEventRepository: Repository<PollEvent>;
  songRepository: Repository<Song>;
  userRepository: Repository<User>;
  billRepository: Repository<Bill>;

  constructor(@Inject('logger') private logger, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    this.pollEventRepository = getRepository(PollEvent);
    this.songRepository = getRepository(Song);
    this.userRepository = getRepository(User);
    this.billRepository = getRepository(Bill);
  }

  private getObmenkaSign(body: string): string {
    const sha1SignRaw = crypto
      .createHash('sha1')
      .update(body)
      // @ts-ignore
      .digest('binary');
    const sha1Sign = Buffer.from(sha1SignRaw, 'binary').toString('base64');

    const md5Sign = crypto
      .createHash('md5')
      .update(`${config.bill.obmenkaSecret}${sha1Sign}${config.bill.obmenkaSecret}`)
      // @ts-ignore
      .digest('binary');

    return Buffer.from(md5Sign, 'binary').toString('base64');
  }

  public async getStatusObmenka(body: IStatusObmenkaBody): Promise<IBasicResponse> {
    try {
      const reqBody = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        payment_id: body.invoiceId,
      };

      const allSign = this.getObmenkaSign(JSON.stringify(reqBody));

      const obmenkaResponse = await axios.post(
        'https://acquiring_api.obmenka.ua/api/einvoice/status',
        {
          // eslint-disable-next-line @typescript-eslint/camelcase
          payment_id: body.invoiceId,
        },
        { headers: { DPAY_CLIENT: config.bill.obmenkaClientId, DPAY_SECURE: allSign } },
      );

      const data: IStatusObmenkaResponse = obmenkaResponse.data;

      if (data.status === Status.FINISHED) {
        const bill = await this.billRepository.findOneOrFail({ id: body.invoiceId });
        bill.status = Status.FINISHED;
        await bill.save();

        const transactionBody: IAddVoiceByTypeBody = {
          userId: bill.userId,
          amount: Math.ceil(bill.amount),
          source: TransactionSource.PayObmenka,
        };
        const transactionStatus = await AddVoiceByTypeTransaction(transactionBody);
      }

      return { status: ResponseStatusMessage.Success, data: { status: data.status } };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getBillHistoryByUser(currentUser: User): Promise<IBasicResponse> {
    try {
      const data = await this.billRepository.find({ where: { userId: currentUser.id }, order: { createdAt: 'DESC' } });

      return { data: data };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async create(body: IBillCreateBody, currentUser: User): Promise<IBasicResponse> {
    try {
      const payType = PayType.Obmenka;
      const currency = Currency.RUR;

      const createdBill = await this.billRepository
        .create({
          userId: currentUser.id,
          payType: payType,
          status: Status.CREATED,
          amount: body.amount,
          currency: currency,
        })
        .save();

      let result: IBillCreateResponse = {
        clientId: config.bill.obmenkaClientId,
        invoiceId: createdBill.id,
        amount: createdBill.amount,
        currency: currency,
        successUrl: `${config.serverApiUrl}/profile/refill?status=success`,
        failUrl: `${config.serverApiUrl}/profile/refill?status=fail`,
        statusUrl: `${config.serverApiUrl}/api/bill/status/obmenka?invoiceId=${createdBill.id}`,
      };

      const sign = this.getObmenkaSign(Object.values(result).join(''));
      const signOrder = 'CLIENT_ID;INVOICE_ID;AMOUNT;CURRENCY;SUCCESS_URL;FAIL_URL;STATUS_URL';

      // @ts-ignore
      result['sign'] = sign;
      result['signOrder'] = signOrder;

      return { data: result };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async removeById(billId: string, currentUser: User): Promise<IBasicResponse> {
    try {
      const bill = await this.billRepository.findOneOrFail({ id: billId });

      if (bill.userId !== currentUser.id || bill.status === Status.FINISHED) {
        throw new Error('You can not remove this bill');
      }

      await bill.remove();

      return { status: ResponseStatusMessage.Success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
