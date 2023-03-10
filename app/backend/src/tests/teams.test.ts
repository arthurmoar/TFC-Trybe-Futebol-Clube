import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import teamsMock from './mocks/teamsMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('1 - Teste na rota teams ', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })

  it('1.1 - Testando se retonar todos os times e com o status 200 ', async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves(teamsMock.teams as TeamsModel[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock.teams);
  });

  it('1.2 - Testando se retonar um times procurando pelo Id e com o status 200 ', async () => {
    sinon
      .stub(TeamsModel, "findByPk")
      .resolves(teamsMock.teamsByPk as TeamsModel);

    chaiHttpResponse = await chai
       .request(app)
       .get(`/teams/${teamsMock.teamsByPk.id}`)

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock.teamsByPk);
  });

  it('1.3 - Testando se retorna erro 404', async function() {
    const outputMock = { message: 'Team not found' };
    sinon.stub(TeamsModel, 'findByPk').resolves(null);

    const response = await chai.request(app).get('/teams/999');
    expect(response.status).to.be.eq(404);
    expect(response.body).to.deep.eq(outputMock);
  });
});
