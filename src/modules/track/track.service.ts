import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestService } from '../../shared/request.service';
import { ErrorMessage } from '../../enums/error-message';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService extends RequestService<TrackEntity> {
  protected notFoundErrorMessage = ErrorMessage.TRACK_NOT_EXIST;

  constructor(
    @InjectRepository(TrackEntity)
    protected readonly repository: Repository<TrackEntity>,
  ) {
    super(repository);
  }
}
