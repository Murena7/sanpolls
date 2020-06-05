import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default async (): Promise<any> => {
  return await createConnection();
};
