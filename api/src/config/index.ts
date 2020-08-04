import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  const envFound = dotenv.config();
  if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),
  /**
   * Server Api URL
   */
  serverApiUrl: process.env.SERVER_API_URL,
  /**
   * PosgreSQL
   */
  postgresqlUser: process.env.PGSQL_USER,
  postgresqlPass: process.env.PGSQL_PASS,
  postgresqlDB: process.env.PGSQL_DB,
  postgresqlHost: process.env.PGSQL_HOST,
  /**
   * That long string from mlab
   */
  databaseURL: process.env.POSTGRES_URI,
  redisURL: process.env.REDIS_URI,
  /**
   * Your secret sauce
   */
  sessionSecret: process.env.SESSION_SECRET,
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * Agenda.js stuff
   */
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  /**
   * Facebook Auth
   */
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET,
  },

  google: {
    appId: process.env.GOOGLE_APP_ID,
    secret: process.env.GOOGLE_APP_SECRET,
  },

  /**
   * Agendash config
   */
  bullBoard: {
    user: 'agendash',
    password: '123456',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};
