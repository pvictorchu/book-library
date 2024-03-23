// apiService.ts
import axios from 'axios';
import { GetBookResponse} from '../responses/ApiResponses';
import { AddBookRequest, GetBooksRequest, PutBookRequest } from '../requests/ApiRequests';

const BASE_URL = 'https://localhost:8080/api/';

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getBooks = async (request?: GetBooksRequest) => {
    try {
        const response = await apiService.get<GetBookResponse[]>('/books', { params: request });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const postBook = async (book: AddBookRequest) => {
    try {
        const response = await apiService.post<GetBookResponse>('/books', { ...book });
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};

export const getBook = async (id: number) => {
    try {
        const response = await apiService.get<GetBookResponse>(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const putBook = async (id: number, book: PutBookRequest) => {
    try {
        const response = await apiService.put(`/books/${id}`, { ...book });
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};

export const deleteBook = async (id: number) => {
    try {
        const response = await apiService.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};
