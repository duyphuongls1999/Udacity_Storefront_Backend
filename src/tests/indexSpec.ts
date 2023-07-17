import supertest from 'supertest';
import app from '../index';

describe('Test endpoints', () => {
    const request = supertest(app);
    it('Root endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });

    it('Image endpoint', async () => {
        const response = await request.get(
            '/api/image?imageFileName=spiderman.png&width=500&height=500',
        );
        expect(response.status).toBe(200);
    });
});
