import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { User } from "../../entities/User"

@Injectable()
export class UserService
{
  constructor(
    private readonly em: EntityManager,
  ){}

  async getAll()
  {
    const users = await this.em
      .getRepository( User )
      .find({})

    return users
  }

  async getByEmail( email: string )
  {
    const user = await this.em
      .getRepository( User )
      .findOne({ email })

    return user
  }
}
