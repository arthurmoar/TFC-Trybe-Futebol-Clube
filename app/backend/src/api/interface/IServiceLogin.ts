import IUser from './IUser';

export default interface IServiceLogin {
  login(email: string, password: string): Promise<IUser | null>
}
