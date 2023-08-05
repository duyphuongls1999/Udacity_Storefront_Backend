import supertest from 'supertest';
import app from '../../index';
import { Authentication } from '../../utils/Authentication';

const request = supertest(app);
const token: string = Authentication.generateToken(1, 'bearer');

describe('Product controllers: ', () => {
  it('/product should return a new product ', () => {
    const data = {
        name: 'Nike Club',
            price: 85,
            category: 'Men Shorts',
            description: 'Pull on these comfy woven shorts and find your flow. They are made with cotton canvas for durable comfort, finished with a heavy wash to add soft texture and a bit of nostalgia to your look. A soft elastic waistband with an external drawcord helps you find the right fit so you can stay comfortable from sun up til sun down.',
      };
    request
      .post('/product')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully created products!',
        result: {
            id: 2,
            name: 'Nike Club',
            price: 85,
            category: 'Men Shorts',
            description: 'Pull on these comfy woven shorts and find your flow. They are made with cotton canvas for durable comfort, finished with a heavy wash to add soft texture and a bit of nostalgia to your look. A soft elastic waistband with an external drawcord helps you find the right fit so you can stay comfortable from sun up til sun down.',
        },
    });
  });

  it('/product should show all products', () => {
    request
      .get('/product')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully getted products!',
        result: [{
                id: 1,
                name: 'Nike Primary',
                price: 99,
                category: 'Men Shorts',
                description: 'Run, spin, lift, stretch—no matter where your workout takes you, we have you covered in the sweat-wicking Primary Top. We designed it to be soft and comfortable, with underarm ventilation to help keep you cool during your reps',
            },
            {
                id: 2,
                name: 'Nike Club',
                price: 85,
                category: 'Men Shorts',
                description: 'Pull on these comfy woven shorts and find your flow. They are made with cotton canvas for durable comfort, finished with a heavy wash to add soft texture and a bit of nostalgia to your look. A soft elastic waistband with an external drawcord helps you find the right fit so you can stay comfortable from sun up til sun down.',
            }
        ],
      });
  });

  it('/product/:id show a product', () => {
    request
      .get('/product/2')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully getted product!',
        result: {
            id: 2,
            name: 'Nike Club',
            price: 85,
            category: 'Men Shorts',
            description: 'Pull on these comfy woven shorts and find your flow. They are made with cotton canvas for durable comfort, finished with a heavy wash to add soft texture and a bit of nostalgia to your look. A soft elastic waistband with an external drawcord helps you find the right fit so you can stay comfortable from sun up til sun down.',
        },
    });
  });

  it('/products should update an product', () => {
    const data = {
        name: 'Nike Club',
        price: 90,
        category: 'Men Shorts',
        description: 'Pull on these comfy woven shorts and find your flow. They are made with cotton canvas for durable comfort, finished with a heavy wash to add soft texture and a bit of nostalgia to your look. A soft elastic waistband with an external drawcord helps you find the right fit so you can stay comfortable from sun up til sun down.',
    };
    request
      .put('/product/2')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully updated products!',
        result: {
            id: 2,
            name: 'Nike Club',
            price: 90,
            category: 'Men Shorts',
            description: 'Pull on these comfy woven shorts and find your flow. They are made with cotton canvas for durable comfort, finished with a heavy wash to add soft texture and a bit of nostalgia to your look. A soft elastic waistband with an external drawcord helps you find the right fit so you can stay comfortable from sun up til sun down.',
        },
    });
  });
  
  it('/product/:id show a product', () => {
    request
      .delete('/product/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        message: 'Successfully deleted product 1!',
    });
  });

});
