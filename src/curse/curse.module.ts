import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ClaseEntidad } from '../entity/clase.entity';
import { ListaEntidad } from '../entity/list.entity';
import { WorkEntidad } from '../entity/work.entity';
import { AuthModule } from '../auth/auth.module';
import { UserGeneral } from '../entity/user_general.entity';
import { roles } from '../roles';
import { CurseController } from './controllers/curse.controller';
import { CurseService } from './services/curse.service';
import { TeacherController } from './controllers/teacher.controller';
import { TeacherService } from './services/teacher.service';

@Module({
  controllers: [CurseController, TeacherController],
  imports: [
    TypeOrmModule.forFeature([
      ClaseEntidad,
      UserGeneral,
      ListaEntidad,
      WorkEntidad,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
  ],
  providers: [CurseService, JwtStrategy, TeacherService],
  exports: [CurseService],
})
export class CurseModule {}
