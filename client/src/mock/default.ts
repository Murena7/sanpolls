import Scenario from './proto/scenario';
import { PollsListFactory } from './polls-list/polls-list.factory';
import PollsRoutes from './polls-list/polls-list.routes';
import PollRoutes from './poll/poll.routes';
import { UserFactory } from './user/user.factory';
import AuthRoutes from './auth/auth.routes';
import UsersRoutes from './user/user.routes';

export default class DefaultScenario extends Scenario {
  run() {
    this.createList([PollsListFactory, UserFactory]);

    this.loadRoutes([PollsRoutes, PollRoutes, AuthRoutes, UsersRoutes]);
  }
}
