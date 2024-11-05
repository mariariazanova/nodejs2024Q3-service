import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessage } from '../../../enums/error-message';
import { getSpecifiedErrorMessage } from '../../../utils/get-specified-error-message';
import { Property } from '../../../enums/property';

export class CreateArtistDto {
  @IsNotEmpty({
    message: getSpecifiedErrorMessage(
      ErrorMessage.EMPTY_REQUIRED_FIELD,
      Property.NAME,
    ),
  })
  @IsString({
    message: getSpecifiedErrorMessage(
      ErrorMessage.INVALID_FIELD_TYPE,
      Property.NAME,
    ),
  })
  name: string;

  @IsNotEmpty({
    message: getSpecifiedErrorMessage(
      ErrorMessage.EMPTY_REQUIRED_FIELD,
      Property.GRAMMY,
    ),
  })
  @IsBoolean()
  grammy: boolean;
}
