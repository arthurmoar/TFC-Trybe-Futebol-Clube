import { Router } from 'express';

import teamsRouter from './teams.routes';
import loginRouter from './login.router';
import matchRouter from './match.router';
import leaderboardRouter from './leaderboard.router';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
