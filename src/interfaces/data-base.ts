import { User } from './user';
import { Artist } from './artist';
import { Track } from './track';
import { Album } from './album';
import { Favorites } from './favorites';

export interface DataBase {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favs: Favorites;
}
