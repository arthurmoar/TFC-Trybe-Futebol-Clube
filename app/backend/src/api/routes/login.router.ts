import { Router } from 'express';
import LoginController from '../controller/LoginController';
import LoginService from '../service/LoginService';
import Authorization from '../middlewares/Authorization';

const loginRouter = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/', loginController.login);
loginRouter.get('/role', Authorization.token, loginController.userRole);

export default loginRouter;
