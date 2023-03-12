import TeamsModel from '../../database/models/TeamsModel';
// import TeamsService from '../service/TeamsService';

export default class ValidadeMatch {
  public static async isEqualTeams(homeTeamId: number, awayTeamId: number) {
    if (homeTeamId === awayTeamId) {
      const error = new Error('It is not possible to create a match with two equal teams');
      error.name = 'UNPROCESSABLE_CONTENT';
      throw error;
    }
  }

  public static async teamValidateDB(homeTeamId: number, awayTeamId: number) {
    // const allTeams = await TeamsService.getAll();
    // const db = allTeams.map(({ id }) => id);

    const teamMatchOne = await TeamsModel.findOne({ where: { id: homeTeamId } });
    const teamMatchTwo = await TeamsModel.findOne({ where: { id: awayTeamId } });

    if (!teamMatchOne || !teamMatchTwo) {
      const error = new Error('There is no team with such id!');
      error.name = 'NOT_FOUND';
      throw error;
    }

    // if (!ids.some((teamId) => db.includes(teamId))) {
    //   const error = new Error('There is no team with such id!');
    //   error.name = 'NOT_FOUND';
    //   throw error;
    // }
  }
}
