import Teams from '../database/models/teams';

export default class TeamsService {
  constructor(private teamsModel = Teams) {}

  async getAll(): Promise<Teams[]> {
    const teams: Teams[] = await this.teamsModel.findAll();
    return teams;
  }

  async getById(id: number): Promise<object | null> {
    const team = await this.teamsModel.findOne({ where: { id } });
    return team;
  }
}
