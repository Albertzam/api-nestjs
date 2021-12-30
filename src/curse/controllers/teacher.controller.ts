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
import { DeleteCourse, UpdateCourseDTO } from '../../dto/course.dto';
import { AppActions, AppPossession, generalResources } from 'src/roles';
import { TeacherService } from '../services/teacher.service';
import { DeleteDTO, NewWorkDto, UpdateHomeworkDTO } from 'src/dto/work.dto';
import {
  IUpdateCalification,
  IUpdateCalificationStudent,
  IUpdateHomework,
} from 'src/interface/work.interface';
import { DeleteStudentDTO, UpdateStudentDTO } from 'src/dto/prof';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.ALUMNO,
  })
  @Get('/get-courses')
  async getCourses(@Req() req) {
    return await this.teacherService.getListCourses(req.user.id);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Post('/delete-course')
  @UsePipes(ValidationPipe)
  async deleteCourse(@Body() id: DeleteCourse) {
    return await this.teacherService.deleteCourse(id.id);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @UsePipes(ValidationPipe)
  @Post('/update-course')
  async updateCourse(@Body() course: UpdateCourseDTO) {
    return await this.teacherService.updateCourse(course);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @UsePipes(ValidationPipe)
  @Post('/register-work')
  async registerWork(@Body() newWork: NewWorkDto) {
    return await this.teacherService.registerHomework(newWork);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @UsePipes(ValidationPipe)
  @Get('/getList-work/:id')
  async getListWork(@Req() req, @Param('id') id: string) {
    return await this.teacherService.getListHomework({ id: id });
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @UsePipes(ValidationPipe)
  @Post('/update-work')
  async updateHomework(@Body() homework: UpdateHomeworkDTO) {
    console.log(homework);
    return await this.teacherService.updateHomework(homework);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @UsePipes(ValidationPipe)
  @Post('/delete-work')
  async deleteWork(@Body() idDeleteWork: DeleteDTO) {
    return await this.teacherService.deleteHomework(idDeleteWork);
  }
  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Get('/get-list/:idCourse')
  async getList(@Param('idCourse') idCourse) {
    return this.teacherService.getList(idCourse);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Post('/update-student')
  @UsePipes(ValidationPipe)
  async updateStudent(@Body() student: UpdateStudentDTO) {
    console.log(student);
    return this.teacherService.updateStudent(student);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Post('/delete-student')
  @UsePipes(ValidationPipe)
  async deleteStudent(@Body() id: DeleteStudentDTO) {
    return this.teacherService.deleteStudent(id);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Get('/getList-student-calification/:idHomework')
  @UsePipes(ValidationPipe)
  async getListCalification(@Param('idHomework') idHomework: string) {
    return await this.teacherService.getListCalifications(idHomework);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Post('/update-califications-homework')
  @UsePipes(ValidationPipe)
  async updateCalifications(@Body() homework: IUpdateCalification) {
    return await this.teacherService.updateCalificationHomework(homework);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Post('/update-califications-student')
  @UsePipes(ValidationPipe)
  async updateCalificationStudent(
    @Body() homework: IUpdateCalificationStudent,
  ) {
    return await this.teacherService.updateCalificationStudent(homework);
  }

  @Auth({
    possession: AppPossession.ANY,
    action: AppActions.READ,
    resource: generalResources.CLASE,
  })
  @Get('/list-califications-all/:idCourse')
  @UsePipes(ValidationPipe)
  async getAllCalifications(@Param('idCourse') idCourse: string) {
    return await this.teacherService.getCalificationAll(idCourse);
  }
}
/**
 * list-califications-all/61c02b0f987ced2e24c2966d
 */