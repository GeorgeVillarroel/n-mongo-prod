import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './schemas/song.schema';
import { Model } from 'mongoose';
import { CreateSongDTO } from './dto/create-song.dto';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async create(createSongDTO: CreateSongDTO): Promise<Song> {
    const [durationMinutes, durationSeconds] = createSongDTO.duration
      .split(':')
      .map(Number);
    const durationInSeconds = durationMinutes * 60 + durationSeconds;
    const songDate = new Date(createSongDTO.releasedDate);
    const currentDate = new Date();
    if (songDate > currentDate) {
      throw new BadRequestException(
        'Invalid song release Date, release date can not be in the future, release date should be today or older.',
      );
    }

    if (durationMinutes >= 60 || durationSeconds >= 60) {
      throw new BadRequestException(
        'Invalid song duration, song minutes shouldnt be longer than 60 minutes, and songs seconds shouldnt be longer than 60 seconds.',
      );
    }

    try {
      const createdSong = new this.songModel({
        ...createSongDTO,
        duration: durationInSeconds,
        releasedDate: songDate,
      });
      return await createdSong.save();
    } catch (error) {
      throw new InternalServerErrorException('Backend error, ' + error);
    }
  }

  async findAll(): Promise<Song[]> {
    const songs = await this.songModel.find();
    return songs;
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.songModel.findById(id);
    if (!song) {
      throw new NotFoundException(`Song by id of ${id} not found.`);
    }
    return song;
  }

  async delete(id: string): Promise<void> {
    try {
      await this.songModel.deleteOne({ _id: id });
    } catch (err) {
      throw new NotFoundException(`Song by id of ${id} not found.` + err);
    }
    return;
  }
}
