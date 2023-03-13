import { ModelStatic } from 'sequelize';
import MatchesModel from '../../database/models/MatchesModel';
import IMatch from '../interface/IMatch';
import IServceLeaderboard from '../interface/IServiceLeaderboard';

export default class LeaderboardService implements IServceLeaderboard {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async findLeaderboard(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: 0 },
      raw: true,
    });
    return matches;
  }
}
