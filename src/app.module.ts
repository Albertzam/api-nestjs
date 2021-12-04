import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessControlModule } from 'nest-access-control';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';

import { roles } from './roles';
import { UserModule } from './user/user.module';
import { CurseModule } from './curse/curse.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGeneral } from './entity/user_general.entity';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    UserModule,
    AuthModule,
    CurseModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
