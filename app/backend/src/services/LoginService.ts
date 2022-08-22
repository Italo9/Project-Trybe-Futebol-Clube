import User from '../database/models/users';
import BcryptPassword from './BcryptPassword';
import JwtService from './JwtService';

export interface ILoginService {
  email: string,
  password: string,
}

export default class LoginService {
  constructor(private userModel = User) {}
  async login({ email, password }: ILoginService): Promise< string | void> {
    if (!email) {
      const e = new Error('All fields must be filled');
      e.name = 'ValidationError';
      throw e;
    }
    const user = await this.userModel.findOne({ where: { email } });
    if (user) {
      const passwordEncrypt = await BcryptPassword.checkPassword(password, user.password);
      const { id } = user;
      if (passwordEncrypt) {
        const token = JwtService.sign({
          email,
          id,
        });
        return token;
      }
    }
  }
}
