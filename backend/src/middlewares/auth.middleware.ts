import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app_jwt_secret = String(process.env.APP_JWT_SECRET)

const Auth = (req: Request, res: Response, next: NextFunction) => {
  // const token = req.headers['authorization'];
  const token = req.cookies.token;
  if (!token) {
    res.status(403).send({ msg: "No token provided for auth." })
    return;
  }
  let payload = ValidateJWT(token);
  if (payload) {
    req.userPayload = payload;
    next();
  }
  else {
    res.status(403).send({ msg: "Token Expired/Not authenticated..." })
  }
}

export function GenerateJWT(payload: string | object) {
  const token = jwt.sign(payload, app_jwt_secret, {
    expiresIn: '1h'
  })
  return token;
}

export function ValidateJWT(token: string) {
  try {
    let payload = jwt.verify(token, app_jwt_secret)
    console.log(payload);
    return payload;
  }
  catch (err) {
    return false;
  }

}

export default Auth;