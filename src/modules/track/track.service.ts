import { Injectable } from '@nestjs/common';
import { RequestService } from '../../shared/request.service';
import { Track } from '../../interfaces/track';
import { ErrorMessage } from '../../enums/error-message';
import dataBase from '../../data-base/data-base';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService extends RequestService<TrackEntity> {
  protected notFoundErrorMessage = ErrorMessage.TRACK_NOT_EXIST;

  // protected get items(): Track[] {
  //   return dataBase.tracks;
  // }

  constructor(
    @InjectRepository(TrackEntity)
    protected readonly repository: Repository<TrackEntity>,
  ) {
    super(repository);
  }

  async remove(id: string): Promise<void> {
    await super.remove(id);

    const trackIndexInFavTracks = dataBase.favs.tracks.findIndex(
      (trackId) => trackId === id,
    );

    trackIndexInFavTracks >= 0 &&
      dataBase.favs.tracks.splice(trackIndexInFavTracks, 1);
  }
}
