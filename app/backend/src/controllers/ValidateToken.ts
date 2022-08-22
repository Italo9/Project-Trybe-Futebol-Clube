import { Request, Response } from 'express';
import ValidateTokenService from '../services/ValidateTokenService';

require('express-async-errors');

export default class ValidateToken {
  static async validateToken(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    if (authorization) {
      const role = await ValidateTokenService.validateToken(authorization);
      res.status(200).json({ role });
    }
  }
}
