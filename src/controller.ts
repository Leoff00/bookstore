import { Request, Response } from "express";
import { BookstoreRepository } from "./repository";
import { BookDTO } from "./interface";

const repository = new BookstoreRepository();

export class BookstoreController {
  static async getBooksController(request: Request, response: Response) {
    const data = await repository.getBooks();

    return response.status(200).json({
      data,
    });
  }

  static async getBooksByPriceController(request: Request, response: Response) {
    const { price } = request.query as any;

    const data = await repository.getBooksByPrice(parseFloat(price));

    return response.status(200).json({
      data,
    });
  }

  static async getBooksPerPageController(request: Request, response: Response) {
    const limit = parseInt(request.query.limit as any) || 0;
    const offset = parseInt(request.query.offset as any) || 0;
    const skip = parseInt(request.query.skip as any) || 0;
    const take = parseInt(request.query.take as any) || 0;

    const data = await repository.getBooksPerPage(limit, offset, skip, take);

    return response.status(200).json({
      data,
    });
  }

  static async registerBookController(request: Request, response: Response) {
    const book = request.body as BookDTO;

    await repository.registerBooks(book);

    return response.status(201).json({
      msg: "book created",
    });
  }
  static async updateBookController(request: Request, response: Response) {
    const { id } = request.params;
    const book = request.body as BookDTO;
    await repository.updateBooks(book, id);

    return response.status(201).json({
      msg: "book updated",
    });
  }
  static async deleteBookController(request: Request, response: Response) {
    const { id } = request.params;
    await repository.deleteBooks(id);

    return response.status(204).json();
  }
}
