import { Request, Response } from 'express';
import LoginService from '../service/LoginService';
import Validator from '../service/Validation/LoginValidation';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { type, message } = await LoginService.login(email, password);

    Validator.ValidatorEmail(email);
    Validator.ValidatorSenha(password);

    if (type) {
      return res.status(type).json({ message });
    }

    res.status(200).json({ token: message });
  }

  static async validate(req: Request, res: Response) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const userRole = await LoginService.userRole(token);
    return res.status(200).json({ role: userRole });
  }
}
