import { Router } from 'express';
import LoginController from '../controller/LoginController';
import Authorization from '../middlewares/Authorization';

const loginRouter = Router();

loginRouter.post('/', (req, res) => LoginController.login(req, res));
loginRouter.get('/role', Authorization.token, (req, res) => LoginController.validate(req, res));

export default loginRouter;
