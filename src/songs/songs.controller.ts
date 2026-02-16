import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';
import { Song } from './schemas/song.schema';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { StandardResponseDto } from 'src/common/dto/standardReponse.dto';

@Controller('songs')
@ApiTags('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new Song' })
  // @ApiResponse({ status: 201, description: 'The song has created successfully', })
  // @ApiResponse({ status: 400, description: 'Bad request (failed validation)' })
  @ApiCreatedResponse({
    description: 'The song has been created successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(StandardResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Song) },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or business logic error.',
    content: {
      'application/json': {
        examples: {
          durationTooLong: {
            summary:
              'Invalid song duration, song minutes shouldnt be longer than 60 minutes, and songs seconds shouldnt be longer than 60 seconds',
            value: {
              statusCode: 400,
              message: 'duration:invalid',
              error: 'Bad Request',
            },
          },
          invalidDate: {
            summary:
              'Invalid song release Date, release date can not be in the future, release date should be today or older',
            value: {
              statusCode: 400,
              message: 'releasedDate:invalid',
              error: 'Bad Request',
            },
          },
        },
      },
    },
  })
  async create(@Body() songDTO: CreateSongDTO): Promise<Song> {
    const song = await this.songsService.create(songDTO);
    return song;
  }

  @Get()
  @ApiOperation({ summary: 'Find all songs' })
  async find(): Promise<Song[]> {
    const songs = await this.songsService.findAll();
    return songs;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find song by Id' })
  async findOne(@Param('id') id: string): Promise<Song> {
    const song = await this.songsService.findOne(id);
    return song;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete song by Id' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.songsService.delete(id);
    return;
  }
}
