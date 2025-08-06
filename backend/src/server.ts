import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);
app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

app.listen(3333, () => console.log("SERVER ONLINE !!"));
