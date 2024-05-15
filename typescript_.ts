// TypeScript (NestJS)
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

@Controller('books')
export class BooksController {
	private readonly books: Book[] = [];

	@Get()
	findAll(): Book[] {
    	return this.books;
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
    	return this.books.find(book => book.id === +id);
	}

	@Post()
	create(@Body() createBookDto: CreateBookDto) {
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
	}
}



describe('BookController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
  	imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();
  });

  it('/books (POST)', () => {
	return request(app.getHttpServer())
  	.post('/books')
  	.send({id: 1, title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', price: 9.99})
  	.expect(201);
  });

  it('/books/1 (GET)', () => {
	return request(app.getHttpServer())
  	.get('/books/1')
  	.expect(200);
  });

  it('/books/1 (PUT)', () => {
	return request(app.getHttpServer())
  	.put('/books/1')
  	.send({title: 'Updated Book 1', author: 'Updated Author 1', published_date: '2022-01-02', price: 19.99})
  	.expect(200);
  });

  it('/books/1 (DELETE)', () => {
	return request(app.getHttpServer())
  	.delete('/books/1')
  	.expect(200);
  });

  it('/books (GET)', () => {
	return request(app.getHttpServer())
  	.get('/books')
  	.expect(200);
  });
});




