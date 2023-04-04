export interface BookDTO {
  id?: string;
  bookname: string;
  author: string;
  price: number;
  review: string;
  createdDate?: Date;
  updatedDate?: Date;
}
