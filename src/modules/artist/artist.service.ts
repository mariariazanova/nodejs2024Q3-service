import { Injectable } from '@nestjs/common';
import { RequestService } from '../../shared/request.service';
import { ErrorMessage } from '../../enums/error-message';
import dataBase from '../../data-base/data-base';
import { Artist } from '../../interfaces/artist';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { Property } from '../../enums/property';

@Injectable()
export class ArtistService extends RequestService<Artist> {
  protected notFoundErrorMessage = ErrorMessage.ARTIST_NOT_EXIST;

  protected get items(): Artist[] {
    return dataBase.artists;
  }

  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {
    super();
  }

  remove(id: string): void {
    super.remove(id);

    const artistIndexInFavArtists = dataBase.favs.artists.findIndex(
      (artistId) => artistId === id,
    );

    artistIndexInFavArtists >= 0 &&
      dataBase.favs.artists.splice(artistIndexInFavArtists, 1);

    const artistAlbums = this.albumService.findManyByProperty(
      id,
      Property.ARTIST_ID,
    );

    artistAlbums.forEach((album) => {
      this.albumService.update(album.id, {
        ...album,
        artistId: null,
      });
    });

    const artistTracks = this.trackService.findManyByProperty(
      id,
      Property.ARTIST_ID,
    );

    artistTracks.forEach((track) => {
      this.trackService.update(track.id, {
        ...track,
        artistId: null,
      });
    });
  }
}
