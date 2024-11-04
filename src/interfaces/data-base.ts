import { User } from './user';
import { Artist } from './artist';
import { Track } from './track';

export interface DataBase {
  users: User[];
  artists: Artist[];
  tracks: Track[];
}
