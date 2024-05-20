const request = require('supertest');
const app = require('./app');

describe('Test the book store API', () => {
    test('POST /books should add a new book', async () => {
        const response = await request(app)
            .post('/books')
            .send({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 });
    });

    test('GET /books/1 should return the book with ID 1', async () => {
        const response = await request(app).get('/books/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99 });
    });

    test('PUT /books/1 should update the book with ID 1', async () => {
        const response = await request(app)
            .put('/books/1')
            .send({ title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99 });
    });

    test('DELETE /books/1 should delete the book with ID 1', async () => {
        const response = await request(app).delete('/books/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Book deleted' });
    });

    test('GET /books should return an empty array', async () => {
        const response = await request(app).get('/books');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});
