import { Router } from 'express';
import TeamsService from '../service/TeamsService';
import TeamsController from '../controller/TeamsController';

const teamsRoutes = Router();
const teamService = new TeamsService();
const teamsController = new TeamsController(teamService);

teamsRoutes.get('/', teamsController.getAllTeams);
teamsRoutes.get('/:id', teamsController.getTeamById);

export default teamsRoutes;
