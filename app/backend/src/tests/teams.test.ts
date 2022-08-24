import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams';

import { ITeams } from '../interfaces/ITeams';

chai.use(chaiHttp);

  const teamMock: ITeams = 
    {
      id: 5,
      teamName: "Cruzeiro"
    }

const { expect } = chai;

describe('/teams', () => {
  describe('Teams', () => {

    it('espera retorno de status 200', async () => {
      Sinon.stub(Teams, "findAll").resolves([teamMock as Teams]);
      const response = await chai.request(app)
        .get('/teams')

      expect(response.status).to.equal(200);
      Sinon.restore();
    })

    it('espera retorno de array de teams', async () => {
      Sinon.stub(Teams, "findAll").resolves([teamMock as Teams]);
      const response = await chai.request(app)
        .get('/teams')

      const  [teams] = response.body as ITeams[];
      
      expect(teams.id).to.equal(teamMock.id)
      expect(teams.teamName).to.equal(teamMock.teamName)
      Sinon.restore();
    })

    // it('espera retorno de uma team', async () => {
    //     Sinon.stub(Teams, "findOne").resolves(teamMock as Teams);
    //     const response = await chai.request(app)
    //       .get('/teams/5')
  
    //     const { team } = response.body;
        
    //     expect(team.id).to.equal(teamMock.id)
    //     expect(team.teamName).to.equal(teamMock.teamName)
    //     Sinon.restore();
    //   })

})})
