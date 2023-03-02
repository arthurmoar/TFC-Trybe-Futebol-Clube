import * as bcrypt from 'bcryptjs';
import UserModel from '../../database/models/UserModel';
import IServiceLogin from '../interface/IServiceLogin';
import Encoded from '../utils/Encoded';
import ErrorMap from '../utils/errorMap';

export default class LoginService {
  static async login(email: string, password: string): Promise<IServiceLogin> {
    if (!email || !password) {
      return { type: ErrorMap.BAD_REQUEST, message: 'All fields must be filled' };
    }

    const loginUser = await UserModel.findOne({ where: { email } });

    if (!loginUser) {
      return { type: ErrorMap.UNAUTHORIZED, message: 'Incorrect email or password' };
    }

    const encriptedPassword = await bcrypt.compare(password, loginUser.password);
    if (!encriptedPassword) {
      return { type: ErrorMap.UNAUTHORIZED, message: 'Incorrect email or password' };
    }

    const encodedToken = Encoded.encodedToken(email);

    return { type: null, message: encodedToken };
  }
}
