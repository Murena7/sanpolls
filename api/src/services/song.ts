import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { IBasicResponse } from '../interfaces/response-types';
import { plainToClass } from 'class-transformer';
import { User } from '../entity/user';
import { IAddSongBody } from '../interfaces/song';
import { addSongTransaction } from '../transaction/addSong';

@Service()
export default class SongService {
  pollEventRepository: Repository<PollEvent>;
  songRepository: Repository<Song>;
  userRepository: Repository<User>;

  constructor(@Inject('logger') private logger, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    this.pollEventRepository = getRepository(PollEvent);
    this.songRepository = getRepository(Song);
    this.userRepository = getRepository(User);
  }

  public async addSong(body: IAddSongBody, currentUser: User): Promise<IBasicResponse> {
    try {
      // User pre check
      if (currentUser.voiceBalance < 1 || currentUser.voiceBalance < body.voiceCount) {
        throw new Error('Low Voice Balance');
      }

      const transactionStatus = await addSongTransaction(body, currentUser);

      return { status: transactionStatus };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async songById(id: string): Promise<IBasicResponse> {
    try {
      const result = await this.songRepository.findOne({ id: id });
      if (!result) {
        throw new Error('Song not found');
      }

      return { data: result };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
