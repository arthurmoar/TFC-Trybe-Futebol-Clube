import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import MatchesService from '../service/MatchesService';

const matchRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchRouter.get('/', matchesController.findAll);

export default matchRouter;
