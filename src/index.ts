import express from "express";
import "express-async-errors";
import client from "prom-client";
import router from "./router";
import cors from "cors";
import { AppDataSource } from "./datasource";

const application = express();

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ prefix: "myapp" });
application.use(express.json());
application.use(cors());
application.use(router);

application.listen(3001, () => {
  AppDataSource.initialize().then(() => {
    console.log("DB initialized?", AppDataSource.isInitialized);
  });

  console.log("listening on port http://bookstoreapp:3001");
});
