import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/decorator';
import { CourseDTO, NewStudentDTO } from 'src/dto/course.dto';
import { IAlumnCourse, ICourseRegister } from 'src/interface/course.interface';
import { AppActions, AppPossession, generalResources } from 'src/roles';
import { CurseService } from './curse.service';

@Controller('curse')
export class CurseController {
  constructor(private courseService: CurseService) {}
  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.CREATE,
    resource: generalResources.CLASE,
  })
  @Post('/register-course')
  @UsePipes(ValidationPipe)
  async registerCourse(@Body() newCurse: CourseDTO, @Req() req) {
    return await this.courseService.registerCourse({
      name: newCurse.name,
      userId: req.user.id,
    });
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.CREATE,
    resource: generalResources.ALUMNO,
  })
  @Post('register-alumn-course')
  @UsePipes(ValidationPipe)
  async registerAlumnCourse(@Body() idCourse: NewStudentDTO, @Req() req) {
    const alumnCourse: IAlumnCourse = {
      idCourse: idCourse.idCourse,
      idAlumn: req.user.id,
    };
    return await this.courseService.registerStudent(alumnCourse);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Get('/get-students/:idCourse')
  async getStudents(@Param('idCourse') idCourse: string) {
    return await this.courseService.getStudents(idCourse);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.ALUMNO,
  })
  @Get('/get-courses')
  async getCourses(@Req() req) {
    return await this.courseService.getCourses(req.user.id);
  }
}
