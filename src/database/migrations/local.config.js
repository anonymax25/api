/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
dotenv.config({
  path: 'properties/.properties.dev',
});

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  logging: ['error'],
  entities: [
    process.env.ENV === 'dev' ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js',
  ],
  migrationsTableName: 'migration',
  migrations: [
    process.env.ENV === 'dev'
      ? 'src/shared/typeorm/migrations/*.ts'
      : 'dist/shared/typeorm/migrations/*.js',
  ],
  seeds: [
    process.env.ENV === 'dev'
      ? 'src/shared/typeorm/seeds/*.seed.ts'
      : 'dist/shared/typeorm/seeds/*.seed.js',
  ],
  cli: {
    migrationsDir:
      process.env.ENV === 'dev'
        ? 'src/shared/typeorm/migrations'
        : 'dist/shared/typeorm/migrations',
  },
};
