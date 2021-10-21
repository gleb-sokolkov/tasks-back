import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class createRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Роль пользователя',
    nullable: false,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty({
    example: 'Администратор сайта',
    description: 'Описание роли',
    type: String,
  })
  @IsString()
  description: string;
}

export class findOneParams {
  @ApiProperty({
    example: '163',
    description: 'Уникальный идентификатор',
    nullable: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  role_id: string;
}
