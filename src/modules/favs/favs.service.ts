import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ErrorMessage } from '../../enums/error-message';
import { FavoritesResponse } from '../../interfaces/favorites';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { RequestService } from '../../shared/request.service';
import { ItemName, ItemType } from '../../interfaces/item';
import { Item } from '../../enums/item';
import { StatusCodes } from 'http-status-codes';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favs.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { AlbumEntity } from '../album/entities/album.entity';

@Injectable()
export class FavsService {
  notFoundErrorMessage = ErrorMessage.FAVORITE_NOT_EXIST;

  // private get items(): Favorites {
  //   return dataBase.favs;
  // }

  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly repository: Repository<FavoriteEntity>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const favorites = await this.repository.find();

    const artistIds = favorites
      .filter((fav) => fav.source === Item.ARTIST)
      .map((fav) => fav.sourceId);
    const albumIds = favorites
      .filter((fav) => fav.source === Item.ALBUM)
      .map((fav) => fav.sourceId);
    const trackIds = favorites
      .filter((fav) => fav.source === Item.TRACK)
      .map((fav) => fav.sourceId);
    // const { artists, albums, tracks } = favorites;
    // const response = {
    //   artists: await this.artistService.findMany(artists),
    //   albums: await this.albumService.findMany(albums),
    //   tracks: await this.trackService.findMany(tracks),
    // };
    const response = {
      artists: await this.artistService.findMany(artistIds),
      albums: await this.albumService.findMany(albumIds),
      tracks: await this.trackService.findMany(trackIds),
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

  private async addTrack(id: string): Promise<TrackEntity> {
    return <TrackEntity>await this.addItem(id, Item.TRACK, this.trackService);
  }

  private async addAlbum(id: string): Promise<AlbumEntity> {
    return <AlbumEntity>await this.addItem(id, Item.ALBUM, this.albumService);
  }

  private async addArtist(id: string): Promise<ArtistEntity> {
    return <ArtistEntity>await this.addItem(id, Item.ARTIST, this.artistService);
  }

  private async deleteTrack(id: string): Promise<void> {
    await this.deleteItem(id, Item.TRACK);
  }

  private async deleteAlbum(id: string): Promise<void> {
    await this.deleteItem(id, Item.ALBUM);
  }

  private async deleteArtist(id: string): Promise<void> {
    await this.deleteItem(id, Item.ARTIST);
  }

  private async addItem(
    id: string,
    source: ItemName,
    service: RequestService<ItemType>,
  ): Promise<ItemType> {
    const item = await service.findOne(id, StatusCodes.UNPROCESSABLE_ENTITY);
    const existingFavorite = await this.repository.findOne({
      where: { source, sourceId: id },
    });

    if (existingFavorite) {
      throw new UnprocessableEntityException(
        `${source} is already in favorites`,
      );
    }

    await this.repository.save({ source, sourceId: id });

    // if (!favItems.includes(id)) {
    //   favItems.push(id);
    // }

    return item;
  }

  private async deleteItem(id: string, source: ItemName): Promise<void> {
    // const indexInFavs = favItems.findIndex((item) => item === id);
    const favorite = await this.repository.findOne({
      where: { source, sourceId: id },
    });

    if (!favorite) {
      throw new UnprocessableEntityException(this.notFoundErrorMessage);
    }

    // Remove the item from the favorites table
    await this.repository.remove(favorite);

    // if (indexInFavs === -1) {
    //   throw new UnprocessableEntityException(this.notFoundErrorMessage);
    // }
    //
    // favItems.splice(indexInFavs, 1);
  }
}
