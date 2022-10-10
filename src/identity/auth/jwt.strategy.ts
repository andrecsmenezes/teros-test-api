import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IAuthPayloadData } from "src/types/auth.types"

export class JwtStrategy extends PassportStrategy( Strategy )
{
  constructor()
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate( payload: IAuthPayloadData )
  {
    return payload
  }
}
