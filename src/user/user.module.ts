import { Logger, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessControlModule } from 'nest-access-control';
import { roles } from '../roles';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserGeneral } from '../entity/user_general.entity';
import { UserController } from './user.controller';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([UserGeneral]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
  ],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {
  constructor(protected readonly appService: UserService) {}
  async onModuleInit(): Promise<void> {
    this.appService
      .registerUser({
        nombre: 'Maestro',
        apellido: 'Maestro',
        imagen: '',
        email: 'maestro@maestro.com',
        password: '13Demarzo.',
        roles: ['MAESTRO'],
      })
      .then(() => {
        Logger.debug('User MAESTRO created');
      })
      .catch((error) => {
        Logger.error(error);
      });

    this.appService
      .registerUser({
        nombre: 'Alumno',
        apellido: 'Alumno',
        imagen: '',
        email: 'alumno@alumno.com',
        password: '13Demarzo.',
        roles: ['ALUMNO'],
      })
      .then(() => {
        Logger.debug('User ALUMNO created');
      })
      .catch((error) => {
        Logger.error(error);
      });
  }
}
