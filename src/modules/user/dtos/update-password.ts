import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessage } from '../../../enums/error-message';
import { getSpecifiedErrorMessage } from '../../../utils/get-specified-error-message';
import { Property } from '../../../enums/property';

export class UpdatePasswordDto {
  @IsNotEmpty({
    message: getSpecifiedErrorMessage(
      ErrorMessage.EMPTY_REQUIRED_FIELD,
      Property.OLD_PASSWORD,
    ),
  })
  @IsString({
    message: getSpecifiedErrorMessage(
      ErrorMessage.INVALID_FIELD_TYPE,
      Property.OLD_PASSWORD,
    ),
  })
  oldPassword: string;

  @IsNotEmpty({
    message: getSpecifiedErrorMessage(
      ErrorMessage.EMPTY_REQUIRED_FIELD,
      Property.NEW_PASSWORD,
    ),
  })
  @IsString({
    message: getSpecifiedErrorMessage(
      ErrorMessage.INVALID_FIELD_TYPE,
      Property.NEW_PASSWORD,
    ),
  })
  newPassword: string;
}
