import IMatch from './IMatch';

export default interface IServiceMatch {
  findAll(): Promise<IMatch[]>
  finishMatch(id: number): Promise<void>
}
