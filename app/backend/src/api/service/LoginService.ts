import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import UserModel from '../../database/models/UserModel';
import IServiceLogin from '../interface/IServiceLogin';
import IUser from '../interface/IUser';

export default class LoginService implements IServiceLogin {
  protected model: ModelStatic<UserModel> = UserModel;

  public static encrypted(password: string, user: IUser) {
    const isValidPasword = bcrypt.compareSync(password, user.password);

    if (!isValidPasword) {
      const error = new Error('Invalid email or password');
      error.name = 'UNAUTHORIZED';
      throw error;
    }
  }

  async login(email: string, password: string): Promise<IUser | null> {
    const userLogin = await this.model.findOne({ where: { email } });
    if (userLogin) {
      LoginService.encrypted(password, userLogin);
    }
    return userLogin;
  }
}
