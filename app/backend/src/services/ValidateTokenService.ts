import * as jwt from 'jsonwebtoken';

export default class ValidateTokenService {
  static async validateToken(token: string): Promise<string> {
    if (!token) {
      const e = new Error('Token not found');
      e.name = 'UNAUTHORIZED';
      throw e;
    }
    const { dataValues } = jwt
      .verify(token, process.env.JWT_SECRET || 'jwt_secret') as jwt.JwtPayload;
    return dataValues.role;
  }
}
