import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from 'src/entities/User';

import * as bcrypt from 'bcrypt'

export class UserSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const password = await bcrypt
      .hash( '1234', parseInt( ''+process.env.HASH_SALTS ) )

    const user = em.create( User, {
      pkUser: 1,
      email: 'user@teros.com.br',
      password
    })
  }

}
