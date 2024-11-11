import { Injectable } from '@nestjs/common';
import { RequestService } from '../../shared/request.service';
import { ErrorMessage } from '../../enums/error-message';
import dataBase from '../../data-base/data-base';
import { Album } from '../../interfaces/album';
import { Property } from '../../enums/property';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService extends RequestService<Album> {
  protected notFoundErrorMessage = ErrorMessage.ALBUM_NOT_EXIST;

  protected get items(): Album[] {
    return dataBase.albums;
  }

  constructor(private readonly trackService: TrackService) {
    super();
  }

  async remove(id: string): Promise<void> {
    await super.remove(id);

    const albumIndexInFavAlbums = dataBase.favs.albums.findIndex(
      (albumId) => albumId === id,
    );

    albumIndexInFavAlbums >= 0 &&
      dataBase.favs.albums.splice(albumIndexInFavAlbums, 1);

    const albumTracks = await this.trackService.findManyByProperty(
      id,
      Property.ALBUM_ID,
    );

    albumTracks.forEach((track) => {
      this.trackService.update(track.id, {
        ...track,
        albumId: null,
      });
    });
  }
}
