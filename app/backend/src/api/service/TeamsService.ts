import TeamsModel from '../../database/models/TeamsModel';

export default class TeamsService {
  static async getAll() {
    const times = TeamsModel.findAll();

    return times;
  }

  static async getById(id: number) {
    const teams = TeamsModel.findByPk(id);

    return teams;
  }
}
