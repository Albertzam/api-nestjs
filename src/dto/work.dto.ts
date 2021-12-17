import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class NewWorkDto {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  @ApiProperty()
  idCourse: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  dateLimit: number;
}

export class UpdateHomeworkDTO {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  dateLimit: number;
}

export class DeleteDTO {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  @ApiProperty()
  id: string;
}
