import { Entity, PrimaryKey, Property } from "@mikro-orm/core"

@Entity()
export class User
{
  @PrimaryKey({ autoincrement: true })
  pkUser!: number

  @Property({ length: 255 })
  email: string

  @Property({ length: 255 })
  password: string

  @Property({ nullable: true, onCreate: () => new Date() })
  createdAt?: Date = new Date()

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date

  @Property({ nullable: true })
  deletedAt?: Date
}
