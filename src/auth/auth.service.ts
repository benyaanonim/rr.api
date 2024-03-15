import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminInput } from './api/input/admin.credentials.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
  ) {}

  async login(body: AdminInput) {
    const adminName = this.configService.get<string>('NAME_ADMIN');
    const adminPass = this.configService.get<string>('PASS_ADMIN');
    if (adminName !== body.name || adminPass !== body.password) {
      return null;
    }
    const token = this.jwtService.sign({ sub: adminName });
    return { accessToken: token };
  }
}
