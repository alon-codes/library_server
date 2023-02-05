import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Book {
  @ObjectIdColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  ISBN: string;

  @Column({ default: new Date(), nullable: false })
  publication_date: Date;

  @Column({ default: 1 })
  stock: number;
}