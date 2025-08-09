import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Retrieve token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // Validate token
    const { sub } = verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as Payload;

    // Take user id from token and put into user_id variable in req object
    req.user_id = sub;

    return next();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return res.status(401).end();
  }
}
