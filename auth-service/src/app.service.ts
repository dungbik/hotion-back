import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(userId: string): Promise<string> {
    try {
      return this.jwtService.sign(
        {
          userId,
        },
        {
          expiresIn: 1 * 24 * 60 * 60,
        },
      );
    } catch (e) {
      return '';
    }
  }

  async decodeToken(token: string): Promise<number> {
    try {
      const value = this.jwtService.verify(token);
      return value.userId;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }
}
