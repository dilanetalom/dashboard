import React from 'react'


import './Modal.css'; // Assurez-vous d'ajouter le CSS pour le style
import { Author } from '../books-table/bookService';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    author?: Author|null; // L'auteur dont on veut afficher les détails
}
const AuthorsView: React.FC<ModalProps> = ({ isOpen, onClose, author  }) => {


    
    if (!isOpen || !author) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] overflow-y-auto py-10">
            <div className="bg-white w-96  h-[96%] p-6 rounded-lg shadow-md overflow-auto ">
                <h2 className="text-lg font-bold mb-4">Détail de l'auteur</h2>
                <div className="flex flex-col gap-2">
                    <img
                        src={`http://127.0.0.1:8000/images/authors/${author.imageauthor}`}
                        alt={author.name}
                        className="author-avatar"
                    />
                    <p><strong>ID:</strong> {author.id}</p>
                    <p><strong>Nom:</strong> {author.name}</p>
                    <p><strong>Description:</strong> {author.description}</p>
                    <p><strong>Email:</strong> {author.email}</p>
                    <p><strong>Pays:</strong> {author.country}</p>
                    <p><strong>Genre:</strong> {author.gender}</p>

                    <div>
                      <p className='mt-6'><strong>  Tous Ses livres</strong></p>
                        
                           {author.books && author.books.length > 0 ? (
                            author.books.map((item) => (
                                <p key={item.id}><strong>-</strong> {item.title}</p>
                            ))
                        ) : (
                            <p>Aucun livre pour cet auteur</p>
                        )}
                        
                       

                    </div>
                </div>

                    <div className="flex justify-end">
                        <button type="button" className="graybackcolor text-white py-2 px-4 rounded mr-2" onClick={onClose}>Cancel</button>
                    </div>
               
            </div>
        </div>
    )
}

export default AuthorsView