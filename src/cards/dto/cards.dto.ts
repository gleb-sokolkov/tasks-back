import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsNotEmpty, IsOptional } from 'class-validator';
import { findOneParams as columnParams } from 'src/columns/dto/columns.dto';

export class createCardDto {
  @ApiProperty({
    example: 'Карточка1',
    description: 'Имя карточки',
    nullable: false,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name = 'card';

  @ApiProperty({
    example: 'Сделать api',
    description: 'Описание карточки',
    type: String,
  })
  @IsString()
  description: string;
}

export class findOneParams extends columnParams {
  @ApiProperty({
    example: '44',
    description: 'Уникальный идентификатор',
    nullable: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  card_id: string;
}
