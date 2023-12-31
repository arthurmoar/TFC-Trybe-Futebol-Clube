import IMatch from './IMatch';

export default interface IServiceMatch {
  findAll(): Promise<IMatch[]>
  finishMatch(id: number): Promise<void>
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
  createMatch(
    homeTeamId: number, awayTeamId: number, homeTeamGoals: number, awayTeamGoals: number
  ): Promise<IMatch>
}
