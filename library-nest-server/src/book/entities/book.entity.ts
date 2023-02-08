import { ApiProperty } from '@nestjs/swagger';
import { Book } from '@prisma/client';

export class BookEntity implements Book {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  publication_date: Date;

  @ApiProperty({ required: false, nullable: false })
  isbn: string;

  @ApiProperty({ required: false, nullable: false })
  stock: number;
}
