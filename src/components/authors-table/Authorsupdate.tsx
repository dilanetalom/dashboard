import React, { ChangeEvent, useEffect, useState } from 'react';
import { createAuthor } from './authorservice';


interface Author {
    id?: number; // Optionnel pour un nouvel auteur
    name: string;
    gender: string;
    country: string;
    imageauthor: File | null;
    description: string;
    date_nais: string;
    email: string;
}
interface AuthorFormModalProps {
    isOpent: boolean;
    onCloser: () => void;
    authors:Author | null;
}

const Authorsupdate: React.FC<AuthorFormModalProps> = ({ isOpent, onCloser, authors }) => {
    const [name, setName] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [imageauthor, setImageAuthor] = useState<File | null>(null);
    const [description, setDescription] = useState<string>('');
    const [date_nais, setDate_nais] = useState<string>('');
    const [email, setEmail] = useState<string>('');



    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImageAuthor(file);
    
            // Vérifie que le fichier est valide
            if (file instanceof File) {
                const previewUrl = URL.createObjectURL(file);
                setImagePreview(previewUrl);
            } else {
                console.error("L'argument passé à createObjectURL n'est pas un File.");
            }
        } else {
            console.error("Aucun fichier sélectionné.");
        }
    };


    useEffect(() => {
        if (authors) {
            setName(authors.name);
            setGender(authors.gender);
            setCountry(authors.country);
            setImageAuthor(authors.imageauthor);
            setDescription(authors.description);
            setDate_nais(authors.date_nais);
            setEmail(authors.email);
            // Gérer l'aperçu de l'image si nécessaire
            if (authors.imageauthor) {
                const previewUrl = URL.createObjectURL(authors.imageauthor);
                setImagePreview(previewUrl);
            }
        }
   
    }, [authors])

    
    const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('gender', gender);
        formData.append('country', country);
        if (imageauthor) formData.append('imageauthor', imageauthor);
        formData.append('description', description);
        formData.append('date_nais', date_nais);
        formData.append('email', email);
       
        const author = await createAuthor(formData)
        console.log(author);
       
        onCloser(); // Fermer le modal après soumission
    };

    if (!isOpent) return null; // Ne rien rendre si le modal n'est pas ouvert

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] overflow-y-auto py-10">
            <div className="bg-white w-96 p-6 rounded-lg shadow-md  mt-36">
                <h2 className="text-lg font-bold mb-4">Ajouter un auteur</h2>
                <form onSubmit={handleSubmit}>

                  {/* Champ pour télécharger l'image */}
                  <div className="mb-4 flex justify-center">
                        <label className="block text-sm font-medium mb-1 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer" htmlFor="imageauthor">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                            ) : (
                                "Photo"
                            )}
                        </label>
                        <input
                            type="file"
                            id="imageauthor"
                            name="imageauthor"
                            onChange={handleImageChange}  
                            accept="image/*"
                            className="border border-gray-300 rounded w-full p-2 hidden"
                        />
                    </div>



                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Masculin</option>
                            <option value="female">Feminin</option>
                      
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                        <select
                            id="country"
                            name="country"
                            value={country}
                            onChange={(e)=>setCountry(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            <option value="">Select Country</option>
                            <option value="usa">Cameroun</option>
                            <option value="canada">Canada</option>
                            <option value="france">France</option>
                        </select>
                    </div>

                   

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            rows={3}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="date_nais">Date of Birth</label>
                        <input
                            type="date"
                            id="date_nais"
                            name="date_nais"
                            value={date_nais}
                            onChange={(e)=>setDate_nais(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button type="button" className="bg-red-500 text-white py-2 px-4 rounded mr-2" onClick={onCloser}>Cancel</button>
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Authorsupdate;