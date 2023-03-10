import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';

import {App} from '../app';
import UserModel from '../database/models/UserModel';
import LoginService from '../api/service/LoginService';
import Authorization from '../api/middlewares/Authorization';

const loginService = new LoginService();

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('1 - Testando rota de login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
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

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('1.1 - Deve retornar token e status 200 ao fazer login corretamente', async () => {
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

  it('1.2 - Deve retornar status 400 ao tentar logar sem parametros ', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        password: 'valide_email'
       })

       expect(chaiHttpResponse).to.have.status(400);
       expect(chaiHttpResponse.body.massage).to.be.equal('All fields must be filled');
  });

  it('1.3 - Deve retornar um status 401 caso um token não enviado', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/login/role')

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Token not found');
  });

  it('1.4 - Teste se ao inserir um e-mail invalido retorna status 401', async function () {
    const inputMock = {
      email: 'invalidemail@admin.com',
      password: 'secret_admin',
    }
    const responseBody = {
      message: 'Invalid email or password',
    }
    sinon.stub(loginService, 'login').resolves(null);

    const response = await chai.request(app).post('/login').send(inputMock);
    expect(response.status).to.be.eq(401);
    expect(response.body).to.deep.eq(responseBody);
  });

  it('1.5 - Teste se ao inserir uma senha invalido retorna status 401', async function () {
    const inputMock = {
      email: 'admin@admin.com',
      password: 'invalid-password',
    }
    const responseBody = {
      message: 'Invalid email or password',
    }
    sinon.stub(bcrypt, 'compareSync').returns(false);

    const response = await chai.request(app).post('/login').send(inputMock);
    expect(response.status).to.be.eq(401);
    expect(response.body).to.deep.eq(responseBody);
  });
});
