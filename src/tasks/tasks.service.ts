import { EntityManager, wrap } from '@mikro-orm/core'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { Cron, Timeout } from '@nestjs/schedule'
import { Participant } from 'src/entities/Participant'

@Injectable()
export class TasksService {
  private readonly logger = new Logger( TasksService.name )

  constructor(
    private readonly httpService: HttpService,
    private readonly em: EntityManager
  ) {}

  @Timeout(1000)
  async forceCreateParticipantsOnStartApplication()
  {
    this.updateParticipants()
  }

  @Cron('* * 1 * * *', {
    name: 'updateParticipants',
    timeZone: 'America/Sao_Paulo'
  })
  async updateParticipants() {
    let data: Array<any> = []

    await this.httpService
      .get( ''+process.env.PARTICIPANTS_URL )
      .forEach( result => data = result.data )

    for await( const participantData of data ) {
      try
      {
        const filteredData = {
          organisationId: participantData.OrganisationId,
          organisationName: participantData.OrganisationName,
          customerFriendlyLogoUri: participantData.AuthorisationServers
            ?.find( (item: any) => item.CustomerFriendlyLogoUri
              && item.CustomerFriendlyLogoUri !== '' )
            ?.CustomerFriendlyLogoUri,
          openIdDiscoveryDocument: participantData.AuthorisationServers
            ?.find( (item: any) => item.OpenIDDiscoveryDocument
              && item.OpenIDDiscoveryDocument !== '' )
            ?.OpenIDDiscoveryDocument,
        }

        const participant = await this.em
          .getRepository( Participant )
          .findOne({ organisationId: filteredData.organisationId })

        if( ! participant ) {
          const newParticipant = new Participant()
          newParticipant.organisationId = filteredData.organisationId
          newParticipant.organisationName = filteredData.organisationName
          newParticipant.customerFriendlyLogoUri = filteredData.customerFriendlyLogoUri
          newParticipant.openIdDiscoveryDocument = filteredData.openIdDiscoveryDocument

          await this.em.persistAndFlush( newParticipant )
          this.logger.log( `Participant ${newParticipant.organisationName} created` )
        }
        else {
          wrap( participant ).assign( filteredData, { merge: true })
          await this.em.persistAndFlush( participant )
          this.logger.log( `Participant ${participant.organisationName} updated` )
        }
      }
      catch( error ) {
        this.logger.error( error )
      }
    }
  }
}
