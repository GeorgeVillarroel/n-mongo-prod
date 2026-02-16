import { IsDateString, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly title: string;

  @IsDateString()
  readonly releasedDate: string;
}
