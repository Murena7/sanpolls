import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { IBasicResponse } from '../interfaces/response-types';
import { User } from '../entity/user';
import {
  IChangePassword,
  IUpdateProfile,
  IUserSongHistoryBody,
  IUserPollTransactionHistoryBody,
} from '../interfaces/user';
import { ResponseStatusMessage } from '../interfaces/response';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { PollTransaction } from '../entity';

@Service()
export default class UserService {
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

  public async updateProfile(body: IUpdateProfile, currentUser: User): Promise<IBasicResponse> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ ...body })
        .where('id = :id', { id: currentUser.id })
        .execute();

      const editedUser = await this.userRepository.findOne({
        where: { id: currentUser.id },
      });

      return { data: editedUser };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async changePassword(body: IChangePassword, currentUser: User): Promise<IBasicResponse> {
    try {
      const userWithPassword = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: currentUser.id })
        .addSelect('user.password')
        .getOne();

      this.logger.silly('Checking password');
      const validPassword = await argon2.verify(userWithPassword.password, body.oldPassword);
      if (!validPassword) {
        throw new Error('Wrong Password');
      }

      this.logger.silly('Hashing New password');
      const newSalt = randomBytes(32);
      userWithPassword.password = await argon2.hash(body.newPassword, { salt: newSalt });

      await userWithPassword.save();

      return { status: ResponseStatusMessage.Success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async userSongHistory(body: IUserSongHistoryBody, currentUser: User): Promise<IBasicResponse> {
    try {
      const take: number = +body.take || 2000;
      const skip: number = +body.skip || 0;

      const [result, total] = await this.songRepository
        .createQueryBuilder('song')
        .leftJoin('song.event', 'event')
        .addSelect('event.name')
        .where('song.userId = :userId', { userId: currentUser.id })
        .orderBy('song.createdAt', 'DESC')
        .skip(skip)
        .take(take)
        .getManyAndCount();

      return { data: result, count: total };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async userPollTransactionHistory(
    body: IUserPollTransactionHistoryBody,
    currentUser: User,
  ): Promise<IBasicResponse> {
    try {
      const take: number = +body.take || 3000;
      const skip: number = +body.skip || 0;

      const [result, total] = await this.pollTransactionRepository
        .createQueryBuilder('poll_transaction')
        .leftJoin('poll_transaction.song', 'song')
        .addSelect('song')
        .where('poll_transaction.userId = :userId', { userId: currentUser.id })
        .orderBy('poll_transaction.createdAt', 'DESC')
        .skip(skip)
        .take(take)
        .getManyAndCount();

      return { data: result, count: total };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
