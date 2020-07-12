import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { IBasicResponse } from '../interfaces/response-types';
import { User } from '../entity/user';
import { ResponseStatusMessage } from '../interfaces/response';
import { Role } from '../interfaces/user';
import { IAddVoiceBody, IStatisticTotal } from '../interfaces/admin';
import { AddVoiceByAdminTransaction } from '../transaction/addVoiceByAdmin';
import { classToPlain } from 'class-transformer';
import { PollTransaction } from '../entity';
import moment from 'moment';
import { MoreThan } from 'typeorm';

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
      const transactionStatus = await AddVoiceByAdminTransaction(body);

      return { status: ResponseStatusMessage.Success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getAllUsers(skip: number, take: number): Promise<IBasicResponse> {
    try {
      let data: User[];
      let count: number;
      if (skip && take) {
        [data, count] = await this.userRepository.findAndCount({
          take: take,
          skip: skip,
        });
      } else {
        [data, count] = await this.userRepository.findAndCount();
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
      if (skip && take) {
        [data, count] = await this.pollEventRepository.findAndCount({
          take: take,
          skip: skip,
        });
      } else {
        [data, count] = await this.pollEventRepository.findAndCount();
      }

      return { data: data.map(x => classToPlain(x)), count: count };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getAllTransactions(skip: number, take: number): Promise<IBasicResponse> {
    try {
      let data: PollTransaction[];
      let count: number;
      if (skip && take) {
        [data, count] = await this.pollTransactionRepository.findAndCount({
          take: take,
          skip: skip,
        });
      } else {
        [data, count] = await this.pollTransactionRepository.findAndCount();
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
}
