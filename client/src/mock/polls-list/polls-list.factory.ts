import { Factory } from '../core/types';
import { IPoll } from '@core/polls/polls.types';

export class PollsListFactory implements Factory<IPoll> {
  db = 'polls';
  count = 10;

  generate(faker: Faker.FakerStatic, id: number): IPoll {
    return {
      id,
      uuid: faker.random.uuid(),
      author: faker.name.lastName(),
      name: faker.name.jobTitle(),
      votesCount: faker.random.number({ min: 100, max: 2000 }),
    };
  }
}
