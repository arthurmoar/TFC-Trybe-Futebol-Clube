import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

import { app } from '../app';
import MatchModel from '../database/models/MatchesModel';
import matchesMock from './mocks/matchesMock';
import * as JWT from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

import { Model } from 'sequelize';

describe('Testando a rota de partidas', () => {
  afterEach(function() {
    sinon.restore();
  });

  it('Deve retornar todas as partidas em um array', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matchesMock.matches as unknown as Model[]);

    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(matchesMock.matches);
  })

  it('Deve retonar um array filtrando as partidas em progresso', async function () {
    sinon.stub(MatchModel, 'findAll').resolves(matchesMock.matches as unknown as Model[]);

    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(matchesMock.oneMatch);
  });

  it('Deve ser possivel atualizar uma partida', async function () {
    sinon.stub(JWT, 'verify').callsFake(() => {
      return Promise.resolve({success: 'Token is valid'});
    });

    const response = await chai.request(app)
      .patch('/matches/1')
      .set('authorization', 'token')
      .send(matchesMock.requestUpdate);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({ message: `Updated match` });
  });

  it('Deve ser capaz de criar uma partida com sucesso', async function () {

    sinon.stub(JWT, 'verify').callsFake(() => {
      return Promise.resolve({success: 'Token is valid'});
    });
    sinon.stub(MatchModel, 'create').resolves(matchesMock.createMatch as unknown as Model);

    const response = await chai.request(app)
      .post('/matches')
      .send(matchesMock.creationRequest);
    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal(matchesMock.createMatch);
  });

  it('Deve ser possivel finalizar uma partida', async function () {
    sinon.stub(JWT, 'verify').callsFake(() => Promise.resolve({success: 'Token is valid'}));

    const response = await chai.request(app)
      .patch('/matches/1/finish')
      .set('authorization', 'token');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq({ message: 'Finished' });
  });
})