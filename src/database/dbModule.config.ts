import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const dbConfig = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [User],
    synchronize: false,
  }),
  inject: [ConfigService],
} as TypeOrmModuleAsyncOptions;
