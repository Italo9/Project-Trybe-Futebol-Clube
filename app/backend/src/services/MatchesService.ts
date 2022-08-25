import { IMatches } from '../interfaces/IMatches';
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

  async saveMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: IMatches):
  Promise<Matches> {
    const matches: Matches = await this.matchesModel.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true });
    return matches;
  }

  async updateMatch(id: number): Promise<object | null> {
    const updateMatche = await this.matchesModel.findOne({ where: { id } });
    updateMatche?.set({
      inProgress: false,
    });
    updateMatche?.save();
    return updateMatche;
  }
}
