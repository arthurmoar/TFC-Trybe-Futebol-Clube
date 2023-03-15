import CalculateHome from './CalculateHome';
import ITeam from '../interface/ITeam';
import IMatch from '../interface/IMatch';
import ILeaderboard from '../interface/ILeaderborder';

export default class LeaderborderHomeCalc {
  public static leaderborderCalc(teams: ITeam[], matches: IMatch []): ILeaderboard[] {
    const leaderboardHome = teams.map(({ id, teamName }) => {
      const homeMatches = matches.filter(({ homeTeamId }) => homeTeamId === id);
      return {
        name: teamName,
        totalPoints: CalculateHome.totalPoints(homeMatches),
        totalGames: CalculateHome.totalGames(homeMatches),
        totalVictories: CalculateHome.totalVictories(homeMatches),
        totalDraws: CalculateHome.totalDraws(homeMatches),
        totalLosses: CalculateHome.totalLosses(homeMatches),
        goalsFavor: CalculateHome.goalsFavor(homeMatches),
        goalsOwn: CalculateHome.goalsOwn(homeMatches),
        goalsBalance: CalculateHome.goalsBalance(homeMatches),
        efficiency: CalculateHome.efficiency(homeMatches),
      };
    });
    return leaderboardHome;
  }

  public static orderedResult(leaderboard: ILeaderboard[]) {
    const order = leaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));
    return order;
  }
}
