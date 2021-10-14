import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  Matches,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
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

export class findOneParamsWithUser extends findOneParams {
  @ApiProperty({
    example: '51',
    description: 'Уникальный идентификатор аутентифицированного пользователя',
    nullable: false,
    type: String,
  })
  @IsString()
  @Matches(/^\d+$/)
  user: string;
}

export class paramsAndDto {
  @ApiProperty({
    description: 'create comment DTO',
    type: () => createCommentDto,
  })
  @ValidateNested()
  @Type(() => createCommentDto)
  dto: createCommentDto;

  @ApiProperty({
    type: () => findOneParamsWithUser,
  })
  @ValidateNested()
  @Type(() => findOneParamsWithUser)
  params: findOneParamsWithUser;
}
