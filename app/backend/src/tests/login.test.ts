import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {App} from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando rota de login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        id: 1,
        username: 'user',
        password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc',
        role: 'admin',
        email: 'user@email.com',
      } as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Deve retornar token e status 200 ao fazer login corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: 'admin',
        password: 'valide_email'
       })

       expect(chaiHttpResponse).to.have.status(200);
       expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

  it('Deve retornar status 400 ao tentar logar sem parametros ', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        password: 'valide_email'
       })

       expect(chaiHttpResponse).to.have.status(400);
       expect(chaiHttpResponse.body.massage).to.be.equal('All fields must be filled');
  });
});
