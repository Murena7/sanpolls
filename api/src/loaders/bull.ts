import Redis from 'ioredis';

export default (redisClient: Redis.Redis): any => {
  return {
    createClient: function () {
      return redisClient;
    },
  };
};
