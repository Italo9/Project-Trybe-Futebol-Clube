import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

require('express-async-errors');

export default class TeamsController {
  constructor(private matchesService: MatchesService) { }

  async getAll(req: Request, res: Response): Promise<void> {
    const matches = await this.matchesService.getAll();
    res.status(200).json(matches);
  }
}
