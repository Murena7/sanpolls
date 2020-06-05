import config from '../config';
import EmailSequenceJob from '../jobs/emailSequence';
import Queue from 'bull';
import Redis from 'ioredis';
import { setQueues } from 'bull-board';

export default ({ redisConnection }: { redisConnection: Redis.Redis }): { name: string; job: any }[] => {
  // @ts-ignore
  const sendEmail = new Queue('send-email', { createClient: redisConnection });
  sendEmail.process(new EmailSequenceJob().handler);

  setQueues([sendEmail]);

  return [{ name: 'send-email', job: sendEmail }];
};
