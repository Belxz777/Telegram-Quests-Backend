import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('Не найдено', HttpStatus.NOT_FOUND);
  }
}
export class NotCreated  extends HttpException {
  constructor() {
    super('Существует дубликат, не создано', HttpStatus.CONFLICT);
  }
}
export class WrongFormat extends HttpException {
  constructor() {
    super('Неверный формат', HttpStatus.BAD_REQUEST);
  }
}
export class ExtendedApisError extends HttpException {
  constructor() {
  super('Проблема с API яндекса', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}