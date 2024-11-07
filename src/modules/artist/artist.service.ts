import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestService } from '../../shared/request.service';
import { ErrorMessage } from '../../enums/error-message';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService extends RequestService<ArtistEntity> {
  protected notFoundErrorMessage = ErrorMessage.ARTIST_NOT_EXIST;

  constructor(
    @InjectRepository(ArtistEntity)
    protected readonly repository: Repository<ArtistEntity>,
  ) {
    super(repository);
  }
}
