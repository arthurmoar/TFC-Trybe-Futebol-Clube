import { Router } from 'express';
import TeamsService from '../service/TeamsService';
import LeaderboardController from '../controller/LeaderboardController';
import LeaderboardService from '../service/LeaderboardService';

const leaderboardRoutes = Router();
const teamService = new TeamsService();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(teamService, leaderboardService);

leaderboardRoutes.get('/home', leaderboardController.leaderboardHome);

export default leaderboardRoutes;
