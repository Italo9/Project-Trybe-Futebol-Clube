import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

require('express-async-errors');

export default class TeamsController {
  constructor(private matchesService: MatchesService) { }

  async getAll(req: Request, res: Response): Promise<void> {
    const matches = await this.matchesService.getAll();
    res.status(200).json(matches);
  }

  async saveMatch(req: Request, res: Response): Promise<void> {
    const matche = await this.matchesService.saveMatch(req.body);
    res.status(201).json(matche);
  }

  async updateMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.matchesService.updateMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }
}
