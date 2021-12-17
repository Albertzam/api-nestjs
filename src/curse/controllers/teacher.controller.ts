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
import { IUpdateHomework } from 'src/interface/work.interface';

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
}
