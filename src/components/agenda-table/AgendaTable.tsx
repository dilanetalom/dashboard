import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';


// import Formsave, { NewsData } from './Formsave';

import  { NewsData } from './Agendaservice';
import { getNews } from './Agendaservice';
import LoadingModal from '../LoadingModal';
import Agendasave from './Agendasave';
import AgendaDetailModal from './AgendadetailModal';



const AgendaTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [news, setNews] = useState<NewsData[]>([]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const getauthors = async () => {
        try {
          const datas = await getNews()
          setNews(datas)
          setLoading(true);
        } catch (error) {
    
        } finally {
          setLoading(false);
        }
    
      }
      useEffect(()=>{
        getauthors()
      },[])




      const [currentPage, setCurrentPage] = useState(1);
      const [searchTerm, setSearchTerm] = useState('');
      const itemsPerPage = 5;
    
      // Filtrer les auteurs en fonction du terme de recherche
      const filteredAuthors = news.filter(author =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      

      const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // État pour le modal de détails
      const [selectedNews, setSelectedNews] = useState<NewsData | null>(null);

      const handleOpenDetailModal = (newsItem: NewsData) => {
        setSelectedNews(newsItem);
        setIsDetailModalOpen(true);
    };
    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedNews(null);
    };

    
    
  
  return (
    <div className="books-table-container">
         <Agendasave isOpen={isModalOpen} onClose={handleCloseModal}  />
         <AgendaDetailModal 
                isOpen={isDetailModalOpen} 
                onClose={handleCloseDetailModal} 
                news={selectedNews} 
            />
      
      <div className="books-search-filter">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Recherche une evennement"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">🔍</button>
        </div>
        <div className='flex gap-3'>
          <button className="px-4 py-2 bg-blue-500 rounded-md text-white"  onClick={handleOpenModal}>Ajouter un evennement</button>
        
          <button className="filter-button">Filter</button>
        </div>
      </div>

      <div className="table-container">
        <table className="books-table">
          <thead>
            <tr>
            <th>Image</th>
              <th>Nom</th>
              <th>Type</th>
              <th>Description</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Action</th>
            </tr>
          </thead>
          {loading && <LoadingModal />}
          {!loading && news && (
            <tbody>
              {currentBooks.map((book) => (
                <tr key={book.id}>
                  <td>
                  <div  className='w-10 h-10'>
                   <img
                          src={`http://127.0.0.1:8000/images/event/${book.image}`}
                          alt="Author Avatar"
                          className=" w-full h-full object-cover rounded-full"
                        />
                   </div>
                  </td>
                  <td>{book.name}</td>
                  <td>{book.type}</td>
                  <td>{book.description}</td>
                  <td>{book.eventdate}</td>
                  <td>{book.enddate}</td>
                
                  <td className='flex gap-2'>
                    <button className="text-white py-2 px-3 rounded-md bg-green-500" ><FaDeleteLeft /></button>
                    <button className="text-white py-2 px-3 rounded-md bg-blue-500"><FaEdit /></button>
                    <button onClick={() => handleOpenDetailModal(book)} className="text-white py-2 px-3 rounded-md bg-black"><FaEye /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          )
          
          }
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

export default AgendaTable;