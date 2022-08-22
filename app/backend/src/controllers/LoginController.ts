import { Request, Response } from 'express';
// import status from 'http-status-codes';
import LoginService from '../services/LoginService';

require('express-async-errors');
// import { IUserService } from '../services/usersService';

export default class LoginController {
  constructor(private loginService: LoginService) { }

  async login(req: Request, res: Response): Promise<void> {
    const token = await this.loginService.login(req.body);
    res.status(200).json({ token });
  }
}
