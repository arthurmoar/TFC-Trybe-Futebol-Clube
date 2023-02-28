import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => TeamsController.getAllTeams(req, res));
teamsRouter.get('/:id', (req, res) => TeamsController.getTeamById(req, res));

export default teamsRouter;
