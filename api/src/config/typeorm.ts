import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ChildComment, Comment, LikeDislike, PollEvent, PollTransaction, Song, User } from '../entity';
import {Bill} from '../entity/bill';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.PGSQL_HOST,
  port: 5432,
  username: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASS,
  database: process.env.PGSQL_DB,
  synchronize: false,
  logging: false,
  maxQueryExecutionTime: 1000,
  extra: {
    connectionTimeoutMillis: 2000,
    /* eslint-disable @typescript-eslint/camelcase */
    query_timeout: 5000,
    /* eslint-disable @typescript-eslint/camelcase */
    statement_timeout: 10000,
  },
  entities: [ChildComment, Comment, LikeDislike, PollEvent, PollTransaction, Song, User, Bill],
};

export { typeOrmConfig };
