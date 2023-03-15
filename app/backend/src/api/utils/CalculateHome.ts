import IMatch from '../interface/IMatch';

export default class CalculateHome {
  public static totalVictories(matches: IMatch[]): number {
    const victories = matches
      .reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
        if (homeTeamGoals > awayTeamGoals) {
          return acc + 1;
        }
        return acc;
      }, 0);
    return victories;
  }

  public static totalDraws(matches: IMatch[]): number {
    const draws = matches
      .reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
        if (homeTeamGoals === awayTeamGoals) {
          return acc + 1;
        }
        return acc;
      }, 0);
    return draws;
  }

  public static totalPoints(matches: IMatch[]): number {
    const victories = this.totalVictories(matches);
    const draws = this.totalDraws(matches);

    const points = victories * 3 + draws;
    return points;
  }

  public static totalGames(matches: IMatch[]): number {
    const games = matches.reduce((acc) => acc + 1, 0);
    return games;
  }

  public static totalLosses(matches: IMatch[]): number {
    const losses = matches
      .reduce((acc, { homeTeamGoals, awayTeamGoals }) => {
        if (homeTeamGoals < awayTeamGoals) {
          return acc + 1;
        }
        return acc;
      }, 0);
    return losses;
  }

  public static goalsFavor(matches: IMatch[]): number {
    const goalsFavor = matches
      .reduce((acc, { homeTeamGoals }) => acc + homeTeamGoals, 0);
    return goalsFavor;
  }

  public static goalsOwn(matches: IMatch[]): number {
    const goalsOwn = matches
      .reduce((acc, { awayTeamGoals }) => acc + awayTeamGoals, 0);
    return goalsOwn;
  }

  public static goalsBalance(matches: IMatch[]): number {
    const goalsPro = this.goalsFavor(matches);
    const goalsAgainst = this.goalsOwn(matches);

    const goalsBalance = goalsPro - goalsAgainst;
    return goalsBalance;
  }

  public static efficiency(matches: IMatch[]): string {
    const points = this.totalPoints(matches);
    const games = this.totalGames(matches);

    const efficiency = ((points / (games * 3)) * 100).toFixed(2);
    return efficiency;
  }
}
