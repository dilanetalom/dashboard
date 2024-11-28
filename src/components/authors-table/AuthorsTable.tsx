import React, { useEffect, useState } from 'react';
import './authors-table.css';
import { FaDeleteLeft } from 'react-icons/fa6';
import { FaEdit, FaEye } from 'react-icons/fa';
import AuthorFormModal from './AutoreFormmodal';
import { getAllAuthors, getAuthorById } from './authorservice';
import AuthorsView from './AuthorsView';


interface Author {
  id: number;
  name: string;
  gender: string;
  country: string;
  imageauthor: File | null; // ou string si vous voulez stocker l'URL de l'image
  description: string;
  date_nais: string; // Format de date, par exemple "YYYY-MM-DD"
  email: string;
}


const AuthorsTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpens, setIsModalOpens] = useState(false);
  const [allAuthors, setAllAuthors] = useState<Author[]>([]);


  const getauthors = async () => {
    const datas = await getAllAuthors()
    setAllAuthors(datas)
  }

  useEffect(() => {
    getauthors()
  }, [allAuthors])


  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const getbyauthors = async (ids:number) => {
    const num = ids;
    const str = num.toString();
    try {
      const response = await getAuthorById(str)
      setSelectedAuthor(response.data);
      setIsModalOpens(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'auteur:', error);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAuthor(null);
  };

  return (
    <div>


      <div className="authors-table-container">
        {/* Search and Filter Section */}
        <div className="authors-search-filter">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Recherche un auteur"
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>
          <div className='flex gap-3'>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md" onClick={() => setIsModalOpen(true)}>Ajouter un Auteur</button>
            <AuthorFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <button className="filter-button">Filter</button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="authors-table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Nationalité</th>
                <th>Genre</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allAuthors.map((author) => (
                <tr key={author.id}>
                  <td>{author.id}</td>
                  <td>
                    <div className="author-name">
                      <img
                        src={`http://127.0.0.1:8000/images/authors/${author.imageauthor}`}
                        alt="Author Avatar"
                        className="author-avatar"
                      />
                      <span>{author.name}</span>
                    </div>
                  </td>
                  <td>{author.email}</td>
                  <td>{author.country}</td>
                  <td>{author.gender}</td>
                  <td className='flex gap-3'>
                    <button className="text-white py-2 px-3 rounded-md bg-green-500"><FaDeleteLeft /></button>
                    <button className="text-white py-2 px-3 rounded-md bg-blue-500"><FaEdit /></button>
                    <button className="text-white py-2 px-3 rounded-md bg-black" onClick={() => getbyauthors(author.id)} ><FaEye /></button>
                    <AuthorsView author={selectedAuthor} isOpen={isModalOpens} onClose={closeModal} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          {/* <button
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
          </button> */}
        </div>

        {/* Add Author Button */}

      </div>
    </div>
  );
};

export default AuthorsTable;
