import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity('Favorite')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['artist', 'album', 'track'],
  })
  source: 'artist' | 'album' | 'track';

  @Column('uuid')
  sourceId: string;
}

export class Favorites {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
