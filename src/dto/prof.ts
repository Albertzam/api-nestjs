import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isEmpty,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { IUpdateUser } from 'src/interface/prof.interface';

export class UserGeneralDTO {
  @IsNotEmpty()
  @ApiProperty()
  @Length(4, 30)
  nombre: string;

  @IsNotEmpty()
  @ApiProperty()
  @Length(4, 16)
  apellido: string;

  @ApiProperty()
  segApe: string;

  @ApiProperty()
  imagen: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  roles: string[];
}

export class UpdateStudentDTO implements IUpdateUser {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  apellido: string;

  @ApiProperty()
  segApe?: string;
}
export class DeleteStudentDTO {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  @ApiProperty()
  idStudent: string;

  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  @ApiProperty()
  idCourse: string;
}
