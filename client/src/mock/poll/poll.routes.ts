import { Request } from 'kakapo';
import { ErrorResponse, MyDatabase, MyOptions } from '../core/types';
import { environment } from '@environment';

export default class PollRoutes {
  constructor({ uiRouter }: MyOptions) {
    if (!environment.production) {
      uiRouter.get('/poll/:id', (request, db) => this.findById(request, db));
    }
  }

  // tslint:disable-next-line:variable-name
  findById(_request: Request, db: MyDatabase) {
    const returnData = db.all('polls').find(x => x.data.id === _request.params.id);

    return {
      data: returnData ? returnData.data : {}
    };
  }
}
