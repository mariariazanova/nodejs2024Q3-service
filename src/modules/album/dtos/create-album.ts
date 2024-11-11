import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ErrorMessage } from '../../../enums/error-message';
import { getSpecifiedErrorMessage } from '../../../utils/get-specified-error-message';
import { Property } from '../../../enums/property';

export class CreateAlbumDto {
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
      Property.YEAR,
    ),
  })
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString({
    message: getSpecifiedErrorMessage(
      ErrorMessage.INVALID_FIELD_TYPE,
      Property.ARTIST_ID,
    ),
  })
  artistId: string | null;
}
