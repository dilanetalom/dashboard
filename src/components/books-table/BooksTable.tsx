import React, { useEffect, useState } from 'react';
import './books-table.css';
import { FaEdit, FaEye } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import BookFormModal from './BookFormModal';
import { deleteBook, getBookById, getBooks, } from './bookService';
import LoadingModal from '../LoadingModal';
import { getAllAuthors } from '../authors-table/authorservice';
import BooksView from './BookView';
import ConfirmationModal from './ConfirmModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Updatebook from './Updatebook';


export interface Book {
  id: number; // Optionnel pour un nouvel livre
  title: string;
  description: string;
  category: string;
  language: string;
  image: File | null; // Pour gérer les fichiers d'image
  status: string;
  niveau: string;
  pub_date: string;
  price_n: string;
  price_p: string;
  user_id: string;
  author_id: string;
}

const BooksTable: React.FC = () => {



  const [isModalOpen, setIsModalOpen] = useState(false);


  const [books, setBooks] = useState<Book[]>([]);
  const [AllAuthors, setAllAuthors] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getauthors = async () => {
    try {
      const datas = await getAllAuthors()
      setAllAuthors(datas)
    } catch (error) {
      console.log("yes");
    }
  }



  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
      getauthors();
      setLoading(true);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchBooks();
  }, []);


  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Filtrer les auteurs en fonction du terme de recherche
  const filteredAuthors = books.filter(author =>
    author.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculer l'index des éléments à afficher
  const indexOfLastAuthor = currentPage * itemsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - itemsPerPage;
  const currentBooks = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  // Changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Nombre total de pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredAuthors.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [setModalOpend, setIsModalOpend] = useState(false);

  const openModal = async (authorId: number) => {
    const num = authorId;
    const str = num.toString();
    setLoading(true);
    try {

      const response = await getBookById(str)
      setSelectedBook(response);
      setIsModalOpend(true);
    } catch (error) {

    } finally {
      setLoading(false);
    }

  };


  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState<Book | null>(null);

  const openConfirmModal = (book: Book) => {
    setSelectedAuthors(book);
    setIsConfirmModalOpen(true);
  };



  const handleDelete = async () => {
    if (selectedAuthors) {
      setLoading(true);
      try {
        const num = selectedAuthors.id;
    const str = num.toString();
        await deleteBook(str);
        // Mettre à jour l'état ou recharger les auteurs si nécessaire
        toast.success('Livres supprimé avec succès !');
        setTimeout(() => {
           setIsConfirmModalOpen(false)
        }, 2000); 
      // Fermer le modal après soumission
        // Recharge la page après un délai pour que l'utilisateur puisse voir le message
        setTimeout(() => {
            window.location.reload();
        }, 1000);
      }catch (error) {
        toast.error('Une erreur s\'est produite lors de la suppression. Veuillez réessayer.');
    }
    }
  };



  // update book

  const [isModalOpenbook, setIsModalOpenbook] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [upbook, setUpBook] = useState(null);

  const openModals = async  (id: number) => {
    setIsModalOpenbook(true);
    const num = id;
    const str = num.toString();
    const bookData = await getBookById(str); // Charger le livre par ID
    setUpBook(bookData);
};

const closeModals = () => {
    setIsModalOpenbook(false);
    setUpBook(null);
};

  useEffect(() => {
    // Charger les auteurs
    const loadAuthors = async () => {
        const authorsData = await getAllAuthors();
        setAuthors(authorsData);
    };

    // Charger le livre à modifier
   
    loadAuthors();
 
}, []);





  return (
    <div className="books-table-container">
      <ToastContainer />
      {/* Search and Filter Section */}
      <div className="books-search-filter">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Recherche un livre"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            authors={AllAuthors}
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
              <th>livre</th>
              <th>Langue</th>
              <th>Date publication</th>
              <th>Prix N</th>
              <th>Prix P</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {loading && <LoadingModal />}
          {!loading && books && (
            <tbody>

              {currentBooks.map((book) => (
                <tr key={book.id}>
                  <td>
                    <div className="book-name">
                      <img
                        src={`http://127.0.0.1:8000/images/books/${book.image}`}
                        alt={book.title}
                        className="book-image h-10 w-10 rounded-full"
                      />
                      <span>{book.title}</span>
                    </div>
                  </td>
                  {/* <td>{book.description}</td> */}
                  <td>{book.status}</td>
                  <td>{book.language}</td>
                  <td>{book.pub_date}</td>
                  <td>{book.price_n}</td>
                  <td>{book.price_p}</td>
                  <td>
                    <span className="status-badge">{book.status}</span>
                  </td>
                  <td className='flex gap-2'>
                    <button className="text-white py-2 px-3 rounded-md bg-green-500" onClick={() =>  openConfirmModal(book)}><FaDeleteLeft /></button>
                    <button className="text-white py-2 px-3 rounded-md bg-blue-500" onClick={()=>openModals(book.id)}><FaEdit /></button>
                    <button className="text-white py-2 px-3 rounded-md bg-black" onClick={() => book.id !== undefined && openModal(book.id)}><FaEye /></button>
                    <BooksView
                      isOpen={setModalOpend}
                      onClose={() => setIsModalOpend(false)}
                      book={selectedBook}
                    />

                    <ConfirmationModal
                      isOpen={isConfirmModalOpen}
                      onClose={() => setIsConfirmModalOpen(false)}
                      onConfirm={handleDelete}
                    />


                    <Updatebook
                      isOpen={isModalOpenbook}
                      onClose={closeModals}
                      book={upbook}
                      authors={authors}
                    />

                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {/* Pagination */}
        <div className="pagination">
          {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} className={`pagination-button ${currentPage === number ? 'active' : ''}`}>
              {number}
            </button>
          ))}
        </div>
      </div>



    </div>
  );
};

export default BooksTable;
