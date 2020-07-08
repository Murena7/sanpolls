module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'password123',
  database: 'sansan',
  synchronize: true,
  logging: false,
  maxQueryExecutionTime: 1000,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  extra: {
    connectionTimeoutMillis: 2000,
    query_timeout: 5000,
    statement_timeout: 10000,
  },
};
