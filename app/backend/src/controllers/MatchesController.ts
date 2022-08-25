import { Request, Response } from 'express';
import ValidateTokenService from '../services/ValidateTokenService';
import MatchesService from '../services/MatchesService';

require('express-async-errors');

export default class TeamsController {
  constructor(private matchesService: MatchesService) { }

  async getAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getAll();
    if (inProgress && inProgress === 'true') {
      const matcheInProgressTrue = matches.filter((ele) => ele.inProgress);
      res.status(200).json(matcheInProgressTrue);
    } if (inProgress && inProgress === 'false') {
      const matcheInProgressFalse = matches.filter((ele) => !ele.inProgress);
      res.status(200).json(matcheInProgressFalse);
    }
    res.status(200).json(matches);
  }

  async saveMatch(req: Request, res: Response): Promise<void> {
    ValidateTokenService.validateToken(req.headers.authorization as string);
    const matche = await this.matchesService.saveMatch(req.body);
    res.status(201).json(matche);
  }

  async updateMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.matchesService.updateMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateGameInProgress(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const update = await this.matchesService.updateGameInProgress(
      homeTeamGoals,
      awayTeamGoals,

      Number(id),
    );
    res.status(200).json(update);
  }
}
