import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "bookstore" })
export class Bookstore {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 55 })
  bookname: string;

  @Column({ length: 55 })
  author: string;

  @Column("double precision")
  price: number;

  @Column()
  review: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
