import { ModelStatic } from 'sequelize';
import MatchesModel from '../../database/models/MatchesModel';
import TeamsModel from '../../database/models/TeamsModel';
import IMatch from '../interface/IMatch';
import IServiceMatch from '../interface/IServiceMatch';

export default class MatchesService implements IServiceMatch {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async findAll(): Promise<IMatch[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}
