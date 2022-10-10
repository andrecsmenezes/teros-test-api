import { HttpService } from '@nestjs/axios'
import { Controller, Get } from '@nestjs/common'
import { ParticipantService } from './participant.service'

@Controller('/participants')
export class ParticipantController
{
  constructor(
    private readonly httpService: HttpService,
    private readonly participantService: ParticipantService
  ) {}

  @Get('/')
  async show()
  {
    let data: Array<any> = []

    await this.httpService
      .get( ''+process.env.PARTICIPANTS_URL )
      .forEach( result => data = result.data )

    return data
      .map( participant => {
        return {
          organisationId: participant.OrganisationId,
          organisationName: participant.OrganisationName,
          customerFriendlyLogoUri: participant.AuthorisationServers
            ?.find( (item: any) => item.CustomerFriendlyLogoUri && item.CustomerFriendlyLogoUri !== '' )
            ?.CustomerFriendlyLogoUri,
          openIdDiscoveryDocument: participant.AuthorisationServers
            ?.find( (item: any) => item.CustomerFriendlyLogoUri && item.CustomerFriendlyLogoUri !== '' )
            ?.OpenIDDiscoveryDocument,
        }
      })
  }

  @Get('/status')
  async status()
  {
    const lastUpdate = await this.participantService.getLastUpdate()
    return lastUpdate
  }
}
