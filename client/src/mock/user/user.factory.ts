import { Factory } from '../core/types';
import { UserStatus } from '@core/user/user.types';
import { now } from '@core/helpers/moment';
import { User } from '@core/user/user.models';
import { UserRole } from '@core/user/role.models';

export class UserFactory implements Factory<User> {
  db = 'users';
  count = 10;

  generate(faker: Faker.FakerStatic, id: number): User {
    return {
      id,
      email: `test${id}@test.com`,
      username: faker.name.firstName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      role: UserRole.Admin,
      password: `test-${id}`,
      status: faker.random.arrayElement(Object.values(UserStatus)),
      timeCreatedAt: now().toISOString(),
      timeUpdatedAt: now().toISOString(),
    };
  }
}