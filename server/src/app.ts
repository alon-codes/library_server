import express, { Request, Response } from 'express';
import { Book } from './entity/book';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { validate } from 'class-validator';

// Load environment variables
require('dotenv').load();

// Init Express app
const app = express();

app.use(express.json());
app.use(cors());

const BooksRepository = AppDataSource.getRepository(Book);

app.get("/books", async function (req: Request, res: Response) {
    try {
        const booksList = await BooksRepository.find();
        return res.send(booksList);
    }
    catch(e){
        return res.status(400).send({});
    }
});

app.post("/books", async function (req: Request, res: Response) {
    try {
        const validatingBook: Book = Object.assign(req.body, { id: undefined });
        const errors = await validate(validatingBook);

        if(!req.body || errors.length > 0){
            console.warn("Validation failed", errors);
            throw new Error('Validation error');
        }

        //console.log({ validatingBook, errors, body: req.body });

        const createdBook = await BooksRepository.save(validatingBook);

        //console.log({ createdBook });
        
        return res.send(createdBook);
    }
    catch(e){
        return res.status(400).send({});
    }
});

app.delete("/books/:id", async function (req: Request, res: Response) {
    try {
        if(!req.params.id){
            throw new Error('Id is missing');
        }

        BooksRepository.delete(req.params.id);
        return res.send();
    }
    catch(e){
        return res.status(400).send({});
    }
});

export default app;