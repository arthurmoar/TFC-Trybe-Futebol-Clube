import { Request, Response } from 'express';
import IServiceMatch from '../interface/IServiceMatch';

export default class MatchesController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const allMatches = await this._service.findAll();

    if (inProgress === 'false') {
      const filterInProgressMatch = allMatches.filter((match) => !match.inProgress);

      return res.status(200).json(filterInProgressMatch);
    }
    if (inProgress === 'true') {
      const filterInProgressMatch = allMatches.filter((match) => match.inProgress);

      return res.status(200).json(filterInProgressMatch);
    }

    return res.status(200).json(allMatches);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._service.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };
}
