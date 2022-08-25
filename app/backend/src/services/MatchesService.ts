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
    if (homeTeam === awayTeam) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'UNAUTHORIZED'; throw e;
    }
    const existsAwayTeam = (await (this.getAll())).find((ele) => ele.awayTeam === awayTeam);
    const existsHomeTeam = (await (this.getAll())).find((ele) => ele.homeTeam === homeTeam);
    if (!existsAwayTeam || !existsHomeTeam) {
      const e = new Error('There is no team with such id!');
      e.name = 'NotFoundError'; throw e;
    }
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
