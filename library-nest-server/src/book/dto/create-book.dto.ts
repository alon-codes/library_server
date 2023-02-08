import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  readonly author: string;

  @IsString()
  @ApiProperty({ required: false, nullable: false })
  @IsOptional()
  readonly isbn: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  readonly publication_date: Date;

  @IsNumber()
  @MinLength(1)
  @IsOptional()
  @ApiProperty({ required: false, nullable: false })
  readonly stock: number;
}
