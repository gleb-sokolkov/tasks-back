import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class createUserDto {
  @ApiProperty({
    example: 'email@email.domain',
    description: 'Почта пользователя',
    nullable: false,
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Axs@xsa1sj',
    description: 'Пароль пользователя',
    minimum: 7,
    maximum: 20,
    nullable: false,
    type: String,
  })
  @IsString()
  @MinLength(7)
  @MaxLength(20)
  password: string;
}

export class changeRolesDto {
  @ApiProperty({
    example: ['ADMIN', 'USER'],
    description: 'Права пользователя',
    type: [String],
  })
  @IsNotEmpty()
  roles: string[];
}

export class findOneParams {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор',
    nullable: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  user_id: string;
}
