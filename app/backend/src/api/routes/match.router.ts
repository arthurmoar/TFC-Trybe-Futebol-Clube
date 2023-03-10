import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import Authorization from '../middlewares/Authorization';
import MatchesService from '../service/MatchesService';

const matchRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchRouter.get('/', matchesController.findAll);
matchRouter.patch('/:id/finish', Authorization.token, matchesController.finishMatch);
matchRouter.patch('/:id', Authorization.token, matchesController.updateMatch);

export default matchRouter;
