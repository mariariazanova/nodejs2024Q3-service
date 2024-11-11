import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessage } from '../../../enums/error-message';
import { getSpecifiedErrorMessage } from '../../../utils/get-specified-error-message';
import { Property } from '../../../enums/property';

export class CreateUserDto {
  @IsNotEmpty({
    message: getSpecifiedErrorMessage(
      ErrorMessage.EMPTY_REQUIRED_FIELD,
      Property.LOGIN,
    ),
  })
  @IsString({
    message: getSpecifiedErrorMessage(
      ErrorMessage.INVALID_FIELD_TYPE,
      Property.LOGIN,
    ),
  })
  login: string;

  @IsNotEmpty({
    message: getSpecifiedErrorMessage(
      ErrorMessage.EMPTY_REQUIRED_FIELD,
      Property.PASSWORD,
    ),
  })
  @IsString({
    message: getSpecifiedErrorMessage(
      ErrorMessage.INVALID_FIELD_TYPE,
      Property.PASSWORD,
    ),
  })
  password: string;
}
