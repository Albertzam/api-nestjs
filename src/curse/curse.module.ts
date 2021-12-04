import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ClaseEntidad } from 'src/entity/clase.entity';
import { ClassromEntity } from 'src/entity/classrom.entity';
import { AuthModule } from '../auth/auth.module';
import { UserGeneral } from '../entity/user_general.entity';
import { roles } from '../roles';
import { CurseController } from './curse.controller';
import { CurseService } from './curse.service';

@Module({
  controllers: [CurseController],
  imports: [
    TypeOrmModule.forFeature([ClaseEntidad, UserGeneral]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
  ],
  providers: [CurseService, JwtStrategy],
  exports: [CurseService],
})
export class CurseModule {}
