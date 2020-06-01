import { Fixture, Factory, MyOptions } from '../core/types';

type Routes = any[];
type Factories = any[];

export default class Scenario {
  options: MyOptions;

  constructor(options: MyOptions) {
    this.options = options;
  }

  run() {}

  loadRoutes(routes: Routes) {
    routes.forEach((item) => {
      return new item(this.options);
    });
  }

  createList(factories: Factories) {
    const db = this.options.db;

    factories.forEach((factoryClass) => {
      const factory: Factory<any> = new factoryClass();

      db.register(factory.db);

      for (let i = 0; i < factory.count; i++) {
        db.create(factory.db, 1, (faker) => factory.generate(faker, i));
      }
    });
  }
}
