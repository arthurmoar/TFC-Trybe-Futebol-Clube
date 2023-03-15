import CalculateAway from './CalculateAway';
import ITeam from '../interface/ITeam';
import IMatch from '../interface/IMatch';
import ILeaderboard from '../interface/ILeaderborder';

export default class LeaderborderAwayCalc {
  public static leaderborderCalc(teams: ITeam[], matches: IMatch[]): ILeaderboard[] {
    const leaderboardAway = teams.map(({ id, teamName }) => {
      const awayMatches = matches.filter(({ awayTeamId }) => awayTeamId === id);
      return {
        name: teamName,
        totalPoints: CalculateAway.totalPoints(awayMatches),
        totalGames: CalculateAway.totalGames(awayMatches),
        totalVictories: CalculateAway.totalVictories(awayMatches),
        totalDraws: CalculateAway.totalDraws(awayMatches),
        totalLosses: CalculateAway.totalLosses(awayMatches),
        goalsFavor: CalculateAway.goalsFavor(awayMatches),
        goalsOwn: CalculateAway.goalsOwn(awayMatches),
        goalsBalance: CalculateAway.goalsBalance(awayMatches),
        efficiency: CalculateAway.efficiency(awayMatches),
      };
    });
    return leaderboardAway;
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
