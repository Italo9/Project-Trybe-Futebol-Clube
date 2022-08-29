import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();
leaderboardRouter.get('/home', (req, res) => leaderboardController.filterRatings(req, res));

export default leaderboardRouter;
