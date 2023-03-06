import ErrorMap from '../../utils/errorMap';

export default class Validator {
  static async ValidatorEmail(email: string) {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

    if (!regex.test(email)) {
      return { type: ErrorMap.UNAUTHORIZED, message: 'Invalid email or password' };
    }

    return { type: null, message: '' };
  }

  static async ValidatorSenha(password: string) {
    if (password.length < 6) {
      return { type: ErrorMap.UNAUTHORIZED, message: 'Invalid email or password' };
    }
  }
}
