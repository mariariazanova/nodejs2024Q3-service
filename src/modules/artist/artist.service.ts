import { Injectable } from '@nestjs/common';
import { RequestService } from '../../shared/request.service';
import { ErrorMessage } from '../../enums/error-message';
import dataBase from '../../data-base/data-base';
import { Artist } from '../../interfaces/artist';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { Property } from '../../enums/property';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from '../track/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService extends RequestService<ArtistEntity> {
  protected notFoundErrorMessage = ErrorMessage.ARTIST_NOT_EXIST;

  // protected get items(): Artist[] {
  //   return dataBase.artists;
  // }

  constructor(
    @InjectRepository(ArtistEntity)
    protected readonly repository: Repository<ArtistEntity>,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {
    super(repository);
  }

  async remove(id: string): Promise<void> {
    await super.remove(id);

    const artistIndexInFavArtists = dataBase.favs.artists.findIndex(
      (artistId) => artistId === id,
    );

    artistIndexInFavArtists >= 0 &&
      dataBase.favs.artists.splice(artistIndexInFavArtists, 1);

    const artistAlbums = await this.albumService.findManyByProperty(
      id,
      Property.ARTIST_ID,
    );

    artistAlbums.forEach((album) => {
      this.albumService.update(album.id, {
        ...album,
        artistId: null,
      });
    });

    const artistTracks = await this.trackService.findManyByProperty(
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
