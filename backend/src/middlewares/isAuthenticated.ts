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
  // Receber token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // Validar token
    const { sub } = verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as Payload;

    // Recuperar id do token e colocar dentro de uma variável user_id dentro do req.
    req.user_id = sub;

    return next();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return res.status(401).end();
  }
}
