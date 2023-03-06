import jwt = require('../utils/Encoded');
import UserModel from '../../database/models/UserModel';
import ErrorMap from '../utils/errorMap';
import IServiceUser from '../interface/IServiceLogin';
import IUser from '../interface/IUser';

export default class LoginService {
  static async login(email: string, password: string): Promise<IServiceUser> {
    if (!email || !password) {
      return { type: ErrorMap.BAD_REQUEST, message: 'All fields must be filled' };
    }

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return { type: ErrorMap.UNAUTHORIZED, message: 'Invalid email or password' };
    }

    const token = jwt.createToken(email);

    return { type: null, message: token };
  }

  static async userRole(token: string): Promise<string> {
    const decoded = jwt.validateToken(token);
    const { data } = decoded;
    const email = data;
    const { role } = await UserModel.findOne({ where: { email } }) as IUser;
    return role;
  }
}
