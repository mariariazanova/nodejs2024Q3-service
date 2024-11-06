import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ErrorMessage } from '../../enums/error-message';
import dataBase from '../../data-base/data-base';
import { Favorites, FavoritesResponse } from '../../interfaces/favorites';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { Track } from '../../interfaces/track';
import { Artist } from '../../interfaces/artist';
import { Album } from '../../interfaces/album';
import { RequestService } from '../../shared/request.service';
import { ItemName, ItemType } from '../../interfaces/item';
import { Item } from '../../enums/item';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class FavsService {
  notFoundErrorMessage = ErrorMessage.FAVORITE_NOT_EXIST;

  private get items(): Favorites {
    return dataBase.favs;
  }

  constructor(
    // private readonly artistService: ArtistService,
    // private readonly albumService: AlbumService,
    // private readonly trackService: TrackService,

    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  findAll(): FavoritesResponse {
    const { artists, albums, tracks } = this.items;
    const response = {
      artists: this.artistService.findMany(artists),
      albums: this.albumService.findMany(albums),
      tracks: this.trackService.findMany(tracks),
    };

    return response;
  }

  create(source: ItemName, id: string): ItemType {
    const matcher = {
      [Item.TRACK]: () => this.addTrack(id),
      [Item.ALBUM]: () => this.addAlbum(id),
      [Item.ARTIST]: () => this.addArtist(id),
    };

    return matcher[source]();
  }

  remove(source: ItemName, id: string): void {
    const matcher = {
      [Item.TRACK]: () => this.deleteTrack(id),
      [Item.ALBUM]: () => this.deleteAlbum(id),
      [Item.ARTIST]: () => this.deleteArtist(id),
    };

    matcher[source]();
  }

  private addTrack(id: string): Track {
    return <Track>this.addItem(id, this.items.tracks, this.trackService);
  }

  private addAlbum(id: string): Album {
    return <Album>this.addItem(id, this.items.albums, this.albumService);
  }

  private addArtist(id: string): Artist {
    return <Artist>this.addItem(id, this.items.artists, this.artistService);
  }

  private deleteTrack(id: string): void {
    this.deleteItem(id, this.items.tracks);
  }

  private deleteAlbum(id: string): void {
    this.deleteItem(id, this.items.albums);
  }

  private deleteArtist(id: string): void {
    this.deleteItem(id, this.items.artists);
  }

  private addItem(
    id: string,
    favItems: string[],
    service: RequestService<any>,
  ): ItemType {
    const item = service.findOne(id, StatusCodes.UNPROCESSABLE_ENTITY);

    if (!favItems.includes(id)) {
      favItems.push(id);
    }

    return item;
  }

  private deleteItem(id: string, favItems: string[]): void {
    const indexInFavs = favItems.findIndex((item) => item === id);

    if (indexInFavs === -1) {
      throw new UnprocessableEntityException(this.notFoundErrorMessage);
    }

    favItems.splice(indexInFavs, 1);
  }
}
