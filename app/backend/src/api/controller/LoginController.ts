import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import IServiceLogin from '../interface/IServiceLogin';
import ValidationLogin from '../helpers/ValidateLogin';

const { JWT_SECRET } = process.env;

export default class LoginController {
  private _service: IServiceLogin;

  constructor(service: IServiceLogin) {
    this._service = service;
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    ValidationLogin.validateEmail(email);
    ValidationLogin.validatePassword(password);

    const result = await this._service.login(email, password);
    if (!result) {
      const error = new Error('Invalid email or password');
      error.name = 'UNAUTHORIZED';
      throw error;
    }
    const payload = {
      role: result.role,
    };
    const token = jwt.sign(payload, JWT_SECRET as string);
    return res.status(200).json({ token });
  };

  userRole = async (req: Request, res: Response) => {
    const { role } = req.body;
    return res.status(200).json(role);
  };
}
