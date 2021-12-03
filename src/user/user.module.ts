import { Logger, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessControlModule } from 'nest-access-control';
import { roles } from 'src/roles';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserGeneral } from '../entity/user_general.entity';
import { UserController } from './user.controller';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([UserGeneral]),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      entities: [],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
    }),
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
        nombre: 'Jose',
        apellido: 'Zamarripa',
        imagen: 'https://images2.imgbox.com/92/a6/fCvuavWs_o.jpg',
        email: 'jose@gmail.com',
        password: '13Demarzo.',
        roles: ['MAESTRO'],
      })
      .then(() => {
        Logger.debug('User admin created');
      })
      .catch((error) => {
        Logger.error(error);
      });
  }
}
