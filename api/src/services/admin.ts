import { Inject, Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { IBasicResponse } from '../interfaces/response-types';
import { User } from '../entity/user';
import { ResponseStatusMessage } from '../interfaces/response';
import { Role } from '../interfaces/user';
import { IAddVoiceBody } from '../interfaces/admin';
import { AddVoiceByAdminTransaction } from '../transaction/addVoiceByAdmin';

@Service()
export default class AdminService {
  pollEventRepository: Repository<PollEvent>;
  songRepository: Repository<Song>;
  userRepository: Repository<User>;

  constructor(@Inject('logger') private logger, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    this.pollEventRepository = getRepository(PollEvent);
    this.songRepository = getRepository(Song);
    this.userRepository = getRepository(User);
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
}
