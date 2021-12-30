import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from '../../decorator';
import { CourseDTO, ListStudents, NewStudentDTO } from '../../dto/course.dto';
import { IAlumnCourse, Ilista } from '../../interface/course.interface';
import { AppActions, AppPossession, generalResources } from '../../roles';
import { CurseService } from '../services/curse.service';

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
    console.log(newCurse);
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

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @UsePipes(ValidationPipe)
  @Post('/register-asist')
  async registerList(@Body() listStudents: ListStudents) {
    return this.courseService.registerAsist(listStudents);
  }
  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Get('/get-list/:idCourse')
  async getList(@Param('idCourse') idCourse) {
    return this.courseService.getList(idCourse);
  }
  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Get('/get-list/:fecha')
  async getFecha(@Param('fecha') fecha) {
    return;
  }



  /**PRUEBAS */
  @Post('/delete')
  async deleteTemp(@Body() name: { name: string }) {
    return await this.courseService.deleteTemp(name.name);
  }
  /*@Post('/upload-work')
  @UseInterceptors(FileInterceptor('file'))
  async registerWork(@UploadedFile() file, @Body() newWork) {
    console.log(file);
  }*/
}
