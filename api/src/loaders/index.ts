import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import pgLoader from './postgres';
import redisLoader from './redis';
import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  const pgConnection = await pgLoader();
  const redisConnection = await redisLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose entity into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const bullJobs: { name: string; job: any }[] = await jobsLoader({ redisConnection: redisConnection });
  Logger.info('✌️ Jobs loaded');

  await dependencyInjectorLoader({
    bullJobs,
  });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp, redisConnection });
  Logger.info('✌️ Express loaded');
};
