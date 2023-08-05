import supertest from 'supertest';
import app from '../../index';
import { Authentication } from '../../utils/Authentication';

const request = supertest(app);
const token: string = Authentication.generateToken(1, 'bearer');

describe('Authentication controller: ', () => {
  it('/auth/register return message: Successfully register user!', () => {
    const data = {
      username: 'Shen',
      password: '123456',
      passwordConfirm: '123456'
    };
    request
      .post('auth/register')
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully register user!'
      });
  });

    it('/auth/login return message: Successfully register user!', () => {
      const data = {
        username: 'Shen',
        password: '123456',
        passwordConfirm: '123456'
      };
      request
        .post('auth/register')
        .send(data)
        .expect('Content-Type', 'application/json')
        .expect(200)
        .expect({
          message: 'Successfully login!',
          token: `${token}`
        });
    });

});