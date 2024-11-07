import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TrackEntity } from './entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
