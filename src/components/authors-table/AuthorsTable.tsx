import React, { useEffect, useState } from 'react';
import './authors-table.css';
import { FaDeleteLeft } from 'react-icons/fa6';
import { FaEdit, FaEye, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { deleteAuthor, getAllAuthors, getAuthorById } from './authorservice';
import AuthorsView from './AuthorsView';
import LoadingModal from '../LoadingModal';
import AuthorFormModal from './AuthorFormModal';
import Authorsupdate from './Authorsupdate';
import ConfirmationModal from '../books-table/ConfirmModal';
// import { Book, deleteBook } from '../books-table/bookService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Author } from '../books-table/bookService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



// interface Author {
//   id: number;
//   name: string;
//   gender: string;
//   country: string;
//   imageauthor: File | null; // ou string si vous voulez stocker l'URL de l'image
//   description: string;
//   date_nais: string; // Format de date, par exemple "YYYY-MM-DD"
//   email: string;
// }


const AuthorsTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allAuthors, setAllAuthors] = useState<Author[]>([]);


  const [loading, setLoading] = useState<boolean>(true);


  const getauthors = async () => {
    try {
      const datas = await getAllAuthors()
      setAllAuthors(datas)
      setLoading(true);
    } catch (error) {

    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getauthors()
  }, [])


  // const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  // const [selectedAuthors, setSelectedAuthors] = useState<Author | null>(null);
  const [selectedAuthort, setSelectedAuthort] = useState<Author | null>(null);
  // const [isModalOpens, setIsModalOpens] = useState(false);
  const [isModalOpent, setIsModalOpent] = useState(false);





  // modifier l auteur

  const upbyauthors = async (ids: number) => {
    const num = ids;
    const str = num.toString();

    try {

      const response = await getAuthorById(str)
      setSelectedAuthort(response);
      setLoading(false);
      setIsModalOpent(true);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }



  const closeModals = () => {
    setIsModalOpent(false);
    setSelectedAuthort(null);
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Filtrer les auteurs en fonction du terme de recherche
  const filteredAuthors = allAuthors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculer l'index des éléments à afficher
  const indexOfLastAuthor = currentPage * itemsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - itemsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  // Changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Nombre total de pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredAuthors.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }




  const [isModalOpend, setIsModalOpend] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState<Author | null>(null);

  const openModal = async (authorId: number) => {
    const num = authorId;
    const str = num.toString();
    setLoading(true); 
    try {

      const response = await getAuthorById(str)
      setSelectedAuthors(response);
      setSelectedAuthors(response);
      setIsModalOpend(true);
    } catch (error) {

    } finally {
      setLoading(false);
    }

  };



  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedAuthorse, setSelectedAuthorse] = useState<Author | null>(null);

  const openConfirmModal = (autor: Author) => {
    setSelectedAuthorse(autor);
    setIsConfirmModalOpen(true);
  };



  const handleDelete = async () => {
    if (selectedAuthorse) {
      setLoading(true);
      try {
        const num = selectedAuthorse.id;
    const str = num.toString();
        await deleteAuthor(str);
        // Mettre à jour l'état ou recharger les auteurs si nécessaire
        toast.success('Livres supprimé avec succès !');
        
      // Fermer le modal après soumission
        // Recharge la page après un délai pour que l'utilisateur puisse voir le message
        setLoading(false);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
      }catch (error) {
        toast.error('Une erreur s\'est produite lors de la suppression. Veuillez réessayer.');
    }
    }
  };


  
  const downloadExcel = () => {
    // Créer un nouveau classeur
    const worksheet = XLSX.utils.json_to_sheet(allAuthors);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Données');

    // Générer le fichier Excel
    XLSX.writeFile(workbook, `Mes livres.xlsx`);
  };


  const downloadPDF = () => {
    const doc = new jsPDF();

    // Ajouter un titre
    doc.text('Mes Données Filtrées', 14, 16);

    // Créer une table à partir des données
    autoTable(doc, {
        head: [['Nom', 'Description', 'Sexe', 'Pays', 'Email']], // Remplace par tes en-têtes
        body: allAuthors.map(item => [item.name, item.description, item.gender, item.country, item.email]), // Remplace par tes données
    });

    // Sauvegarder le fichier PDF
    doc.save(`Mes livres.pdf`);
};



  return (
    <div>


      <div className="authors-table-container">
      <ToastContainer />
        {/* Search and Filter Section */}
        <div className="authors-search-filter">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Recherche un auteur"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" >🔍</button>
          </div>
          <div className='flex gap-3'>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md" onClick={() => setIsModalOpen(true)}>Ajouter un Auteur</button>
            <AuthorFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className='flex flex-row gap-3'>
            <button className="filter-button" onClick={downloadExcel}>
               <FaFileExcel/>
            </button>
            <button className="filter-button" onClick={downloadPDF}>
               <FaFilePdf/>
            </button>
          </div>
          </div>
        </div>

        {/* Table */}


        <div className="table-container">
          <table className="authors-table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Profil</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Nationalité</th>
                <th>Genre</th>
                <th>Action</th>
              </tr>
            </thead>
            {loading && <LoadingModal />}
            {!loading && allAuthors && (
              <tbody>

                {currentAuthors.map((author) => (
                  <tr key={author.id}>
                    <td>{author.id}</td>
                    
                    <td>
                   <div  className='w-10 h-10'>
                   <img
                          src={`http://127.0.0.1:8000/images/authors/${author.imageauthor}`}
                          alt="Author Avatar"
                          className=" w-full h-full object-cover rounded-full"
                        />
                   </div>
                    </td>
                    <td>
                      <div className=" " >
                      
                        <span>{author.name}</span>
                      </div>
                    </td>
                    <td>{author.email}</td>
                    <td>{author.country}</td>
                    <td>{author.gender}</td>
                    <td className='flex gap-3'>
                      <button className="text-white py-2 px-3 rounded-md bg-green-500"  onClick={() =>  openConfirmModal(author)}><FaDeleteLeft /></button>

                      <button className="text-white py-2 px-3 rounded-md bg-blue-500" onClick={() => upbyauthors(author.id)}><FaEdit /></button>
                      <Authorsupdate authors={selectedAuthort} isOpent={isModalOpent} onCloser={closeModals} />

                      <button className="text-white py-2 px-3 rounded-md bg-black" onClick={() => openModal(author.id)} ><FaEye /></button>

                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            {!loading && !allAuthors && <h1>Aucune donnée disponible.</h1>}
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

        {/* Add Author Button */}

      </div>
      <AuthorsView isOpen={isModalOpend} onClose={() => setIsModalOpend(false)} author={selectedAuthors} />
      <ConfirmationModal
                      isOpen={isConfirmModalOpen}
                      onClose={() => setIsConfirmModalOpen(false)}
                      onConfirm={handleDelete}
                    />
    </div>
  );
};

export default AuthorsTable;
