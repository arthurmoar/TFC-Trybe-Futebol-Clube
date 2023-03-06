import { NextFunction, Request, Response } from 'express';
import * as JWT from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export default class Authorization {
  public static token(req: Request, res: Response, next: NextFunction) {
    const getToken = req.headers.authorization;

    if (!getToken) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const verify = JWT.verify(getToken, JWT_SECRET as string);

      req.body.role = verify;

      return next();
    } catch (erro) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
