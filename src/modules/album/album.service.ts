import { Injectable } from '@nestjs/common';
import { RequestService } from '../../shared/request.service';
import { ErrorMessage } from '../../enums/error-message';
import dataBase from '../../data-base/data-base';
import { Album } from '../../interfaces/album';
import { Property } from '../../enums/property';
import { TrackService } from '../track/track.service';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService extends RequestService<AlbumEntity> {
  protected notFoundErrorMessage = ErrorMessage.ALBUM_NOT_EXIST;

  // protected get items(): Album[] {
  //   return dataBase.albums;
  // }

  constructor(
    @InjectRepository(AlbumEntity)
    protected readonly repository: Repository<AlbumEntity>,
    private readonly trackService: TrackService) {
    super(repository);
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
