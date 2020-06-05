import Redis from 'ioredis';
import config from '../config';

export default (): Redis.Redis => {
  return new Redis(config.redisURL);
};
