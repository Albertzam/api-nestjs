import { Injectable, Logger } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthModuleConfig } from './auth.config';
import { config } from 'process';
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly jwtService: JwtService,
    private readonly configService: ConfigService<AuthModuleConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: unknown): Promise<unknown> {
    Logger.debug(`payload ${JSON.stringify(payload)}`);
    return payload;
  }
}
