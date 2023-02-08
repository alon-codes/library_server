import { AppDataSource } from './data-source';
import { Book } from './entity/book';
import sampleData from './sample/books.json';

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const BooksRepository = AppDataSource.getRepository(Book);

export async function importSamleData() {
    try {
        await AppDataSource.initialize();
        await BooksRepository.insert(sampleData);
    }
    catch(e){
        console.error({ e });
    }
}

importSamleData().then(() => {
    console.log('Loading completed')
}).catch(() => {
    console.error('Error loading sample data');
});