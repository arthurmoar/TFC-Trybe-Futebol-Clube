import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

import { app } from '../app';
import MatchModel from '../database/models/MatchesModel';
import matchesMock from './mocks/matchesMock';

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
    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(matchesMock.matches);
  })

  it('Deve retonar um array filtrando as partidas em progresso', async function () {
    sinon.stub(MatchModel, 'findAll').resolves(matchesMock.matches as unknown as Model[]);

    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(matchesMock.oneMatch);
  });
})