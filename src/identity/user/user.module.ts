import { MikroOrmModule } from "@mikro-orm/nestjs"
import { Module } from "@nestjs/common"
import { User } from '../../entities/User'
import { UserController } from './user.controller'
import { UserService } from "./user.service"

@Module({
  imports: [ MikroOrmModule.forFeature({ entities: [ User ] }) ],
  controllers: [ UserController ],
  providers: [ UserService ]
})
export class UserModule {}
