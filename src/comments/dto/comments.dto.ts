import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsNotEmpty, IsOptional } from 'class-validator';
import { findOneParams as cardParams } from 'src/cards/dto/cards.dto';

export class createCommentDto {
  @ApiProperty({
    example: 'Привет',
    description: 'Текст сообщения',
    nullable: false,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class findOneParams extends cardParams {
  @ApiProperty({
    example: '1123',
    description: 'Уникальный идентификатор',
    nullable: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  comment_id: string;
}
