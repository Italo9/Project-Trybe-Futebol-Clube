import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

export default class TeamsService {
  constructor(private matchesModel = Matches) {}

  async getAll(): Promise<Matches[]> {
    const matches: Matches[] = await this.matchesModel.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}
