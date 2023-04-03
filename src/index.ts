import express from "express";
import router from "./router";
import cors from "cors";
import client from "prom-client";
import { AppDataSource } from "./datasource";

const histogram = new client.Histogram({
  name: "metric_name",
  help: "metric_help",
  buckets: [0.1, 5, 15, 50, 100, 500],
});

AppDataSource.initialize().then(() => {
  const application = express();
  histogram.observe(10);

  application.use(express.json());
  application.use(cors());
  application.use(router);
  return application.listen(4000, () => {
    console.log(AppDataSource.isInitialized);
    console.log("listening on port http://localhost:4000");
  });
});
