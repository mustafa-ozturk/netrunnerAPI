import express from "express";
import { middlewareErrorHandler } from "./middleware";
import { config } from "./config.js";

const app = express();

app.use(middlewareErrorHandler);

app.listen(config.api.port, () => {
  console.log(`Server is running at http://localhost:${config.api.port}`);
});
