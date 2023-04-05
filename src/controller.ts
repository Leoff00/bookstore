import { Request, Response } from "express";
import { BookstoreRepository } from "./repository";
import { BookDTO } from "./interface";
import client, { counter, histogram } from "./metrify";

const repository = new BookstoreRepository();

export class BookstoreController {
  static async metricsController(request: Request, response: Response) {
    const registerMetrics = await client.register.metrics();
    response.set("Content-Type", client.register.contentType);
    return response.end(registerMetrics);
  }

  static async getBooksController(request: Request, response: Response) {
    const limit = parseInt(request?.query?.limit as any) || 10;
    const offset = parseInt(request?.query?.offset as any) || 0;
    const sortBy = request?.query?.sortBy || ("" as any);

    const { data, totalPages, total } = await repository.getBooks(
      sortBy,
      limit,
      offset
    );

    const [START, SIMULATE_TIME] = [Date.now(), 1000];
    setTimeout(() => {
      let END = Number(Date.now() - START);
      histogram.observe(END / 1000);
    }, SIMULATE_TIME);

    counter.inc({
      methods: "GET",
      route: "/api/get-books",
      status: 200,
    });

    return response.status(200).json({
      data,
      pageSize: limit,
      totalPages,
      total,
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
