import { Factory } from '../core/types';
import { IUser, UserStatus } from '@core/interfaces/user/user.types';
import { now } from '@core/helpers/moment';
import { UserRole } from '@core/interfaces/user/role.types';

export class UserFactory implements Factory<IUser> {
  db = 'users';
  count = 10;

  generate(faker: Faker.FakerStatic, id: number): IUser {
    return {
      id: faker.random.uuid(),
      username: faker.name.firstName(),
      password: `test-${id}`,
      email: `test${id}@test.com`,
      role: UserRole.Admin,
      voiceBalance: 500,
      status: faker.random.arrayElement(Object.values(UserStatus)),
      emailConfirmed: true,
      lastLogin: null,
      createdAt: now().toISOString(),
      updatedAt: now().toISOString()
    };
  }
}
