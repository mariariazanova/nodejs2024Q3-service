import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favs.entity';

@Module({
  imports: [
    ArtistModule,
    AlbumModule,
    TrackModule,
    TypeOrmModule.forFeature([FavoriteEntity]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
