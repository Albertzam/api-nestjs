import { ApiProperty } from '@nestjs/swagger';
import {
  isNotEmpty,
  IsNotEmpty,
  isString,
  IsString,
  Length,
} from 'class-validator';
import { Ilista } from 'src/interface/course.interface';

export class CourseDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class NewStudentDTO {
  @IsNotEmpty()
  @ApiProperty()
  @Length(7, 7)
  idCourse: string;
}

export class ListStudents {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @Length(24, 24)
  idCourse: string;
  @IsNotEmpty()
  @ApiProperty()
  students: [
    {
      idStudent: string;
      status: string;
    },
  ];
}

export class DeleteCourse {
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  @ApiProperty()
  id: string;
}

export class UpdateCourseDTO {
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
