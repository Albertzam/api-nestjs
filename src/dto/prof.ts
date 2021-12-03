import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isEmpty, IsNotEmpty, Length } from 'class-validator';

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
