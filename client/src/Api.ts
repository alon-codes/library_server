import axios from 'axios';
import { SERVER_URL } from './Config';

export function getBooks(){
    return axios.get(SERVER_URL + "/books")
}

export function updateBook(book){
    return axios.patch(SERVER_URL + `/books/${book.id}/`, { ...book, id: undefined })
}

export function deleteBook(id: string){
    return axios.delete(SERVER_URL + `/books/${id}/`);
}

export function addToWatingList(user_id: string, book_id: string){
    return axios.post(SERVER_URL + `/waiting-list`, { user_id, book_id });
}