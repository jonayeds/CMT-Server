import jwt, { SignOptions } from "jsonwebtoken"

type TJwtPayload = {
    id:string;
    email:string;
    role:string;
}


export const signJwt = (jwtPayload:TJwtPayload, secret:string, expiresIn:SignOptions["expiresIn"] = "10d" ) =>{
     const accessToken = jwt.sign(jwtPayload, secret ,{
        expiresIn
      } )
      return accessToken
}