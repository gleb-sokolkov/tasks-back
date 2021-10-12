import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  Matches,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { findOneParams as userParams } from 'src/users/dto/user.dto';

export class createColumnDto {
  @ApiProperty({
    example: 'Axs@xsa1sj',
    description: 'Пароль пользователя',
    minimum: 7,
    maximum: 20,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name = 'column';
}

export class findOneParams extends userParams {
  @ApiProperty({
    example: '1123',
    description: 'Уникальный идентификатор',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  column_id: string;
}
