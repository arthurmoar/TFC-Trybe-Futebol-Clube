import { Request, Response } from 'express';
import TeamsService from '../service/TeamsService';

export default class TeamsController {
  static async getAllTeams(_req: Request, res: Response) {
    const times = await TeamsService.getAll();

    return res.status(200).json(times);
  }

  static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const team = await TeamsService.getById(Number(id));

    return res.status(200).json(team);
  }
}
