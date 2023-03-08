import { Request, Response, NextFunction } from 'express';

export default class ErrorMiddleware {
  public static handle(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    const { name, message } = err;
    if (name === 'UNAUTHORIZED') {
      return res.status(401).json({ message });
    }
    if (name === 'NOT_FOUND') {
      return res.status(404).json({ message });
    }
    if (name === 'UNPROCESSABLE_CONTENT') {
      return res.status(422).json({ message });
    }
    return res.status(500);
  }
}
