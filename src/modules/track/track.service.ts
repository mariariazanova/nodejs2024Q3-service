import { Injectable } from '@nestjs/common';
import { RequestService } from '../../shared/request.service';
import { Track } from '../../interfaces/track';
import { ErrorMessage } from '../../enums/error-message';
import dataBase from '../../data-base/data-base';

@Injectable()
export class TrackService extends RequestService<Track> {
  protected notFoundErrorMessage = ErrorMessage.TRACK_NOT_EXIST;

  protected get items(): Track[] {
    return dataBase.tracks;
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
