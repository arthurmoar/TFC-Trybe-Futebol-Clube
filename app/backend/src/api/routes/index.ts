import { Router } from 'express';

import teamsRouter from './teams.routes';
import loginRouter from './login.router';
import matchRouter from './match.router';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
