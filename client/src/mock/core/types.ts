import { Database, DatabaseSchema, Response, Router } from 'kakapo';
import { IUser } from '@core/entities/user/user.types';
import { ISong } from '@core/entities/song/song.types';

export interface DbSchema extends DatabaseSchema {
  polls: ISong;
  users: IUser;
}

export type UIRouter = Router<DbSchema>;
export type MyDatabase = Database<DbSchema>;

export interface MyOptions {
  uiRouter: UIRouter;
  db: MyDatabase;
}

export interface Fixture<M> {
  db: string;
  items: M[];
}

export interface Factory<M> {
  db: string;
  count: number;
  generate(faker: Faker.FakerStatic, id: number): M;
}

export class ErrorResponse extends Response {
  // tslint:disable-next-line:variable-name
  _uniqueKeyForProperTypeValidation: string;

  constructor(message: string) {
    super(
      422,
      {
        status: 422,
        errors: [
          {
            code: 422,
            title: message,
            detail: message
          }
        ]
      },
      {}
    );
  }
}
