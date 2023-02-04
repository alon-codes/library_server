import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import dotenv from 'dotenv';
import { Book } from "./entity/book";

dotenv.load();

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.DB_URL,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities: [User, Book]
});