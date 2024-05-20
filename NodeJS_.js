// NodeJS (Express)

const express = require('express');
const app = express();
app.use(express.json());
const request = require('supertest');

let books = [];

//Get All Books
app.get('/books', (req, res) => {
	try{
		res.status(200).json(books)
	}catch(error){
		res.status(500).json({message:"Internal Server Error, Try again"})
	}
});

//Get book by Id
app.get('/books/:id', (req, res) => {
	try {
		const book = books.find(b => b.id == req.params.id)
		if(book){
			res.status(200).json(book)
		} else {
			res.status(404).json({message:'Book not Found, Try again'})
		}
	} catch (error) {
		res.status(500).json({message: 'Internal Server Error'})
	}
});

//Add a new book
app.post('/books', (req, res) => {
	try {
		const newBook = req.body;
		if(newBook){
			books.push(newBook);
			res.status(201).json(newBook)
		} else{
		 return res.status(400).json({ message: 'Can not create new book' });
		}
	} catch (error) {
		res.status(500).json({message:'Internal Server Error'})
	}
});

//Update Book by Id
app.put('/books/:id', (req, res) => {
	const bookId = req.params.id;
	const updateData = req.body;
	try{
		//validation
		if(!bookId){
			return res.status(400).json({message:'Invalid book ID'})
		}
		//validation
		if(!updateData){
			return res.status(400).json({message:'Invalid update data'})
		}
		const index = books.find(b => b.id == bookId)
		  if (index !== -1) {
			//ccreate new object by merging properties of book[index] and updateData, overwrites existing values
            books[index] = { ...books[index], ...updateData };
            res.status(200).json(books[index]);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
	}catch(error){
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

app.delete('/books/:id', (req, res) => {
    try {
        const bookId = req.params.id;
		  //validation
        if (!bookId) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        const index = books.findIndex(b => b.id == bookId);
        if (index !== -1) {
            books.splice(index, 1);
            res.status(200).json({ message: 'Book deleted' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.listen(3000, () => console.log('Server running on port 3000'));

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


module.exports = app;