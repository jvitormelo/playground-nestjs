import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';

export class AbstractDTO {
  constructor(props) {
    Object.assign(this, props);
  }

  async validate() {
    const errors = await validate(this);
    if (errors.length) {
      throw new HttpException(errors, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
