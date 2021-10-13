import { IsString, Matches, IsNotEmpty, IsOptional } from 'class-validator';
import { findOneParams as columnParams } from 'src/columns/dto/columns.dto';

export class createCardDto {
  @IsString()
  @IsNotEmpty()
  name = 'card';

  @IsString()
  description: string;
}

export class findOneParams extends columnParams {
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  card_id: string;
}
