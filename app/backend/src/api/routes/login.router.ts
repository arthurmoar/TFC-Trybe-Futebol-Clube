import { Router } from 'express';
import LoginController from '../controller/LoginController';

const loginRouter = Router();

loginRouter.post('/', (req, res) => LoginController.login(req, res));

export default loginRouter;
