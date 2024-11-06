import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const { artists, albums, tracks } = this.items;
    const response = {
      artists: await this.artistService.findMany(artists),
      albums: await this.albumService.findMany(albums),
      tracks: await this.trackService.findMany(tracks),
    };

    return response;
  }

  async create(source: ItemName, id: string): Promise<ItemType> {
    const matcher = {
      [Item.TRACK]: () => this.addTrack(id),
      [Item.ALBUM]: () => this.addAlbum(id),
      [Item.ARTIST]: () => this.addArtist(id),
    };

    return matcher[source]();
  }

  async remove(source: ItemName, id: string): Promise<void> {
    const matcher = {
      [Item.TRACK]: () => this.deleteTrack(id),
      [Item.ALBUM]: () => this.deleteAlbum(id),
      [Item.ARTIST]: () => this.deleteArtist(id),
    };

    await matcher[source]();
  }

  private async addTrack(id: string): Promise<Track> {
    return <Track>await this.addItem(id, this.items.tracks, this.trackService);
  }

  private async addAlbum(id: string): Promise<Album> {
    return <Album>await this.addItem(id, this.items.albums, this.albumService);
  }

  private async addArtist(id: string): Promise<Artist> {
    return <Artist>(
      await this.addItem(id, this.items.artists, this.artistService)
    );
  }

  private async deleteTrack(id: string): Promise<void> {
    await this.deleteItem(id, this.items.tracks);
  }

  private async deleteAlbum(id: string): Promise<void> {
    await this.deleteItem(id, this.items.albums);
  }

  private async deleteArtist(id: string): Promise<void> {
    await this.deleteItem(id, this.items.artists);
  }

  private async addItem(
    id: string,
    favItems: string[],
    service: RequestService<ItemType>,
  ): Promise<ItemType> {
    const item = await service.findOne(id, StatusCodes.UNPROCESSABLE_ENTITY);

    if (!favItems.includes(id)) {
      favItems.push(id);
    }

    return item;
  }

  private async deleteItem(id: string, favItems: string[]): Promise<void> {
    const indexInFavs = favItems.findIndex((item) => item === id);

    if (indexInFavs === -1) {
      throw new UnprocessableEntityException(this.notFoundErrorMessage);
    }

    favItems.splice(indexInFavs, 1);
  }
}
