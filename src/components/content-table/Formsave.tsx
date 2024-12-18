import React, { ChangeEvent, useState } from 'react';
import { saveNews } from './contentservice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Author } from '../books-table/bookService';

interface NewsFormModalProps {
    isOpen: boolean;
    author: Author[];
    onClose: () => void;
}

export interface NewsData {
    id: number;
    name: string;
    description: string;
    newsdate: string; // Format de date approprié
    image: File | null;
    type: string;
    frome: string;
    user_id: string; // ID de l'utilisateur
}

const Formsave: React.FC<NewsFormModalProps> = ({ isOpen, onClose, author }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [newsdate, setNewsdate] = useState('');
    const [images, setImages] = useState<File | null>(null);
    const [type, setType] = useState('');
    const [frome, setFrome] = useState('');
    const [author_id, setAuthor_id] = useState('');
    const [loading, setLoading] = useState(false);


    // const [user_id, setUserId] = useState('1');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImages(file);

            // Créer une URL pour l'aperçu de l'image
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // Créer un FormData pour envoyer l'image et les autres données
        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('newsdate', newsdate);
        if (images) { // Vérifiez si image n'est pas null
            data.append('image', images);
        }
        data.append('type', type);
        data.append('frome', frome);
        data.append('user_id', "1");
        data.append('author_id', author_id);

        console.log([...data]); // Affichez les données pour déboguer

        try {
            await saveNews(data);
            toast.success('Votre actualité est enregistré avec succès !');
            setLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Une erreur s\'est produite lors de l\'enregistrement. Veuillez réessayer.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
            <ToastContainer />
            <div className="bg-white rounded-lg p-6 w-96 h-[95%] overflow-auto">
                <h2 className="text-xl font-semibold mb-4">Ajouter une Actualité</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="images">Image:</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/*"
                            onChange={handleImageChange} // Correction ici
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Prévisualisation"
                                className="mt-2 rounded-md h-32 object-cover"
                            />
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Nom:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="newsdate">Date de la news:</label>
                        <input
                            type="date"
                            id="newsdate"
                            name="newsdate"
                            value={newsdate}
                            onChange={(e) => setNewsdate(e.target.value)}
                            required
                            className="mt-1 h-10 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="type">Type:</label>
                       
                           <select
                            id="type"
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                       <option value=' '> Selectionner ...</option>
                       <option value=' Nouvelles Publications'> Nouvelles Publications</option>
                       <option value='Prix Littéraires'>Prix Littéraires</option>
                       <option value='Critiques Littéraires'>Critiques Littéraires</option>
                       <option value='Événements Littéraires'>Événements Littéraires</option>
                       <option value="Interviews d'Auteurs">Interviews d'Auteurs</option>
                       <option value="Tendances Littéraires">Tendances Littéraires</option>
                       <option value="Adaptations Cinématographiques">Adaptations Cinématographiques</option>
                       <option value="Littérature et Société">Littérature et Société</option>
                       <option value="Littérature Internationale">Littérature Internationale</option>
                       </select>

                       </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="frome">Provenance:</label>
                        <select
                            id="frome"
                            name="frome"
                            value={frome}
                            onChange={(e) => setFrome(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            <option value="">Provenance</option>
                            <option value="interne">interne</option>
                            <option value="externe">externe</option>

                        </select>
                    </div>
                    {
                        frome === "externe" ?
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="frome">Auteurs:</label>
                                <select
                                    id="frome"
                                    name="author_id"
                                    value={author_id}
                                    onChange={(e) => setAuthor_id(e.target.value)}
                                    className="border border-gray-300 rounded w-full p-2"
                                >
                                    <option value="">Selectionner</option>
                                    {
                                        author.map((item) => {
                                            return (
                                                <option value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div> : null
                    }

                    {/* <input type="hidden" name="user_id" value={user_id} /> */}
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="graybackcolor text-white px-4 py-2 rounded-md mr-2">
                        {loading ? 'Chargement...' : 'Soumettre'}
                            </button>
                        <button type="button" onClick={onClose} className="orangebackcolor px-4 py-2 rounded-md text-white">Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Formsave;