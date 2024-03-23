import React, { useEffect, useMemo, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GetBookResponse } from '../../api/responses/ApiResponses';
import { AddBookRequest, GetBooksRequest, PutBookRequest } from '../../api/requests/ApiRequests';
import { BookTable } from '../BookTable';
import { BookFilter } from '../BookFilter';
import { deleteBook, getBooks, postBook, putBook } from '../../api/services/BookService';
import { AddBookModal } from '../AddBookModal';

export function BooksFetchComponent() {
  const [filterBy, setFilterBy] = useState<keyof GetBooksRequest>();
  const [filterByValue, setFilterByValue] = useState('');
  const [books, setBooks] = useState<GetBookResponse[]>();
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState({ visible: false, mode: '', book: {} });

  const request: GetBooksRequest = useMemo<GetBooksRequest>(() => {
    let result: GetBooksRequest = {};
    if (filterBy && filterByValue)
      result = { [filterBy]: filterByValue } as GetBooksRequest;

    result = { ...result, available: available };
    return result;
  }, [filterBy, filterByValue, available]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getBooks(request);
        setBooks(books);
        setLoading(false);
      }
      catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchBooks();
    return () => { };
  }, [request])


  const handleFilterChange = (event: any) => {
    const value = event.target.value;
    setFilterBy(value);
  }

  const handleFilterTextChange = (event: any) => {
    const value = event.target.value;
    setFilterByValue(value);
  }

  const handleAvailableFilterChange = () => {
    setAvailable(!available);
  }

  const handleDeleteBook = async (id: number) => {
    await deleteBook(id);
    const updatedBooks = books?.filter(book => book.id !== id);
    setBooks(updatedBooks);
  }

  const handleEditBook = async (id?: number, bookSelected?: PutBookRequest) => {
    handleOpenModal('edit', { ...bookSelected });
  }

  const handleEditBookSave = async (id: number, bookSelected: PutBookRequest) => {
    await putBook(id, bookSelected)
    const books = await getBooks(request);
    setBooks(books);
  }

  const handleOpenModal = (mode: string, book: PutBookRequest) => {
    setIsModalOpen({ visible: true, mode, book });
  };

  const handleCloseModal = () => {
    setIsModalOpen({ visible: false, mode: '', book: {} });
  };

  const handleAddBook = async (book: AddBookRequest) => {
    const newBook = await postBook(book);
    const updatedBooks = books?.concat(newBook);
    setBooks(updatedBooks);

    handleCloseModal();
  };

  if (loading)
    return <div>Loading...</div>

  return (
    <div>
      {!isModalOpen.visible && (
        <div>
          <BookFilter
            handleAvailableFilterChange={handleAvailableFilterChange}
            handleFilterChange={handleFilterChange}
            handleFilterTextChange={handleFilterTextChange}
            checked={available}
            selectedFilter={filterBy} />
          <button onClick={() => handleOpenModal('add', {})}>Add New Book</button>
          <BookTable booksProp={books} handleDeleteBook={handleDeleteBook} handleEditBook={handleEditBook} />
        </div>
      )}
      <div>
        {isModalOpen.visible && (
          <AddBookModal modalMode={isModalOpen.mode} onClose={handleCloseModal} onAddBook={handleAddBook} onEditBook={handleEditBookSave} book={isModalOpen.book} />
        )}
      </div>
    </div >
  )
}
