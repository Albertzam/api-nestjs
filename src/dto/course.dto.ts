import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CourseDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class NewStudentDTO {
  @IsNotEmpty()
  @ApiProperty()
  idCourse: string;
}
