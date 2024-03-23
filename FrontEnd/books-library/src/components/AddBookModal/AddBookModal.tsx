import React, { useEffect, useState } from 'react';

import './AddBookModal.component.css';
import { AddBookRequest, PutBookRequest } from '../../api/requests/ApiRequests';

export interface AddBookModalProps {
  onClose: () => void;
  onAddBook: (book: AddBookRequest) => void;
  onEditBook: (id: number, book: PutBookRequest) => void;
  modalMode: string;
  book?: PutBookRequest;
}

export function AddBookModal({ onClose, onAddBook, onEditBook, modalMode, book }: AddBookModalProps) {
  const [id, setId] = useState(book?.id);
  const [title, setTitle] = useState(book?.title);
  const [firstName, setFirstName] = useState(book?.firstName);
  const [lastName, setLastName] = useState(book?.lastName);
  const [totalCopies, setTotalCopies] = useState(book?.totalCopies);
  const [copiesInUse, setCopiesInUse] = useState(book?.copiesInUse);
  const [type, setType] = useState(book?.type);
  const [isbn, setIsbn] = useState(book?.isbn);
  const [category, setCategory] = useState(book?.category);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleAddBook = () => {
    const newBook: AddBookRequest = {
      id: 0,
      title,
      firstName,
      lastName,
      totalCopies: (totalCopies ?? 0),
      copiesInUse: (copiesInUse ?? 0),
      type,
      isbn,
      category,
    };
    onAddBook(newBook);
    onClose();
  };

  const handleEditBook = () => {
    const newBook: PutBookRequest = {
      id,
      title,
      firstName,
      lastName,
      totalCopies,
      copiesInUse,
      type,
      isbn,
      category,
    };
    onEditBook(newBook.id ?? 0, newBook);
    onClose();
  };

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <div className={`modal${showModal ? '.show' : ''}`}>
      <div className={'modalContent'}>
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Add New Book</h2>
        <div className={'modalFields'}>
          <div>
            <label>Title:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          </div>
          <div>
            <label>Author First Name:
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></label>
          </div>
          <div>
            <label>Author Last Name:
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></label>
          </div>
          <div>
            <label>Total Copies:
              <input type="text" value={totalCopies} onChange={(e) => setTotalCopies(e.target.value ? Number.parseInt(e.target.value) : 0)} /></label>
          </div>
          <div>
            <label>Copies in Use:
              <input type="text" value={copiesInUse} onChange={(e) => setCopiesInUse(e.target.value ? Number.parseInt(e.target.value) : 0)} /></label>
          </div>
          <div>
            <label>Type:
              <input type="text" value={type} onChange={(e) => setType(e.target.value)} /></label>
          </div>
          <div>
            <label>ISBN:
              <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} /></label>
          </div>
          <div>
            <label>Category:
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} /></label>
          </div>
        </div>
        {
          modalMode === 'add' ?
            <button onClick={handleAddBook}>Add Book</button> :
            <button onClick={handleEditBook}>Edit Book</button>
        }
      </div>
    </div>
  );;
}
