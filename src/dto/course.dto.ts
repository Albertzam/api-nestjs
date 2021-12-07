import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Ilista } from 'src/interface/course.interface';

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

export class ListStudents {
  @IsNotEmpty()
  @ApiProperty()
  idCourse: string;
  @IsNotEmpty()
  @ApiProperty()
  lista: Ilista[];
}
