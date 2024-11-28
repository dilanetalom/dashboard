import React, { useState } from 'react';
import './books-table.css';
import { FaEdit, FaEye } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import BookFormModal from './BookFormModal';

const BooksTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const books = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: 'Mesopotamia',
    description: 'Presentateur...',
    author: 'Gael Faye',
    language: 'Français',
    publicationDate: '12/90/1997',
    priceN: '19$',
    priceP: '25$',
    status: 'Nouveau',
    imageUrl: 'https://via.placeholder.com/40',
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = books.slice(startIndex, startIndex + itemsPerPage);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="books-table-container">
      {/* Search and Filter Section */}
      <div className="books-search-filter">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Recherche un livre"
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>
       <div className='flex gap-3'>
         {/* Add Book Button */}
      <button className="px-4 py-2 bg-blue-500 rounded-md text-white"
      onClick={() => setIsModalOpen(true)}
      >Ajouter un livre</button>
      <BookFormModal
      isOpen={isModalOpen}
       onClose={() => setIsModalOpen(false)}
      />
        <button className="filter-button">Filter</button>
       </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="books-table">
          <thead>
            <tr>
              <th>Nom</th>
              {/* <th>Description</th> */}
              <th>Auteur</th>
              <th>Langue</th>
              <th>Date publication</th>
              <th>Prix N</th>
              <th>Prix P</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.id}>
                <td>
                  <div className="book-name">
                    <img
                      src={book.imageUrl}
                      alt={book.name}
                      className="book-image"
                    />
                    <span>{book.name}</span>
                  </div>
                </td>
                {/* <td>{book.description}</td> */}
                <td>{book.author}</td>
                <td>{book.language}</td>
                <td>{book.publicationDate}</td>
                <td>{book.priceN}</td>
                <td>{book.priceP}</td>
                <td>
                  <span className="status-badge">{book.status}</span>
                </td>
                <td className='flex gap-2'>
                <button className="text-white py-2 px-3 rounded-md bg-green-500"><FaDeleteLeft/></button>
                <button className="text-white py-2 px-3 rounded-md bg-blue-500"><FaEdit/></button>
                <button className="text-white py-2 px-3 rounded-md bg-black"><FaEye/></button>
                              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      
    </div>
  );
};

export default BooksTable;
