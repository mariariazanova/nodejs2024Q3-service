import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ErrorMessage } from '../../../enums/error-message';
import { getSpecifiedErrorMessage } from '../../../utils/get-specified-error-message';
import { Property } from '../../../enums/property';

export class CreateTrackDto {
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

  @IsOptional()
  @IsString({
    message: getSpecifiedErrorMessage(
      ErrorMessage.INVALID_FIELD_TYPE,
      Property.ARTIST_ID,
    ),
  })
  artistId: string | null;

  @IsOptional()
  @IsString({
    message: getSpecifiedErrorMessage(
      ErrorMessage.INVALID_FIELD_TYPE,
      Property.ALBUM_ID,
    ),
  })
  albumId: string | null;

  @IsNotEmpty({
    message: getSpecifiedErrorMessage(
      ErrorMessage.EMPTY_REQUIRED_FIELD,
      Property.DURATION,
    ),
  })
  @IsNumber()
  duration: number;
}
