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
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class findOneParams extends cardParams {
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  comment_id: string;
}

export class findOneParamsWithUser extends findOneParams {
  @IsString()
  @Matches(/^\d+$/)
  user: string;
}

export class paramsAndDto {
  @ValidateNested()
  @Type(() => createCommentDto)
  dto: createCommentDto;

  @ValidateNested()
  @Type(() => findOneParamsWithUser)
  params: findOneParamsWithUser;
}
