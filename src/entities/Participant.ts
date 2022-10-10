import { Entity, PrimaryKey, Property, UuidType } from "@mikro-orm/core"

@Entity()
export class Participant
{
  @PrimaryKey({ autoincrement: true })
  pkParticipant!: number

  @Property({ type: UuidType })
  organisationId: string

  @Property({ length: 255 })
  organisationName: string

  @Property()
  customerFriendlyLogoUri: string

  @Property()
  openIdDiscoveryDocument: string

  @Property({ nullable: true, onCreate: () => new Date() })
  createdAt?: Date = new Date()

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date

  @Property({ nullable: true })
  deletedAt?: Date
}
