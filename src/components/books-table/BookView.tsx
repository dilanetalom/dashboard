import React from 'react'
import {  Book } from '../books-table/bookService';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    book?: Book|null; // L'auteur dont on veut afficher les détails
}
const BooksView: React.FC<ModalProps> = ({ isOpen, onClose, book  }) => {


    
    if (!isOpen || !book) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] overflow-y-auto py-10">


<div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 overflow-auto">
                <h2 className="text-xl font-bold mb-4">{book.title}</h2>
                <img
                  src={`http://127.0.0.1:8000/images/books/${book.image}`}
                    alt={book.title}
                    className="w-full h-40 object-cover rounded mb-4"
                />
                <p className="mb-2"><strong>Description:</strong> {book.description}</p>
                <p className="mb-2"><strong>Categorie:</strong> {book.category}</p>
                <p className="mb-4"><strong>Langue:</strong> {book.language}</p>
                <p className="mb-4"><strong>Status:</strong> {book.status}</p>
                <p className="mb-4"><strong>Niveau:</strong> {book.niveau}</p>
                <p className="mb-4"><strong>Date d enregistrement:</strong> {book.pub_date}</p>
                <p className="mb-4"><strong>Prix numérique:</strong> {book.price_n}</p>
                <p className="mb-4"><strong>Prix physique:</strong> {book.price_p}</p>
                <button 
                    onClick={onClose} 
                    className="px-4 py-2 graybackcolor text-white rounded hover:bg-blue-600 transition"
                >
                    Fermer
                </button>
            </div>


          
        </div>
    )
}

export default BooksView