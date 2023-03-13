import IMatch from '../interface/IMatch';

export default class Calculate {
  public static calculatePoints = (team: IMatch[]) => {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    team.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (awayTeamGoals < homeTeamGoals) totalLosses += 1;

      if (awayTeamGoals > homeTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      }

      if (homeTeamGoals === awayTeamGoals) {
        totalDraws += 1;
        totalPoints += 1;
      }
    });

    return { totalPoints, totalLosses, totalDraws, totalVictories };
  };

  // public static totalVictories(id: number, matches: IMatch[]): number {
  //   const totalVictories = matches
  //     .reduce((acc, { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals }) => {
  //       if (homeTeamId === id && homeTeamGoals > awayTeamGoals) {
  //         return acc + 1;
  //       }
  //       if (awayTeamId === id && awayTeamGoals > homeTeamGoals) {
  //         return acc + 1;
  //       }
  //       return acc;
  //     }, 0);
  //   return totalVictories;
  // }

  // public static totalDraws(id: number, matches: IMatch[]): number {
  //   const totalDraws = matches
  //     .reduce((acc, { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }) => {
  //       if (homeTeamId === id && homeTeamGoals === awayTeamGoals) {
  //         return acc + 1;
  //       }
  //       if (awayTeamId === id && awayTeamGoals === homeTeamGoals) {
  //         return acc + 1;
  //       }
  //       return acc;
  //     }, 0);
  //   return totalDraws;
  // }

  // public static totalPoints(id: number, matches: IMatch[]): number {
  //   const victories = Calculate.totalVictories(id, matches);
  //   const draws = Calculate.totalDraws(id, matches);

  //   const totalPoints = victories * 3 + draws;
  //   return totalPoints;
  // }

  public static totalGames(id: number, matches: IMatch[]): number {
    const totalGames = matches.reduce((acc, { homeTeamId, awayTeamId }) => {
      if (homeTeamId === id || awayTeamId === id) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalGames;
  }

  // public static totalLosses(id: number, matches: IMatch[]): number {
  //   const totalLosses = matches
  //     .reduce((acc, { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals }) => {
  //       if (homeTeamId === id && homeTeamGoals < awayTeamGoals) {
  //         return acc + 1;
  //       }
  //       if (awayTeamId === id && awayTeamGoals < homeTeamGoals) {
  //         return acc + 1;
  //       }
  //       return acc;
  //     }, 0);
  //   return totalLosses;
  // }

  public static goalsFavor(id: number, matches: IMatch[]): number {
    const goalsFavor = matches
      .reduce((acc, { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeamId === id) return acc + homeTeamGoals;
        if (awayTeamId === id) return acc + awayTeamGoals;
        return acc;
      }, 0);
    return goalsFavor;
  }

  public static goalsOwn(id: number, matches: IMatch[]): number {
    const goalsOwn = matches
      .reduce((acc, { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }) => {
        if (homeTeamId === id) return acc + awayTeamGoals;
        if (awayTeamId === id) return acc + homeTeamGoals;
        return acc;
      }, 0);
    return goalsOwn;
  }
}
