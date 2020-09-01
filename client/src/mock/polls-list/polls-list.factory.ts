import { Factory } from '../core/types';
import { ISong } from '@core/interfaces/song/song.types';

export class PollsListFactory implements Factory<ISong> {
  db = 'polls';
  count = 100;

  generate(faker: Faker.FakerStatic, id: number): ISong {
    return {
      id: faker.random.uuid(),
      userId: faker.random.uuid(),
      coverSinger: faker.name.lastName(),
      songName: faker.name.jobTitle(),
      voiceCount: faker.random.number({ min: 100, max: 2000 })
    } as ISong;
  }
}
