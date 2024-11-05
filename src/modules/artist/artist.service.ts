import { Injectable } from '@nestjs/common';
import { RequestService } from '../../shared/request.service';
import { ErrorMessage } from '../../enums/error-message';
import dataBase from '../../data-base/data-base';
import { Artist } from '../../interfaces/artist';

@Injectable()
export class ArtistService extends RequestService<Artist> {
  protected notFoundErrorMessage = ErrorMessage.ARTIST_NOT_EXIST;

  protected get items(): Artist[] {
    return dataBase.artists;
  }
}
