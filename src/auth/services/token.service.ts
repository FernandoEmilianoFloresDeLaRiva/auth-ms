import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadI } from '../domain/entities/interfaces/TokenPayloadI';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: TokenPayloadI): Promise<string> {
    try {
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new Error(error);
    }
  }

  async decodeToken(token: string): Promise<TokenPayloadI> {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyToken(token: string) {
    try {
      const {
        iat: _,
        exp,
        ...userPayload
      } = await this.jwtService.decode(token);
      const currentDate = new Date();
      const expiresDate = new Date(exp);
      return {
        user: userPayload,
        isExpired: +expiresDate <= +currentDate / 1000,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
