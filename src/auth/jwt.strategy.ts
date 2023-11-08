import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //   hardcode secret token
      secretOrKey: 'zKVn0AVs4mUYOZ1gJPydmYhAhhySqtl1penuV5JXOPU=',
    });
  }

  async validate(payload: any) {
    if (!payload) throw new UnauthorizedException();
    return payload;
  }
}
