import { Database, Router, Server } from 'kakapo';

import { environment } from '@environment';

import { MyOptions, DbSchema } from './core/types';
import DefaultScenario from './default';

const scenarios = {
  default: DefaultScenario,
};

// use env value in a future
const scenario = 'default';

const requestsLogging = true;

class MockBackend {
  options: MyOptions;
  server: Server;

  constructor() {
    const uiRouter = new Router<DbSchema>({
      host: environment.UI_SERVER,
      requestDelay: 0,
      logging: requestsLogging,
    });
    const db = new Database<DbSchema>();

    this.options = {
      uiRouter,
      db,
    };
    this.server = new Server();
  }

  start(): void {
    new scenarios[scenario](this.options).run();

    this.server.use(this.options.db);
    // @ts-ignore (don't want to patch kakapo)
    this.server.use(this.options.uiRouter);
  }

  stop(): void {}
}

export default new MockBackend();
