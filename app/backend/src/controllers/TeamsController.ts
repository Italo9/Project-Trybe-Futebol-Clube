import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

require('express-async-errors');

export default class TeamsController {
  constructor(private teamsService: TeamsService) { }

  async getAll(req: Request, res: Response): Promise<void> {
    const teams = await this.teamsService.getAll();
    res.status(200).json(teams);
  }
}
