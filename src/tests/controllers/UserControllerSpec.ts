import supertest from 'supertest';
import app from '../../index';
import { Authentication } from '../../utils/Authentication';

const request = supertest(app);
const token: string = Authentication.generateToken(1, 'bearer');

describe('User controllers: ', () => {
    it('/user should show all users', () => {
    request
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully getted users!',
        result: [
            {
                id: 1,
                username: 'phuong',
                first_name: 'phuong',
                last_name: 'tran',
                password: '$2b$08$ZmhC6jd1CXGg5nXdwJI7lOVP.A46kkX35y8acMgf4U8vrHo8S4.Ni'
            },
            {
                id: 2,
                username: 'Shen',
                first_name: 'Shen',
                last_name: 'Long',
                password: '$2b$08$n83XcZd0oQ/zGnUbFOXnP.ZFPlTQq2oVQBG/PhYs9VhBWbnQ4yOc6'
            }
        ]
    });
  });

  it('/user/:id show a user', () => {
    request
      .get('user/2')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully getted user!',
        result: {
            id: 2,
            username: 'Shen',
            first_name: 'Shen',
            last_name: 'Long',
            password: '$2b$08$n83XcZd0oQ/zGnUbFOXnP.ZFPlTQq2oVQBG/PhYs9VhBWbnQ4yOc6'
        }
    });
  });

  it('/user/username/:username show a user by username', () => {
    request
      .get('user/username/Shen')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully getted user!',
        result: {
            id: 2,
            username: 'Shen',
            first_name: 'Shen',
            last_name: 'Long',
            password: '$2b$08$n83XcZd0oQ/zGnUbFOXnP.ZFPlTQq2oVQBG/PhYs9VhBWbnQ4yOc6'
        }
    });
  });

  it('/users should update an user', () => {
    const data = {
        username: 'Shen',
        first_name: 'Shen',
        last_name: 'Long',
        password: '$2b$08$n83XcZd0oQ/zGnUbFOXnP.ZFPlTQq2oVQBG/PhYs9VhBWbnQ4yOc6'
    };
    request
      .put('/user/2')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully updated users!',
        result: {
            id: 2,
            username: 'Shen',
            first_name: 'Shen',
            last_name: 'Long',
            password: '$2b$08$n83XcZd0oQ/zGnUbFOXnP.ZFPlTQq2oVQBG/PhYs9VhBWbnQ4yOc6'
        }
    });
  });
  
  it('/user/:id delete a user', () => {
    request
      .delete('/user/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully deleted user 1!',
    });
  });

});
