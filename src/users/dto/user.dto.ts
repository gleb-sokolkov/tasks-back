import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class createUserDto {
  @ApiProperty({
    example: 'email@email.domain',
    description: 'Почта пользователя',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Axs@xsa1sj',
    description: 'Пароль пользователя',
    minimum: 7,
    maximum: 20,
    type: String,
  })
  @IsString()
  @MinLength(7)
  @MaxLength(20)
  password: string;
}

export class updateUserDto {
  @ApiProperty({
    example: 'email@email.domain',
    description: 'Почта пользователя',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Axs@xsa1sj',
    description: 'Пароль пользователя',
    minimum: 7,
    maximum: 20,
    type: String,
  })
  @IsString()
  @MinLength(7)
  @MaxLength(20)
  password: string;
}

export class findOneParams {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор пользователя',
    type: String,
  })
  @IsString()
  @Matches(/^\d+$/)
  id: string;
}
