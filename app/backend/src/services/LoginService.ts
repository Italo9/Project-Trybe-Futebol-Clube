import User from '../database/models/users';
import BcryptPassword from './BcryptPassword';
import JwtService from './JwtService';

export interface ILoginService {
  email: string,
  password: string,
}

export default class LoginService {
  constructor(private userModel = User) {}

  static validateUser() {
    const e = new Error('Incorrect email or password');
    e.name = 'UNAUTHORIZED';
    throw e;
  }

  async login({ email, password }: ILoginService): Promise< string | void> {
    if (!email || !password) {
      const e = new Error('All fields must be filled');
      e.name = 'ValidationError';
      throw e;
    }
    const user = await this.userModel.findOne({ where: { email } });

    if (user) {
      const passwordEncrypt = await BcryptPassword.checkPassword(password, user.password);
      if (passwordEncrypt) {
        const token = JwtService.sign({ ...user }); return token;
      }
    } else {
      LoginService.validateUser();
    }
  }
}
