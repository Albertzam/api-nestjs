import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IUserGeneral } from 'src/interface/prof.interface';
import { UserService } from './user.service';
import { Auth } from '../decorator';
import { AppActions, AppPossession, generalResources } from '../roles';
import { UserGeneralDTO } from 'src/dto/prof';
import { user } from 'src/interface/user.interface';
import { UserLogin } from 'src/dto/user.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() user: UserLogin) {
    return await this.userService.login(user);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() user: UserGeneralDTO) {
    return await this.userService.registerUser(user);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Get('/get-all')
  async getAllWorks() {
    return 'prueba permisos solo tiene acceso el ROL MAESTRO';
  }
}
