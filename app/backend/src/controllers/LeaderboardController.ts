import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

require('express-async-errors');

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) { }

  async filterRatings(req: Request, res: Response): Promise<void> {
    const ratings = await this.leaderboardService.filterRatings();
    res.status(200).json(ratings);
  }
}
