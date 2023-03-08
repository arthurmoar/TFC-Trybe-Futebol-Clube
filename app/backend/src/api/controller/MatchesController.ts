import { Request, Response } from 'express';
import IServiceMatch from '../interface/IServiceMatch';

export default class MatchesController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  findAll = async (req: Request, res: Response) => {
    const allMatches = await this._service.findAll();

    return res.status(200).json(allMatches);
  };
}
