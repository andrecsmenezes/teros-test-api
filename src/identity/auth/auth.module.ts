import { AuthController } from './auth.controller'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { User } from 'src/entities/User'
import { UserService } from '../user/user.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async ( configService: ConfigService ) => ({
        secret: configService.get( 'JWT_SECRET' ),
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN + 's'
        }
      }),
      inject: [ ConfigService ]
    }),
    MikroOrmModule.forFeature({ entities: [ User ] })
  ],
  controllers: [ AuthController ],
  providers: [ UserService, JwtStrategy ]
})
export class AuthModule {}
