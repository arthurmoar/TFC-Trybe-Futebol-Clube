import IMatch from './IMatch';

export default interface IServiceLeaderboard {
  findLeaderboard(): Promise<IMatch[]>
}
