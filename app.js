const express = require('express');
const app = express();
app.use(express.json());

let books = [];

// Get All Books
app.get('/books', (req, res) => {
    try {
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, Try again" });
    }
});

// Get book by Id
app.get('/books/:id', (req, res) => {
    try {
        const book = books.find(b => b.id == req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found, Try again' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new book
app.post('/books', (req, res) => {
    try {
        const newBook = req.body;
        if (newBook) {
            books.push(newBook);
            res.status(201).json(newBook);
        } else {
            return res.status(400).json({ message: 'Cannot create new book' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update Book by Id
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updateData = req.body;
    try {
        // Validation
        if (!bookId) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        // Validation
        if (!updateData) {
            return res.status(400).json({ message: 'Invalid update data' });
        }
        const index = books.findIndex(b => b.id == bookId);
        if (index !== -1) {
            // Create new object by merging properties of books[index] and updateData, overwrites existing values
            books[index] = { ...books[index], ...updateData };
            res.status(200).json(books[index]);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a book by Id
app.delete('/books/:id', (req, res) => {
    try {
        const bookId = req.params.id;
        // Validation
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

module.exports = app;
