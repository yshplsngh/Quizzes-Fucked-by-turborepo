import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { corsOptions, credentials } from "./utils/corsOption";

const app: Express = express();

app.disable("x-powered-by");
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/_health", (_req: Request, res: Response) => {
  res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timeStamp: Date.now(),
  });
});

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timeStamp: Date.now(),
  });
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log("Listening on port: ", port);

process.on("uncaughtException", (err) => {
  console.error(err);
  console.log("caught exception: " + err);
});
