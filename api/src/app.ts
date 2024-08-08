import bodyParser from "body-parser";
import express, { Handler } from "express";

const app = express();

app.use(bodyParser.json());

const handler: Handler = (req, res, next) => {
  res.status(200);
  res.send("Bar");
};

app.get("/foo", handler);

export default app;
