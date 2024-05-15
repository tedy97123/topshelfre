# Python (FastAPI)
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.testclient import TestClient

app = FastAPI()

class Book(BaseModel):
	id: int
	title: str
	author: str
	published_date: str
	price: float

books = []

@app.get("/books")
def get_books():
	pass

@app.get("/books/{book_id}")
def get_book(book_id: int):
	pass

@app.post("/books")
def create_book(book: Book):
	pass

@app.put("/books/{book_id}")
def update_book(book_id: int, book: Book):
	pass

@app.delete("/books/{book_id}")
def delete_book(book_id: int):
	pass

client = TestClient(app)

def test_create_book():
	response = client.post("/books", json={"id": 1, "title": "Book 1", "author": "Author 1", "published_date": "2022-01-01", "price": 9.99})
	assert response.status_code == 201

def test_get_book():
	response = client.get("/books/1")
	assert response.status_code == 200

def test_update_book():
	response = client.put("/books/1", json={"title": "Updated Book 1", "author": "Updated Author 1", "published_date": "2022-01-02", "price": 19.99})
	assert response.status_code == 200

def test_delete_book():
	response = client.delete("/books/1")
	assert response.status_code == 200

def test_get_books():
	response = client.get("/books")
	assert response.status_code == 200





