import { AppDataSource } from "./datasource";
import { Bookstore } from "./entities/bookstore";
import { BookDTO } from "./interface";

export class BookstoreRepository {
  private readonly repository = AppDataSource.getRepository(Bookstore);

  public async getBooks(): Promise<BookDTO[]> {
    const data = await this.repository.query(`
    SELECT * FROM bookstore
    `);

    return data;
  }

  public async getBooksByPrice(price: number): Promise<BookDTO[]> {
    const data = await this.repository.query(
      `
    SELECT * FROM bookstore
    WHERE price = $1
    LIMIT 5
    `,
      [price]
    );

    return data;
  }

  public async getBooksPerPage(
    limit?: number,
    offset?: number,
    skip?: number,
    take?: number
  ): Promise<any> {
    // const data = await this.repository.query(
    //   `
    // SELECT * FROM bookstore
    // LIMIT $1 OFFSET $2
    // `,
    //   [limit, offset]
    // );

    // const totalPages = Math.ceil(data.length / limit);

    // return { data, totalPages };

    const data = await this.repository.findAndCount({
      order: {
        price: "ASC",
      },
      skip,
      take,
    });

    return data;
  }

  public async registerBooks(book: BookDTO): Promise<void> {
    await this.repository.query(
      `
      INSERT INTO bookstore (bookname, author, price, review) VALUES ($1, $2, $3, $4);
      `,
      [book.bookname, book.author, book.price, book.review]
    );
  }

  public async updateBooks(book: BookDTO, id: string): Promise<void> {
    await this.repository.query(
      `
    UPDATE bookstore 
    SET bookname = $2, author = $3, price = $4, review = $5
    WHERE ID = $1
    `,
      [id, book.bookname, book.author, book.price, book.review]
    );
  }

  public async deleteBooks(id: string): Promise<void> {
    await this.repository.query(
      `
    DELETE FROM bookstore WHERE ID = $1
    `,
      [id]
    );
  }
}
