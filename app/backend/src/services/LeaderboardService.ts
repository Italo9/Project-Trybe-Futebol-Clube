import { IClassification, IClassificationAuxiliary } from '../interfaces/IClassification';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

export default class LeaderboardService {
  constructor(private matchesModel = Matches, private teamsModel = Teams) {}

  private static getName(elementoId: number, teams: Teams[]): Teams {
    const objectName = teams.find((elementoTeams) => elementoTeams.id === elementoId);
    return objectName as Teams;
  }

  private static getDraws(elemento: Matches, id: number): number {
    if (elemento.homeTeam === id && elemento.homeTeamGoals === elemento.awayTeamGoals) {
      return 1;
    } return 0;
  }

  private static getTotalDraws(matche: Matches[], id: number): number {
    let accumulator = 0;
    matche.forEach((element) => {
      const draws = LeaderboardService.getDraws(element, id);
      accumulator += draws;
    });
    return accumulator;
  }

  private static getVictories(elemento: Matches, id: number): number {
    if (elemento.homeTeam === id && elemento.homeTeamGoals > elemento.awayTeamGoals) {
      return 1;
    } return 0;
  }

  private static getTotalVictories(matche: Matches[], id: number): number {
    let accumulator = 0;
    matche.forEach((element) => {
      const victorie = LeaderboardService.getVictories(element, id);
      accumulator += victorie;
    });
    return accumulator;
  }

  private static getLosses(elemento: Matches, id: number): number {
    if (elemento.homeTeam === id && elemento.homeTeamGoals < elemento.awayTeamGoals) {
      return 1;
    } return 0;
  }

  private static getTotalLosses(matches: Matches[], id: number): number {
    let accumulator = 0;
    matches.forEach((element) => {
      const losses = LeaderboardService.getLosses(element, id);
      accumulator += losses;
    });
    return accumulator;
  }

  private static getGoalsFavor(elemento: Matches, id: number): number {
    if (id === elemento.homeTeam) {
      return elemento.homeTeamGoals;
    } return 0;
  }

  private static getTotalGoalsFavor(matches: Matches[], id: number): number {
    let accumulator = 0;
    matches.forEach((element) => {
      const goalsFavor = LeaderboardService.getGoalsFavor(element, id);
      accumulator += goalsFavor;
    });
    return accumulator;
  }

  private static getGoalsOwn(elemento: Matches, id: number): number {
    if (id === elemento.homeTeam) {
      return elemento.awayTeamGoals;
    } return 0;
  }

  private static getTotalGoalsOwn(matches: Matches[], id: number): number {
    let accumulator = 0;
    matches.forEach((element) => {
      const goalsOwn = LeaderboardService.getGoalsOwn(element, id);
      accumulator += goalsOwn;
    });
    return accumulator;
  }

  private static auxiliary(id: number, matches: Matches[]) {
    const obj:IClassificationAuxiliary = {
      totalVictories: LeaderboardService.getTotalVictories(matches, id),
      totalDraws: LeaderboardService.getTotalDraws(matches, id),
      totalLosses: LeaderboardService.getTotalLosses(matches, id),
      goalsFavor: LeaderboardService.getTotalGoalsFavor(matches, id),
      goalsOwn: LeaderboardService.getTotalGoalsOwn(matches, id),
    }; return obj;
  }

  private static descendingResult(obj:IClassification[]): IClassification[] {
    const result = obj as IClassification[];
    result.sort((a: IClassification, b: IClassification) => (
      b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn
    )); return result;
  }

  async filterRatings(): Promise<IClassification[]> {
    const matches: Matches[] = await this.matchesModel.findAll({ where: { inProgress: false } });
    const teams: Teams[] = await this.teamsModel.findAll();
    const result = teams.map((elemento) => {
      const { id, teamName } = LeaderboardService.getName(elemento.id, teams);
      const auxiliary = LeaderboardService.auxiliary(id, matches);
      const totalPoints = (auxiliary.totalVictories * 3) + auxiliary.totalDraws;
      const totalGames = auxiliary.totalVictories + auxiliary.totalDraws + auxiliary.totalLosses;
      const obj:IClassification = {
        name: teamName,
        ...auxiliary,
        totalPoints,
        totalGames,
        goalsBalance: auxiliary.goalsFavor - auxiliary.goalsOwn,
        efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
      }; return obj;
    });
    const descendingResult = LeaderboardService.descendingResult(result);
    return descendingResult;
  }
}
