import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Participant } from "../entities/Participant"

@Injectable()
export class ParticipantService
{
  constructor(
    private readonly em: EntityManager,
  ){}

  async getLastUpdate()
  {
    const lastUpdate = await this.em
      .getRepository( Participant )
      .findOne(
        {
          deletedAt: null
        },
        {
          orderBy: { 'updatedAt':  'DESC' }
        }
      )

    return lastUpdate?.updatedAt
  }
}
