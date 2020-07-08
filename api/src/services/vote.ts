import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { IBasicResponse } from '../interfaces/response-types';
import { User } from '../entity/user';
import { IGiveVoteBody } from '../interfaces/vote';
import { giveVoteTransaction } from '../transaction/giveVote';

@Service()
export default class VoteService {
  pollEventRepository: Repository<PollEvent>;
  songRepository: Repository<Song>;
  userRepository: Repository<User>;

  constructor(@Inject('logger') private logger, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    this.pollEventRepository = getRepository(PollEvent);
    this.songRepository = getRepository(Song);
    this.userRepository = getRepository(User);
  }

  public async giveVote(body: IGiveVoteBody, currentUser: User): Promise<IBasicResponse> {
    try {
      // User pre check
      if (currentUser.voiceBalance < body.voiceCount) {
        throw new Error('Low Voice Balance');
      }

      const transactionStatus = await giveVoteTransaction(body, currentUser);

      return { status: transactionStatus };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
