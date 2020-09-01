import { Container } from 'typedi';
import LoggerInstance from './logger';
import config from '../config';
import mailgun from 'mailgun-js';

export default ({ bullJobs }: { bullJobs: { name: string; job: any }[] }) => {
  try {
    bullJobs.forEach(m => {
      Container.set(m.name, m.job);
    });

    Container.set('logger', LoggerInstance);
    Container.set('emailClient', mailgun({ apiKey: config.emails.apiKey, domain: config.emails.domain }));

    LoggerInstance.info('✌️ Models injected into container');
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
