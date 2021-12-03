import { HttpStatus } from '@nestjs/common';

export enum AlumnErrorCodes {
  BRANCH_NOT_FOUND = 'BRANCH_NOT_FOUND',
  BRANCH_ALREADY_EXISTS = 'BRANCH_ALREADY_EXISTS',
  BRANCH_ALREADY_DELETED = 'BRANCH_ALREADY_DELETED',
  BRANCH_REGISTERED_USERS = 'BRANCH_REGISTERED_USERS',
  PRODUCT_ALREADY_EXISTS = 'PRODUCT_ALREADY_EXISTS',
}

export const BranchErrorHttpStatus: {
  [x: string]: HttpStatus;
} = {
  [AlumnErrorCodes.BRANCH_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [AlumnErrorCodes.BRANCH_ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [AlumnErrorCodes.BRANCH_ALREADY_DELETED]: HttpStatus.BAD_REQUEST,
  [AlumnErrorCodes.BRANCH_REGISTERED_USERS]: HttpStatus.CONFLICT,
  [AlumnErrorCodes.PRODUCT_ALREADY_EXISTS]: HttpStatus.CONFLICT,
};
