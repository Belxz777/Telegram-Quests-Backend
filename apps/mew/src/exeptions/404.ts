import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('Не найдено', HttpStatus.NOT_FOUND);
  }
}