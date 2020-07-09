import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from '../config/typeorm';

export default async (): Promise<any> => {
  return await createConnection(typeOrmConfig);
};
