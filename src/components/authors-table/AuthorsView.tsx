import React, { useEffect, useState } from 'react'
import { getAuthorById } from './authorservice';

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

interface AuthorFormModalProps {
        author: Author | null;
        isOpen: boolean;
        onClose: () => void;
}
const AuthorsView: React.FC<AuthorFormModalProps> = ({ isOpen, onClose, author }) => {

    const [allAuthor, setAllAuthor] = useState<Author[]>([]);
   

    
    if (!isOpen || !author) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] overflow-y-auto py-10">
            <div className="bg-white w-96 p-6 rounded-lg shadow-md  mt-36">
                <h2 className="text-lg font-bold mb-4">Ajouter un auteur</h2>
                <form >

                    {/* Champ pour télécharger l'image */}
                    <div className="mb-4 flex justify-center">
                        <label className="block text-sm font-medium mb-1 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer" htmlFor="imageauthor">

                            <img src="" alt="Preview" className="w-20 h-20 rounded-full object-cover" />

                        </label>

                    </div>



                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                        <p>{allAuthor.name}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender</label>
                        <p>{allAuthor.gender}</p>

                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                        <p>{allAuthor.country}</p>

                    </div>



                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
                        <p>{allAuthor.description}</p>
                    
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="date_nais">Date of Birth</label>
                        <p>{allAuthor.date_nais}</p>


                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <p>{allAuthor.email}</p>

                    </div>

                    <div className="flex justify-end">
                        <button type="button" className="bg-red-500 text-white py-2 px-4 rounded mr-2" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthorsView