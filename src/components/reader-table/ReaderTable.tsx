// import React from 'react'

import { useEffect, useState } from "react";
import ReaderModal from "./ReaderModal";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import LoadingModal from "../LoadingModal";
import axios from "axios";
import Readerview from "./Readerview";
import { toast, ToastContainer } from "react-toastify";
import ConfirmationModal from "../books-table/ConfirmModal";
import { API_URL } from "../Url";


export interface Readers {
    id: string;
    name: string;
    email: string;
    phone: string;
}


const ReaderTable = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModals, setShowModals] = useState<boolean>(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleCloses = () => setShowModals(false);

    const [reader, setReader] = useState<Readers[]>([]);

    const [loading, setLoading] = useState<boolean>(true);


    const getToken = () => {
        return localStorage.getItem('authToken'); // Assurez-vous que le token est bien stocké dans localStorage
    };
    const token = getToken();
    const getauthors = async () => {
        try {
            const response = await axios.get(`${API_URL}/readers`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReader(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error adding reader:', error);
        } finally {
            setLoading(false);
        }

    }


    useEffect(() => {
        getauthors()
    }, [])

    const [readers, setReaderes] = useState<Readers>();

    const handleShows = (readere: Readers) => {
        setShowModals(true)
        setReaderes(readere)

    };

    const [readerdel, setReaderdel] = useState<Readers>();
    const [showModalts, setShowModalts] = useState<boolean>(false);


    const handleDeletes = (readere: Readers) => {
        setShowModalts(true)
        setReaderdel(readere)

    };



    const handleDelete = async () => {
        if (readerdel) {
            setLoading(true);
            try {
                const num = readerdel.id;
                const str = num.toString();
                await axios.delete(`${API_URL}/readers/${str}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success('lecteur supprimé avec succès !');
                setTimeout(() => {
                    setLoading(false)
                }, 2000);
                // Fermer le modal après soumission
                // Recharge la page après un délai pour que l'utilisateur puisse voir le message
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                toast.error('Une erreur s\'est produite lors de la suppression. Veuillez réessayer.');
            }
        }
    };


    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;
  
    // Filtrer les auteurs en fonction du terme de recherche
    const filteredAuthors = reader.filter(author =>
      author.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
      // Calculer l'index des éléments à afficher
  const indexOfLastAuthor = currentPage * itemsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - itemsPerPage;
  const currentBooks = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  // Changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Nombre total de pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reader.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


    return (
        <div className="books-table-container">

            <ReaderModal showModal={showModal} handleClose={handleClose} />
            <Readerview showModal={showModals} handleClose={handleCloses} reader={readers} />
            <ConfirmationModal
                isOpen={showModalts}
                onClose={() => setShowModalts(false)}
                onConfirm={handleDelete}
            />
            <ToastContainer />

            <div className="books-search-filter">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Recherche d'un lecteur"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* <button className="search-button">🔍</button> */}
                </div>
                <div className='flex gap-3'>
                    <button className="px-4 py-2 graybackcolor rounded-md text-white" onClick={handleShow}>Ajouter un lecteur</button>

                    {/* <button className="filter-button">Filter</button> */}
                </div>
            </div>


            <div className="table-container">
                <table className="books-table">
                    <thead className="">
                        <tr className="">
                            <th>Email</th>
                            <th></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {loading && <LoadingModal />}
                    {!loading && reader && (
                        <tbody>
                            {currentBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.email}</td>
                                    <td></td>


                                    <td className='flex gap-2'>
                                        <button className="text-white py-2 px-3 rounded-md bg-green-500" onClick={() => handleDeletes(book)} ><FaDeleteLeft /></button>
                                        <button className="text-white py-2 px-3 rounded-md bg-blue-500" onClick={() => handleShows(book)}><FaEdit /></button>
                                        {/* <button className="text-white py-2 px-3 rounded-md bg-black"
             
               ><FaEye /></button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>

                <div className="pagination">
          {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} className={`pagination-button ${currentPage === number ? 'active' : ''}`}>
              {number}
            </button>
          ))}
        </div>


            </div>
        </div>

    )
}

export default ReaderTable