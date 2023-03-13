import { ModelStatic } from 'sequelize';
import ITeam from '../interface/ITeam';
import TeamModel from '../../database/models/TeamsModel';
import ITeamsServices from '../interface/IServiceTeam';

export default class TeamsService implements ITeamsServices {
  protected model: ModelStatic<TeamModel> = TeamModel;

  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
