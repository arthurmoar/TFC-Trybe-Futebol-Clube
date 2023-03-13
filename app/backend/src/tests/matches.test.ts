import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import * as JWT from 'jsonwebtoken';

import { Model } from 'sequelize';

import matchesMock from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('3 - Testando a rota de partidas /matches', function () {
  afterEach(function() {
    sinon.restore();
  });

  it('3.1 - Deve retornar um array de partidas', async function () {
    sinon.stub(MatchesModel, 'findAll').resolves(matchesMock.oneMatch as unknown as Model[]);

    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(matchesMock.oneMatch);
  });

  it('3.2 - Deve retornar um array com sem as partidas "inprogress"', async function () {
    sinon.stub(MatchesModel, 'findAll').resolves(matchesMock.matches as unknown as Model[]);

    const response = await chai.request(app)
      .get('/matches?inProgress=false');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(matchesMock.oneMatch);
  });

  it('3.3 - Deve atualizar uma partida com sucesso', async function () {
    sinon.stub(JWT, 'verify').callsFake(() => {
      return Promise.resolve({success: 'Token is valid'});
    });

    const response = await chai.request(app)
      .patch('/matches/1')
      .set('authorization', 'token')
      .send(matchesMock.requestUpdate);
    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq({ message: `Updated match` });
  });

  it('3.4 - Deve criar uma partida com sucesso', async function () {
    sinon.stub(JWT, 'verify').callsFake(() => {
      return Promise.resolve({success: 'Token is valid'});
    });
    sinon.stub(MatchesModel, 'create').resolves(matchesMock.createMatch as unknown as Model);

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'token')
      .send(matchesMock.creationRequest);
    expect(response.status).to.be.eq(201);
    expect(response.body).to.deep.eq(matchesMock.createMatch);
  });

  it('3.5 - Deve finalizar uma partida com sucesso', async function () {
    sinon.stub(JWT, 'verify').callsFake(() => {
      return Promise.resolve({success: 'Token is valid'});
    });

    const response = await chai.request(app)
      .patch('/matches/1/finish')
      .set('authorization', 'token');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq({ message: 'Finished' });
  });
});