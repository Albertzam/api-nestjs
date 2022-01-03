import { HttpStatus } from '@nestjs/common';

export enum StudentErrorCodes {}

export const StudentErrorHttpStatus: {
  [x: string]: HttpStatus;
} = {};
