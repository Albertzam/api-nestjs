import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../decorator';
import { AppActions, AppPossession, generalResources } from '../roles';
import { UserGeneralDTO } from '../dto/prof';
import { UserLogin } from '../dto/user.dto';
import { IEmail } from '../interface/course.interface';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() user: UserLogin) {
    return await this.userService.login(user);
  }

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() user: UserGeneralDTO) {
    return await this.userService.registerUser(user);
  }

  @Post('/check-email')
  async checkEmail(@Body() email: IEmail) {
    return await this.userService.checkEmail(email);
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

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Post('/delete')
  async deleteUser(@Body() email: { email: string }) {
    return await this.userService.deleteUser(email.email);
  }
}
