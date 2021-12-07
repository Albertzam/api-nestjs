import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGeneral } from '../entity/user_general.entity';
import { IUserGeneral } from 'src/interface/prof.interface';
import { user } from 'src/interface/user.interface';
import { MongoRepository } from 'typeorm';
import * as bycript from 'bcrypt';
import { IEmail } from 'src/interface/course.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserGeneral)
    private readonly userRepository: MongoRepository<UserGeneral>,
    private jwtService: JwtService,
  ) {}

  async login(user: user): Promise<any> {
    const dataUser = await this.userRepository.findOne({ email: user.email });

    if (dataUser) {
      const pass = await bycript.compare(user.password, dataUser.password);
      if (pass) {
        const token = await this.getAccessToken({
          ...dataUser,
          password: undefined,
        });
        return {
          user: {
            ...dataUser,
            password: undefined,
          },
          token,
        };
      } else {
        throw new HttpException('Datos invalidos', HttpStatus.BAD_REQUEST);
      }
    }

    return;
  }

  async getAccessToken(payload: any): Promise<string> {
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }

  async registerUser(profe: IUserGeneral): Promise<any> {
    const userExist = await this.userRepository.findOne({ email: profe.email });
    if (userExist) {
      throw new HttpException('Este usuario ya existe', HttpStatus.CONFLICT);
    } else {
      const createUser = await this.userRepository.create(profe);
      await this.userRepository.save(createUser);
      return {
        ...createUser,
        password: undefined,
      };
    }
  }

  async checkEmail(email: IEmail) {
    const emailCheck = await this.userRepository.findOne({
      email: email.email,
    });
    if (emailCheck) {
      return {
        message: 'Este email ya esta registrado',
      };
    } else {
      return {
        message: 'Email valido',
      };
    }
  }

  async deleteUser(email: string) {
    await this.userRepository.delete({ email: email });
  }
}
