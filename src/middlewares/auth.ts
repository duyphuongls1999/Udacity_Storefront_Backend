import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization;
    const token: string = authorizationHeader
      ? authorizationHeader.split(' ')[1]
      : '';

    res.locals.userData = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error: any) {
    const errorJson: string =
      error instanceof jwt.JsonWebTokenError
        ? 'Invalid JWT signature.'
        : error instanceof jwt.TokenExpiredError
        ? 'JWT token has expired.'
        : `Error while verifying JWT: ${error.message}`;
    res.status(401).json({
      message: errorJson,
    });
  }
};
