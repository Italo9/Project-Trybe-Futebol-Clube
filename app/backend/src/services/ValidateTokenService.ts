import * as jwt from 'jsonwebtoken';

export default class ValidateTokenService {
  static validateToken(token: string): Promise<string> {
    if (!token) {
      const e = new Error('Token not found');
      e.name = 'UNAUTHORIZED';
      throw e;
    }
    try {
      const { dataValues } = jwt
        .verify(token, process.env.JWT_SECRET || 'jwt_secret') as jwt.JwtPayload;
      return dataValues.role;
    } catch (error) {
      const e = new Error('Token must be a valid token');
      e.name = 'UNAUTHORIZED';
      throw e;
    }
  }
}
