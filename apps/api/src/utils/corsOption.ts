import type { NextFunction, Request, Response } from "express";

const whiteList: string[] = ["http://localhost:5173"];

/*
 * The server needs to respond with the Access-Control-Allow-Credentials header in options request
 * The Access-Control-Allow-Credentials header indicates to the client that the HTTP response can be
 * shared when the credentials mode is set to include. If the server's response does not set the
 * Access-Control-Allow-Credentials header to true, the browser reports a network error
 */

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const origin = req.headers.origin;
  if (origin !== undefined) {
    if (whiteList.includes(origin)) {
      res.header("Access-Control-Allow-Credentials", "true");
    }
  }
  next();
};

// eslint-disable-next-line no-unused-vars
type InCallback = (error: Error | null, origin?: boolean) => void;
interface CorsOptions {
  // eslint-disable-next-line no-unused-vars
  origin: (origin: string | undefined, callback: InCallback) => void;
  optionsSuccessStatus: number;
}
export const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: InCallback): void {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
