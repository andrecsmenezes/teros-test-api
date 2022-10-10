import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { LoadStrategy } from '@mikro-orm/core';

const config: Options = {
  dbName: process.env.DB_NAME,
  name: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: parseInt(''+process.env.DB_PORT),
  type: 'mariadb',
  baseDir: process.cwd(),
  entities: ['dist/**/*.entity.js', 'dist/src/entities/*.js'],
  entitiesTs: ['src/**/*.entity.ts', 'src/entities/*.ts'],
  debug: true,
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  registerRequestContext: false,
  migrations: {
    path: 'dist/src/database/migrations',
    pathTs: 'src/database/migrations',
  },
};

export default config;
