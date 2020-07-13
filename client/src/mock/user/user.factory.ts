import { Factory } from '../core/types';
import { UserStatus } from '@core/entities/user/user.types';
import { now } from '@core/helpers/moment';
import { User } from '@core/entities/user/user.models';
import { UserRole } from '@core/entities/user/role.models';

export class UserFactory implements Factory<User> {
  db = 'users';
  count = 10;

  generate(faker: Faker.FakerStatic, id: number): User {
    return {
      id,
      email: `test${id}@test.com`,
      username: faker.name.firstName(),
      role: UserRole.Admin,
      password: `test-${id}`,
      status: faker.random.arrayElement(Object.values(UserStatus)),
      createdAt: now().toISOString(),
      updatedAt: now().toISOString()
    };
  }
}
