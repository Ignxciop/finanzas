import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/env.js';

export interface JwtPayload {
  userId: string;
  email: string;
}

export class JwtService {
  static sign(payload: JwtPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    } as SignOptions);
  }

  static verify(token: string): JwtPayload {
    try {
      return jwt.verify(token, config.jwt.secret) as JwtPayload;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  static decode(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
