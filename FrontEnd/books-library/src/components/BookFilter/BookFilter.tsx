import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './BookFilter.module.css';
import { GetBooksRequest } from '../../api/requests/ApiRequests';

export interface BookFilterProps {
  handleFilterTextChange: (event: any) => void,
  handleFilterChange: (event: any) => void,
  handleAvailableFilterChange: () => void,
  selectedFilter?: keyof GetBooksRequest,
  checked?: boolean
}

export function BookFilter(prop: BookFilterProps) {
  return (
    <div className={'formContainer'}>
      <div className={'formRow'}>
        <label htmlFor='text-input'> Search
          <input type="text" id="filterText" placeholder='Enter your search here' onChange={prop.handleFilterTextChange}></input>
        </label>
      </div>
      <div className={'formRow'}>
        <label htmlFor="dropdown">Filter:</label>
        <select id="dropdown" value={prop.selectedFilter} onChange={prop.handleFilterChange}>
          <option value="">Select</option>
          <option value="title">Title</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="type">Type</option>
          <option value="isbn">ISBN</option>
          <option value="category">Category</option>
        </select>
        <label htmlFor='checkbox'> Available?
          <input id='checkbox' type='checkbox' onChange={prop.handleAvailableFilterChange} checked={prop.checked} />
        </label>
      </div>
    </div>
  )
}
