import supertest from 'supertest';
import app from '../../index';
import { Authentication } from '../../utils/Authentication';

const request = supertest(app);
const token: string = Authentication.generateToken(1, 'bearer');

describe('Orders controllers: ', () => {
  it('/order should return a new order ', () => {
    const data = {
        user_id: 2,
        product_id: 3,
        quantity: 2,
        status: 'Order'
      };
    request
      .post('/order')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully created order!',
        result: {    
            id: 1,    
            user_id: 2,
            product_id: 3,
            quantity: 2,
            status: 'Order'
        }
      });
  });

  it('/order should show all orders', () => {
    request
      .get('/order')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully get all orders data!',
        result: [{
            id: 1,
            user_id: 2,
            product_id: 2,
            quantity: 1,
            status: 'Order'
        },
        {
            id: 2,
            user_id: 1,
            product_id: 2,
            quantity: 1,
            status: 'Shipping'
        }]
      });
  });

  it('/order/:id show a order', () => {
    request
      .get('/order/3')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully getted order!',
        result: {
            id: 3,
            user_id: 1,
            product_id: 2,
            quantity: 1,
            status: 'Order'
        }
    });
  });

  it('/orders should update an order', () => {
    const data = {
        user_id: 1,
        product_id: 2,
        quantity: 2,
        status: 'Shipping',
      };
    request
      .put('/order/2')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully updated order!',
        result: {
            id: 2,
            user_id: 1,
            product_id: 2,
            quantity: 1,
            status: 'Shipping'
        }
    });
  });
  
  it('/order/:id show a order', () => {
    request
      .delete('/order/3')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully deleted order 3!'
    });
  });

});
