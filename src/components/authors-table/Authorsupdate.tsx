import React, { ChangeEvent, useEffect, useState } from 'react';
import {updateAuthor } from './authorservice';
import { toast } from 'react-toastify';
import { API_URLE } from '../Url';


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
    const [id, setId] = useState<number | null>();
    const [loading, setLoading] = useState(false);




    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    useEffect(() => {
        if (authors) {
            setName(authors.name);
            setGender(authors.gender);
            setCountry(authors.country);
            setImagePreview(`${API_URLE}/images/authors/${authors.imageauthor}`);
            setDescription(authors.description);
            setDate_nais(authors.date_nais);
            setEmail(authors.email);
            setId(authors.id)
 
        }
   
    }, [authors])


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                setImageAuthor(file);
    
                // Créer une URL pour l'aperçu de l'image
                const previewUrl = URL.createObjectURL(file);
                setImagePreview(previewUrl);
            } else {
                console.error('Le fichier sélectionné n\'est pas une image.');
            }
        }
    };



    const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('gender', gender);
        formData.append('country', country);
        if (imageauthor) formData.append('imageauthor', imageauthor);
        formData.append('description', description);
        formData.append('date_nais', date_nais);
        formData.append('email', email);


        try {

            const num = id;

            if (num != null) { // This checks for both null and undefined
                const str = num.toString();
                await updateAuthor(str, formData)
            } else {
                console.log('id is null or undefined');
            }
           
          
            toast.success('Votre auteur est modifié avec succès !');
            setLoading(false)
            setTimeout(() => {
                onCloser(); 
            }, 2000);
            // Fermer le modal après soumission
            // Recharge la page après un délai pour que l'utilisateur puisse voir le message

            setTimeout(() => {
                window.location.reload();
            }, 1000); 

        } catch (error) {
            toast.error('Une erreur s\'est produite lors de la modification.Veuillez réessayer.');

        };
      // Fermer le modal après soumission
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
                            <option value="Masculin">Masculin</option>
                            <option value="Feminin">Feminin</option>
                      
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
                        <button type="button" className="orangebackcolor text-white py-2 px-4 rounded mr-2" onClick={onCloser}>Cancel</button>
                        <button type="submit" className="graybackcolor text-white py-2 px-4 rounded">
                        {loading ? 'Chargement...' : 'Soumettre'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Authorsupdate;