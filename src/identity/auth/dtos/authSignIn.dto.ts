import {
  IsEmail,
  IsNotEmpty,
  IsString
} from 'class-validator'

import { ISignInRequest } from 'src/types/auth.types'

export class AuthSignInDto implements ISignInRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
