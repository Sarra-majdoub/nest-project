import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly secret = 'votre_secret_jwt'; // Même secret que pour la génération

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['auth-user'] as string;

    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }

    try {
      const decoded = verify(token, this.secret) as { userId: number }; // Notez le type number
      req['userId'] = decoded.userId; // Stocke l'ID numérique
      next();
    } catch (error) {
      console.error('Erreur de vérification du token:', error.message);
      throw new UnauthorizedException('Token invalide');
    }
  }
}