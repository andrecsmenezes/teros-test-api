export interface ISignInRequest
{
  email: string,
  password: string
}

export interface ISignInResponse
{
  pkUser: number,
  email: string,
  token: string
}

export interface IAuthPayloadData
{
  pkUser: number,
  email: string
}