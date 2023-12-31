import { Request, Response } from 'express';

import IServiceLeaderboard from '../interface/IServiceLeaderboard';
import IServiceTeam from '../interface/IServiceTeam';
import LeaderborderAwayCalc from '../utils/LeaderbordeAwayCalc';
import LeaderborderHomeCalc from '../utils/LeaderborderHomeCalc';

export default class LeaderboardController {
  private _teamsService: IServiceTeam;
  private _leaderboardService: IServiceLeaderboard;

  constructor(teamsService: IServiceTeam, leaderboardService: IServiceLeaderboard) {
    this._teamsService = teamsService;
    this._leaderboardService = leaderboardService;
  }

  leaderboardHome = async (req: Request, res: Response) => {
    const teams = await this._teamsService.getAll();
    const matches = await this._leaderboardService.findLeaderboard();

    const calculateLeaderborder = LeaderborderHomeCalc.leaderborderCalc(teams, matches);
    const ordered = LeaderborderHomeCalc.orderedResult(calculateLeaderborder);
    return res.status(200).json(ordered);
  };

  leaderboardAway = async (req: Request, res: Response) => {
    const teams = await this._teamsService.getAll();
    const matches = await this._leaderboardService.findLeaderboard();

    const calculateLeaderborder = LeaderborderAwayCalc.leaderborderCalc(teams, matches);
    const ordered = LeaderborderAwayCalc.orderedResult(calculateLeaderborder);
    return res.status(200).json(ordered);
  };
}
