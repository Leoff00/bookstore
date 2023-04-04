import { AppDataSource } from "./datasource";
import { Bookstore } from "./entities/bookstore";
import { BookDTO } from "./interface";

export class BookstoreRepository {
  private readonly repository = AppDataSource.getRepository(Bookstore);

  public async getBooks(
    sortBy?: string,
    limit?: number,
    offset?: number
  ): Promise<{ data: BookDTO[]; totalPages: number; total: number }> {
    try {
      if (sortBy) {
        const result: BookDTO[] = await this.repository.query(
          `
            SELECT * FROM bookstore
            ORDER BY format('%s', ${sortBy})
            LIMIT $1 OFFSET $2
            `,
          [limit, offset]
        );

        const data = result.sort((a, b) => a.price - b.price);

        const [{ count }] = await this.repository.query(`
        SELECT COUNT(*) FROM bookstore;
        `);

        const parsedCount = parseInt(count);
        const totalPages = Math.ceil(parsedCount / limit);

        return { data, totalPages, total: parsedCount };
      }

      const data: BookDTO[] = await this.repository.query(
        `
          SELECT * FROM bookstore
          LIMIT $1 OFFSET $2
          `,
        [limit, offset]
      );

      const [{ count }] = await this.repository.query(`
      SELECT COUNT(*) FROM bookstore;
      `);

      const parsedCount = parseInt(count);
      const totalPages = Math.ceil(parsedCount / limit);

      return { data, totalPages, total: parsedCount };
    } catch (err) {
      console.log(err);
    }
  }

  public async registerBooks(book: BookDTO): Promise<void> {
    try {
      await this.repository.query(
        `
          INSERT INTO bookstore (bookname, author, price, review) VALUES ($1, $2, $3, $4);
          `,
        [book.bookname, book.author, book.price, book.review]
      );
    } catch (err) {
      console.log(err);
    }
  }

  public async updateBooks(book: BookDTO, id: string): Promise<void> {
    try {
      await this.repository.query(
        `
        UPDATE bookstore 
        SET bookname = $2, author = $3, price = $4, review = $5
        WHERE ID = $1
        `,
        [id, book.bookname, book.author, book.price, book.review]
      );
    } catch (err) {
      console.log(err);
    }
  }

  public async deleteBooks(id: string): Promise<void> {
    try {
      await this.repository.query(
        `
        DELETE FROM bookstore WHERE ID = $1
        `,
        [id]
      );
    } catch (err) {
      console.log(err);
    }
  }
}
