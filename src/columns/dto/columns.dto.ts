import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsNotEmpty, IsOptional } from 'class-validator';
import { findOneParams as userParams } from 'src/users/dto/user.dto';

export class createColumnDto {
  @ApiProperty({
    example: 'Колонка1',
    description: 'Имя колонки',
    nullable: false,
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
    nullable: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  column_id: string;
}
