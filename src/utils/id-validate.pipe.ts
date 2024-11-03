import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';
import { ErrorMessage } from '../enums/error-message';

export const IdValidatePipe = new ParseUUIDPipe({
  exceptionFactory: () => new BadRequestException(ErrorMessage.INVALID_ID),
});
