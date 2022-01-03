import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModuleConfig, configuration } from './auth.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      useFactory: async (configService: ConfigService<AuthModuleConfig>) => {
        return {
          secret: configService.get('jwtSecret'),
          signOptions: { expiresIn: configService.get('expiresIn') },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
