import Scenario from './proto/scenario';
import { PollsListFactory } from './polls-list/polls-list.factory';
import PollsRoutes from './polls-list/polls-list.routes';
import PollRoutes from './poll/poll.routes';

export default class DefaultScenario extends Scenario {
  run() {
    this.createList([PollsListFactory]);

    this.loadRoutes([PollsRoutes, PollRoutes]);
  }
}
