import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class Book {
  @ObjectIdColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  ISBN: string;

  @Column()
  publication_date: Date;

  @Column({ default: 1 })
  stock: number;
}