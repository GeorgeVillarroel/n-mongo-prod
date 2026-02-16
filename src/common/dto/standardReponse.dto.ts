import { ApiProperty } from '@nestjs/swagger';

export class StandardResponseDto<T> {
  @ApiProperty({ description: 'The actual data payload' })
  data: T;

  @ApiProperty({ example: 'Operation successful' })
  message: string;

  @ApiProperty({ example: 201 })
  statusCode: number;
}
