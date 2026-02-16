import { IsDateString, IsMilitaryTime, IsString } from 'class-validator';

export class CreateSongDTO {
  @IsString()
  readonly title: string;

  @IsMilitaryTime()
  readonly duration: string;

  @IsString()
  readonly lyrics?: string;

  @IsDateString()
  readonly releasedDate: string;

  @IsString()
  readonly album: string;
}
