import React from 'react';

import styles from './BookTable.module.css';
import { GetBookResponse } from '../../api/responses/ApiResponses';
import { PutBookRequest } from '../../api/requests/ApiRequests';

export interface BookTableProps {
  booksProp?: GetBookResponse[];
  handleDeleteBook: (id: number) => void;
  handleEditBook: (id: number, book: PutBookRequest) => void;
}


export function BookTable(props?: BookTableProps) {

  const handleDeleteBook = (id: number) => {
    props?.handleDeleteBook(id);
  };

  const handleEditBook = (id: number, book: PutBookRequest) => {
    props?.handleEditBook(id, book);
  };
  
  return (
    <><h2>Books Table</h2><table className={styles.bookTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Total Copies</th>
          <th>Copies In Use</th>
          <th>Type</th>
          <th>ISBN</th>
          <th>Category</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props &&
          props.booksProp?.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{`${book.firstName} ${book.lastName}`}</td>
              <td>{book.totalCopies}</td>
              <td>{book.copiesInUse}</td>
              <td>{book.type}</td>
              <td>{book.isbn}</td>
              <td>{book.category}</td>
              <td><input type="button" value={"e"} onClick={() => handleEditBook(book.id, book)}></input></td>
              <td><input type="button" value={"x"} onClick={() => handleDeleteBook(book.id)}></input></td>
            </tr>
          ))}
      </tbody>
    </table></>
  );
}
