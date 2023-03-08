export default class ValidationLogin {
  public static validateEmail(email: string) {
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
    if (!emailRegex.test(email)) {
      const error = new Error('Invalid email or password');
      error.name = 'UNAUTHORIZED';
      throw error;
    }
  }

  public static validatePassword(password: string) {
    if (password.length < 6) {
      const error = new Error('Invalid email or password');
      error.name = 'UNAUTHORIZED';
      throw error;
    }
  }
}
