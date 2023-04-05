import client from "prom-client";

export const counter = new client.Counter({
  name: "total_requests_in_numbers",
  help: "total request number of route /api/get-books",
  labelNames: ["methods", "route", "status"],
});

export const histogram = new client.Histogram({
  name: "metric_request_duration_in_seconds",
  help: "histogram for duration of requests in seconds",
  labelNames: ["methods", "route", "status"],
  buckets: [0.5, 1, 2, 5, 6, 10],
});

export default client;
