import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { getRepository, Repository } from 'typeorm';
import { PollEvent } from '../entity/poll-event';
import { Song } from '../entity/song';
import { EventStatus, ICreatePollBody, IGetPollListBody } from '../interfaces/poll-event';
import { IBasicResponse } from '../interfaces/response-types';
import { plainToClass } from 'class-transformer';

@Service()
export default class PollService {
  pollEventRepository: Repository<PollEvent>;
  songRepository: Repository<Song>;

  constructor(@Inject('logger') private logger, @EventDispatcher() private eventDispatcher: EventDispatcherInterface) {
    this.pollEventRepository = getRepository(PollEvent);
    this.songRepository = getRepository(Song);
  }

  public async ratingList(body: IGetPollListBody): Promise<IBasicResponse> {
    try {
      const take: number = +body.take || 50;
      const skip: number = +body.skip || 0;
      let id: string = body.id;

      if (!id) {
        const activeEvent = await this.pollEventRepository.findOneOrFail({ status: EventStatus.Active });
        id = activeEvent.id;
      }

      const [result, total] = await this.songRepository.findAndCount({
        where: { eventId: id },
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

  public async activePoll(): Promise<IBasicResponse> {
    try {
      const activeEvent = await this.pollEventRepository.findOne({ status: EventStatus.Active });
      if (!activeEvent) {
        throw new Error('No active poll');
      }

      return { data: activeEvent };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
