import TeamsModel from '../../database/models/TeamsModel';

export default class TeamsService {
  static async getAll() {
    const times = TeamsModel.findAll();

    return times;
  }
}
