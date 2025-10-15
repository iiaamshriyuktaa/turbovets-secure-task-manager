import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['apps/api/.env', '.env'] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'sqlite',
        database: cfg.get<string>('DB_PATH'),
        entities: [User, Task],
        synchronize: true
      })
    }),
    TypeOrmModule.forFeature([User, Task]),
    AuthModule,
    TasksModule
  ],
  controllers: [HealthController]   // ← add this
})
export class AppModule {}


