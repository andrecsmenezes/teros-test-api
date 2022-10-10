import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from "./user.service"

@Controller('/users')
export class UserController
{
  constructor(
    readonly userService: UserService
  ) {}

  @Get('/')
  async show(
    @Res()
    res: Response
  ) {
    const users = await this.userService.getAll()
    res.status( HttpStatus.OK ).json( users )
  }
}
