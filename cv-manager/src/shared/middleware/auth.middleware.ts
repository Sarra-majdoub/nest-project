import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['auth-user'];

    if (!token || typeof token !== 'string') {
      return res.status(401).json({ message: 'Token manquant ou invalide' });
    }

    try {
      const decoded: any = jwt.verify(token, 'votre_clé_secrète');
      if (!decoded.userId) {
        return res
          .status(401)
          .json({ message: 'userId manquant dans le token' });
      }
      (req as any).user = { id: decoded.userId };
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: 'Token invalide', error: err.message });
    }
  }
}
