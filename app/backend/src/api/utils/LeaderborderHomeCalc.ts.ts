import Calculate from './Calculate';
import ITeam from '../interface/ITeam';
import IMatch from '../interface/IMatch';
import ILeaderboard from '../interface/ILeaderborder';

export default class LeaderborderHomeCalc {
  public static leaderborderCalc(teams: ITeam[], matches: IMatch []): ILeaderboard[] {
    const result = teams.map(({ id, teamName }) => {
      const homeMatches = matches.filter(({ homeTeamId }) => homeTeamId === id);
      return {
        name: teamName,
        totalPoints: Calculate.calculatePoints(homeMatches).totalPoints,
        totalGames: Calculate.totalGames(id as number, homeMatches),
        totalVictories: Calculate.calculatePoints(homeMatches).totalVictories,
        totalDraws: Calculate.calculatePoints(homeMatches).totalDraws,
        totalLosses: Calculate.calculatePoints(homeMatches).totalLosses,
        goalsFavor: Calculate.goalsFavor(id as number, homeMatches),
        goalsOwn: Calculate.goalsOwn(id as number, homeMatches),
      };
    });
    return result;
  }
}
