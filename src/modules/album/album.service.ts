import { Injectable } from '@nestjs/common';
import { RequestService } from '../../shared/request.service';
import { ErrorMessage } from '../../enums/error-message';
import dataBase from '../../data-base/data-base';
import { Album } from '../../interfaces/album';

@Injectable()
export class AlbumService extends RequestService<Album> {
  protected notFoundErrorMessage = ErrorMessage.ALBUM_NOT_EXIST;

  protected get items(): Album[] {
    return dataBase.albums;
  }
}
