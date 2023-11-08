import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createJwtToken() {
    return await this.jwtService.signAsync(
      {},
      {
        secret: 'zKVn0AVs4mUYOZ1gJPydmYhAhhySqtl1penuV5JXOPU=',
        expiresIn: `${3 * 30}d`,
      },
    );
  }
}
