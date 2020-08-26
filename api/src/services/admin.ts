import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, MoreThan, Raw, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { IBasicResponse } from '../interfaces/response-types';
import { User } from '../entity/user';
import { ResponseStatusMessage } from '../interfaces/response';
import { Role } from '../interfaces/user';
import { IAddVoiceBody, IAddVoiceByTypeBody, IStatisticTotal } from '../interfaces/admin';
import { AddVoiceByTypeTransaction } from '../transaction/addVoiceByType';
import { classToPlain, plainToClass } from 'class-transformer';
import { PollTransaction } from '../entity';
import moment from 'moment';
import { isDef } from '../helpers/common';
import { EventStatus, ICreatePollBody } from '../interfaces/poll-event';
import { TransactionSource } from '../interfaces/poll-transaction';

@Service()
export default class AdminService {
  pollEventRepository: Repository<PollEvent>;
  songRepository: Repository<Song>;
  userRepository: Repository<User>;
  pollTransactionRepository: Repository<PollTransaction>;

  constructor(@Inject('logger') private logger, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    this.pollEventRepository = getRepository(PollEvent);
    this.songRepository = getRepository(Song);
    this.userRepository = getRepository(User);
    this.pollTransactionRepository = getRepository(PollTransaction);
  }

  public async userToAdmin(id: string): Promise<IBasicResponse> {
    try {
      const user = await this.userRepository.findOneOrFail({ id: id });
      user.role = Role.Admin;
      await user.save();

      return { status: ResponseStatusMessage.Success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addVoiceByUserId(body: IAddVoiceBody): Promise<IBasicResponse> {
    try {
      const data: IAddVoiceByTypeBody = { ...body, source: TransactionSource.ByAdmin };
      const transactionStatus = await AddVoiceByTypeTransaction(data);

      return { status: ResponseStatusMessage.Success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getAllUsers(skip: number, take: number, filter: string): Promise<IBasicResponse> {
    try {
      let data: User[];
      let count: number;
      if (isDef(skip) && isDef(take) && isDef(filter)) {
        [data, count] = await this.userRepository.findAndCount({
          order: { createdAt: 'ASC' },
          where: { email: Raw(alias => `LOWER(${alias}) Like '%${filter.toLowerCase()}%'`) },
          take: take,
          skip: skip,
        });
      } else if (isDef(skip) && isDef(take)) {
        [data, count] = await this.userRepository.findAndCount({
          order: { createdAt: 'ASC' },
          take: take,
          skip: skip,
        });
      } else {
        [data, count] = await this.userRepository.findAndCount({
          order: { createdAt: 'ASC' },
        });
      }

      return { data: data.map(x => classToPlain(x)), count: count };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getAllPolls(skip: number, take: number): Promise<IBasicResponse> {
    try {
      let data: PollEvent[];
      let count: number;
      if (isDef(skip) && isDef(take)) {
        [data, count] = await this.pollEventRepository.findAndCount({
          order: { createdAt: 'DESC' },
          take: take,
          skip: skip,
        });
      } else {
        [data, count] = await this.pollEventRepository.findAndCount({ order: { createdAt: 'DESC' } });
      }

      return { data: data.map(x => classToPlain(x)), count: count };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getAllTransactions(skip: number, take: number, filter: string): Promise<IBasicResponse> {
    try {
      let data: PollTransaction[];
      let count: number;

      if (isDef(skip) && isDef(take) && isDef(filter)) {
        count = await this.pollTransactionRepository
          .createQueryBuilder('poll_transaction')
          .leftJoin('poll_transaction.user', 'user')
          .addSelect('user.email')
          .where('user.email like :email', { email: '%' + filter + '%' })
          .orderBy('poll_transaction.createdAt', 'DESC')
          .getCount();

        data = await this.pollTransactionRepository
          .createQueryBuilder('poll_transaction')
          .leftJoin('poll_transaction.user', 'user')
          .addSelect('user.id')
          .addSelect('user.email')
          .addSelect('user.username')
          .where('user.email like :email', { email: '%' + filter + '%' })
          .orderBy('poll_transaction.createdAt', 'DESC')
          .skip(skip)
          .take(take)
          .getMany();
      } else if (isDef(skip) && isDef(take)) {
        count = await this.pollTransactionRepository
          .createQueryBuilder('poll_transaction')
          .leftJoin('poll_transaction.user', 'user')
          .addSelect('user.email')
          .orderBy('poll_transaction.createdAt', 'DESC')
          .getCount();

        data = await this.pollTransactionRepository
          .createQueryBuilder('poll_transaction')
          .leftJoin('poll_transaction.user', 'user')
          .addSelect('user.id')
          .addSelect('user.email')
          .addSelect('user.username')
          .orderBy('poll_transaction.createdAt', 'DESC')
          .skip(skip)
          .take(take)
          .getMany();
      } else {
        count = await this.pollTransactionRepository
          .createQueryBuilder('poll_transaction')
          .leftJoin('poll_transaction.user', 'user')
          .addSelect('user.email')
          .orderBy('poll_transaction.createdAt', 'DESC')
          .getCount();

        data = await this.pollTransactionRepository
          .createQueryBuilder('poll_transaction')
          .leftJoin('poll_transaction.user', 'user')
          .addSelect('user.id')
          .addSelect('user.email')
          .addSelect('user.username')
          .orderBy('poll_transaction.createdAt', 'DESC')
          .getMany();
      }

      return { data: data.map(x => classToPlain(x)), count: count };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getStatisticTotal(): Promise<IBasicResponse> {
    try {
      let totalUsers: number;
      let totalUsersToday: number;

      let totalTransactions: number;
      let totalTransactionsToday: number;

      totalUsers = await this.userRepository.count();
      totalUsersToday = await this.userRepository.count({
        createdAt: MoreThan(
          moment()
            .startOf('day')
            .format('YYYY-MM-DD HH:mm:ss')
            .toString(),
        ),
      });

      totalTransactions = await this.pollTransactionRepository.count();
      totalTransactionsToday = await this.pollTransactionRepository.count({
        createdAt: MoreThan(
          moment()
            .startOf('day')
            .format('YYYY-MM-DD HH:mm:ss')
            .toString(),
        ),
      });

      const result: IStatisticTotal = {
        totalUsers,
        totalUsersToday,
        totalTransactions,
        totalTransactionsToday,
      };

      return {
        data: result,
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createPoll(body: ICreatePollBody): Promise<IBasicResponse> {
    try {
      const newPollEventInstance = this.pollEventRepository.create(
        plainToClass(PollEvent, body, { excludeExtraneousValues: true }),
      );
      const data = await newPollEventInstance.save();

      return { data: data };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async editPoll(body: ICreatePollBody, id: string): Promise<IBasicResponse> {
    try {
      await this.pollEventRepository
        .createQueryBuilder()
        .update(PollEvent)
        .set({ ...body })
        .where('id = :id', { id: id })
        .execute();

      const editPoll = await this.pollEventRepository.findOne({
        where: { id: id },
      });

      return { data: editPoll };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async switchPollStatus(pollId: string) {
    try {
      const pollEvent = await this.pollEventRepository.findOneOrFail({ id: pollId });

      switch (pollEvent.status) {
        case EventStatus.Active:
          pollEvent.status = EventStatus.Inactive;
          break;
        case EventStatus.Inactive:
          pollEvent.status = EventStatus.Active;
          break;
        default:
          throw new Error('Wrong status');
      }

      await pollEvent.save();

      return { status: ResponseStatusMessage.Success, data: pollEvent };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
