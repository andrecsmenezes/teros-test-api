import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit
} from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './identity/auth/jwt.guard'

import { MikroORM } from '@mikro-orm/core'
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs'
import { ScheduleModule } from '@nestjs/schedule'

import { IdentityModule } from './identity/identity.module'
import { ParticipantModule } from './participant/participant.module'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MikroOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    TasksModule,
    IdentityModule,
    ParticipantModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule implements NestModule, OnModuleInit
{
  constructor ( private readonly orm: MikroORM ){}

  async onModuleInit(): Promise<void>
  {
    await this.orm.getMigrator().up()
  }

  configure ( consumer: MiddlewareConsumer )
  {
    consumer.apply( MikroOrmMiddleware ).forRoutes( '*' )
  }
}
