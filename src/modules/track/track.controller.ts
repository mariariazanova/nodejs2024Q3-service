import { Controller } from '@nestjs/common';
import { TrackService } from './track.service';
import { CommonController } from '../../shared/request.controller';
import { Track } from '../../interfaces/track';

@Controller('track')
export class TrackController extends CommonController<Track> {
  constructor(private readonly trackService: TrackService) {
    super(trackService);
  }
}
