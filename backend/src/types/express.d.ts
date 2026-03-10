import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userPayload?: string | JwtPayload;
    }
  }
  
  interface sanitizedUser {
    name?: {
      firstName: string,
      lastName: string
    },
    username?: string
    password?: string,
    gender?: 'Male' | 'Female' | 'Other',
    email?: string
  }
}

export {};
