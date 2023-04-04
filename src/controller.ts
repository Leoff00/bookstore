import { Request, Response } from "express";
import { BookstoreRepository } from "./repository";
import { BookDTO } from "./interface";
import client from "prom-client";

const repository = new BookstoreRepository();

export class BookstoreController {
  static metricsController(request: Request, response: Response) {
    response.set("Content-Type", client.register.contentType);
    return response.end(client.register.metrics());
  }

  static async getBooksController(request: Request, response: Response) {
    const registry = new client.Registry();

    const counter = new client.Counter({
      registers: [registry],
      name: "metric_request_get_total",
      help: "numero total de reqs",
      labelNames: ["methods", "route", "status"],
    });

    const limit = parseInt(request?.query?.limit as any) || 10;
    const offset = parseInt(request?.query?.offset as any) || 0;
    const sortBy = request?.query?.sortBy || ("" as any);

    const { data, totalPages, total } = await repository.getBooks(
      sortBy,
      limit,
      offset
    );

    counter.inc({
      methods: "GET",
      route: "/api/get-books",
      status: response.statusCode,
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
