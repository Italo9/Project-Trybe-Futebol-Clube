import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsService from '../services/TeamsService';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const teamsRouter = Router();
teamsRouter.get('/', (req, res) => teamsController.getAll(req, res));

export default teamsRouter;
