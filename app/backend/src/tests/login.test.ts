import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';

import { IUser } from '../interfaces/IUser';
import JwtService from '../services/JwtService';

chai.use(chaiHttp);

const userMock: IUser = {
  id: 1,
  username: 'any-name',
  email: 'any-email',
  password: 'any-hash',
  role: 'any-admin'
}

const { expect } = chai;

describe('/login', () => {
  describe('Login', () => {
    beforeEach(() => {
      Sinon.stub(User, "findOne").resolves(userMock as User);
    })
    })

    afterEach(() => {
      Sinon.restore();
    })

    it('espera retorno de status 200', async () => {
      const response = await chai.request(app)
        .post('/login').send({email: 'admin@admin.com', password: 'secret_admin'})

      expect(response.status).to.equal(200);
    })

    it('espera retorno token', async () => {
      Sinon.stub(JwtService, "sign").returns('token')
      const response = await chai.request(app)
        .post('/login')
        .send({email: 'admin@admin.com', password: 'secret_admin'})
      
      const { token } = response.body;
      
      expect(token).to.equal('token')
      Sinon.restore();
    })

    it('espera menssagem de erro quando não existe email', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({ password: 'secret_admin'})
      
        const { message } = response.body;

        expect(message).to.equal('All fields must be filled')
    })

    it('espera menssagem de erro com email errado', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({email: 'adminadmin.com', password: 'secret_admin'})
      
        const { message } = response.body;

        expect(message).to.equal('Incorrect email or password')
    })
});
