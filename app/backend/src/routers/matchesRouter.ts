import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

const matchesRouter = Router();
matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));

export default matchesRouter;
