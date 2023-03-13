import { Request, Response } from 'express';
import IServiceTeam from '../interface/IServiceTeam';

class TeamsController {
  private _teamsService: IServiceTeam;

  constructor(teamsService: IServiceTeam) {
    this._teamsService = teamsService;
  }

  getAllTeams = async (req: Request, res: Response) => {
    const result = await this._teamsService.getAll();
    return res.status(200).json(result);
  };

  getTeamById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await this._teamsService.getById(id);
    if (!result) {
      return res.status(404).json({
        message: 'Team not found',
      });
    }

    if (result) return res.status(200).json(result);
  };
}

export default TeamsController;
