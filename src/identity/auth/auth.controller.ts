import {
  Body,
  Controller,
  ForbiddenException,
  HttpStatus,
  Logger,
  Post,
  Res
} from '@nestjs/common'

import { IAuthPayloadData, ISignInResponse } from 'src/types/auth.types'
import { UserService } from '../user/user.service'
import { AuthSignInDto } from './dtos/authSignIn.dto'
import { IsPublic } from './isPublic'

import * as bcrypt from 'bcrypt'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'

@Controller('/auth')
export class AuthController
{
  private logger = new Logger( AuthController.name )

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  @IsPublic()
  @Post('sign-in')
  async signIn(
    @Body()
    authSighIn: AuthSignInDto,

    @Res()
    res: Response
  ): Promise<any>
  {
    const user = await this.userService
      .getByEmail( authSighIn.email )

    if( ! user ) {
      this.logger.error( authSighIn )
      throw new ForbiddenException( 'User not found' )
    }

    const passwordMatch = await bcrypt
      .compare( authSighIn.password, user.password )

    if( ! passwordMatch ) {
      this.logger.error( authSighIn )
      throw new ForbiddenException( 'Incorrect password' )
    }

    res.status( HttpStatus.OK ).json({
      pkUser: user.pkUser,
      email: user.email,
      token: this.jwtService.sign({
        pkUser: user.pkUser,
        email: user.email
      } as IAuthPayloadData)
    })
  }
}
