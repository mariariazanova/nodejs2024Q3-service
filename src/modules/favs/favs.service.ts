import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ErrorMessage } from '../../enums/error-message';
import dataBase from '../../data-base/data-base';
import { Favorites, FavoritesResponse } from '../../interfaces/favorites';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { v4 } from 'uuid';
import { Track } from '../../interfaces/track';
import { Artist } from '../../interfaces/artist';
import { Album } from '../../interfaces/album';
import { RequestService } from '../../shared/request.service';
import { ItemName, ItemType } from '../../interfaces/item';
import { Item } from '../../enums/item';
import { Action } from '../../enums/action';

@Injectable()
export class FavsService {
  //fix it
  // protected notFoundErrorMessage = ErrorMessage.ARTIST_NOT_EXIST;
  // notFoundErrorMessage = ErrorMessage.ARTIST_NOT_EXIST;

  // protected get items(): Favorites[] {
  //   return dataBase.favs;
  // }

  private get items(): Favorites {
    // return null;
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
    console.log(this.items);
    const { artists, albums, tracks } = this.items;
    console.log(artists, albums, tracks);

    const response = {
      artists: this.artistService.findMany(artists),
      albums: this.albumService.findMany(albums),
      tracks: this.trackService.findMany(tracks),
    };

    return response;
  }

  create(source: ItemName, id: string): ItemType {
    console.log(source, id);
    const matcher = {
      [Item.TRACK]: () => this.addTrack(id),
      [Item.ALBUM]: () => this.addAlbum(id),
      [Item.ARTIST]: () => this.addArtist(id),
    };

    return matcher[source]();
    // return <ItemType>this.getMethod(id)[source][Action.ADD]();
    // matcher[source];
  }

  remove(source: ItemName, id: string): void {
    const matcher = {
      [Item.TRACK]: () => this.deleteTrack(id),
      [Item.ALBUM]: () => this.deleteAlbum(id),
      [Item.ARTIST]: () => this.deleteArtist(id),
    };

    matcher[source]();
    // return <void>this.getMethod(id)[source][Action.DELETE]();
  }

  private getMethod(
    id: string,
  ): () => Record<Item, Record<Action, () => ItemType | void>> {
    const matcher = {
      [Item.TRACK]: {
        [Action.ADD]: () => this.addTrack(id),
        [Action.DELETE]: () => this.deleteTrack(id),
      },
      [Item.ALBUM]: {
        [Action.ADD]: () => this.addAlbum(id),
        [Action.DELETE]: () => this.deleteAlbum(id),
      },
      [Item.ARTIST]: {
        [Action.ADD]: () => this.addArtist(id),
        [Action.DELETE]: () => this.deleteArtist(id),
      },
    };

    return () => matcher;
  }

  private addTrack(id: string): Track {
    return <Track>this.addItem(id, this.items.tracks, this.trackService);
  }

  private addAlbum(id: string): Album {
    return <Album>this.addItem(id, this.items.albums, this.albumService);
  }

  private addArtist(id: string): Artist {
    console.log('add artist')
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
    const item = service.findOne(id);
    console.log(item);

    if (!favItems.includes(id)) {
      favItems.push(id);
    }

    return item;
  }

  private deleteItem(id: string, favItems: string[]): void {
    const indexInFavs = favItems.findIndex((item) => item === id);

    if (indexInFavs === -1) {
      //error?
    }

    favItems.splice(indexInFavs, 1);
  }
}
