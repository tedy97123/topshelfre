Book Store API

Hoping this reaches you, I added functionality to this file along with added 2 files separating the app portion from the testing suite.
Description

This project is a simple Book Store API built with Node.js and Express. It allows you to perform CRUD operations on a collection of books. Each route is wrapped in a try-catch block to handle errors gracefully.
Endpoints
HTTP.METHOD = GET

Function: Retrieve all books
/Books section and relevant tests:

    Retrieves all records. If successful, returns 200 and the records. If an error occurs, returns 500.
    Test: Ensures that GET /books returns a 200 status and an array of books. If the array is empty, it returns an empty array.

HTTP.METHOD = GET

Function: Retrieve book by ID
/Books/:id section and relevant tests:

    Retrieves a book by ID. If the book is found, returns 200 and the book. If not found, returns 404. If an error occurs, returns 500.
    Test: Ensures that GET /books/:id returns a 200 status and the book with the matching ID if found. If the book is not found, returns a 404 status with 'Book not found' message.

HTTP.METHOD = POST

Function: Add a new book
/Books section and relevant tests:

    Adds a new book. If successful, returns 201 and the new book. If req.body is missing or invalid, returns 400.
    Test: Ensures that POST /books adds a new book to the collection, returns a 201 status, and the newly added book. If req.body is missing or invalid, returns a 400 status.

HTTP.METHOD = PUT

Function: Update book by ID
/Books/:id section and relevant tests:

    Updates a book by ID. If successful, returns 200 and the updated book. If the book ID is not found, returns 404. If an error occurs, returns 500.
    Test: Ensures that PUT /books/:id updates the book with the given ID and returns the updated book. If the book ID does not exist, it returns a 404 status. Validates that the update data is correctly applied to the book.

HTTP.METHOD = DELETE

Function: Delete book by ID
/Books/:id section and relevant tests:

    Deletes a book by ID. If successful, returns 200 and a 'Book deleted' message. If the book ID is not found, returns 404. If an error occurs, returns 500.
    Test: Ensures that DELETE /books/:id deletes the book with the given ID, returns a 200 status, and a message 'Book deleted'. If the book ID does not exist, it returns a 404 status.

Setup Instructions
Prerequisites

    Node.js and npm installed
    Git installed

Install dependencies:

    npm install

Running the Application

Start the server:

      node app.js

The server will be running on http://localhost:3000.

Run the tests:

    npm test

Running in VSCode

    Open the project folder in VSCode.
    Make sure you have the necessary extensions installed 
    Use the integrated terminal to run the above commands for starting the server and running tests.

Containerization:

    Create a Dockerfile:

     Dockerfile

     WORKDIR /app

     COPY package*.json ./
     RUN npm install

     COPY . .

     EXPOSE 3000
     CMD ["node", "app.js"]

Build the Docker image:

    docker build -t book-store-api .

Run the Docker container:

    docker run -p 3000:3000 book-store-api

   The server will be running on http://localhost:3000.
