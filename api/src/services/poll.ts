import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { EventStatus } from '../interfaces/poll-event';

@Service()
export default class PollService {
  pollEventRepository: Repository<PollEvent>;
  songRepository: Repository<Song>;

  constructor(@Inject('logger') private logger, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    this.pollEventRepository = getRepository(PollEvent);
    this.songRepository = getRepository(Song);
  }

  public async activePoll({ skipCount, takeCount }): Promise<any> {
    try {
      const take = takeCount || 50;
      const skip = skipCount || 0;

      const activeEvent = await this.pollEventRepository.findOneOrFail({ status: EventStatus.Active });

      const [result, total] = await this.songRepository.findAndCount({
        where: { eventId: activeEvent.id },
        order: { voiceCount: 'DESC' },
        take: take,
        skip: skip,
      });

      return { data: result, count: total };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
