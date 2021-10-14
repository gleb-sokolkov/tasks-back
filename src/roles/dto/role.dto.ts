import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
