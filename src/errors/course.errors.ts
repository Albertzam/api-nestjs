import { HttpStatus } from '@nestjs/common';

export enum CourseErrorCodes {
  COURSE_NOT_FOUND = 'COURSE_NOT_FOUND',
  COURSE_ALREADY_DELETED = 'COURSE_ALREADY_DELETED',
}

export const CourseErrorHttpStatus: {
  [x: string]: HttpStatus;
} = {
  [CourseErrorCodes.COURSE_NOT_FOUND]: HttpStatus.NOT_FOUND,
};
