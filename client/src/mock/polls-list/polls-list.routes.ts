import { Request } from 'kakapo';
import { ErrorResponse, MyDatabase, MyOptions } from '../core/types';
import { environment } from '@environment';

export default class PollsRoutes {
  constructor({ uiRouter }: MyOptions) {
    if (!environment.production) {
      uiRouter.get('/polls', (request, db) => this.findAll(request, db));
    }
  }

  // tslint:disable-next-line:variable-name
  findAll(_request: Request, db: MyDatabase) {
    return {
      data: db
        .all('polls')
        .map((item) => item.data)
        // @ts-ignore
        .sort((a, b) => a.id - b.id),
    };
  }
}
