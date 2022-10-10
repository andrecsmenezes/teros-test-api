import { HttpModule } from "@nestjs/axios"
import { Module } from "@nestjs/common"
import { ParticipantController } from './participant.controller'
import { ParticipantService } from "./participant.service"

@Module({
  imports: [ HttpModule ],
  controllers: [ ParticipantController ],
  providers: [ ParticipantService ]
})
export class ParticipantModule {}
