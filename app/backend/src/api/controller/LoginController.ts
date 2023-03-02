import { Request, Response } from 'express';
import LoginService from '../service/LoginService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { type, message } = await LoginService.login(email, password);

    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(200).json({ token: message });
  }
}
