import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import pgLoader from './postgres';
import redisLoader from './redis';
import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  const redisConnection = redisLoader();
  const pgConnection = await pgLoader();
  Logger.info('✌️ DB loaded and connected!');

  const bullJobs: { name: string; job: any }[] = await jobsLoader({ redisConnection: redisConnection });
  Logger.info('✌️ Jobs loaded');

  await dependencyInjectorLoader({
    bullJobs,
  });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp, redisConnection });
  Logger.info('✌️ Express loaded');
};
