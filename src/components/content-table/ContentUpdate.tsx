import React, { ChangeEvent, useEffect, useState } from 'react';
import { saveNews, updateNews } from './contentservice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Author } from '../books-table/bookService';

interface NewsFormModalProps {
    isOpen: boolean;
    author: Author[];
    onClose: () => void;
    newsData: NewsData|null; // Ajoutez une prop pour les données de l'actualité
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
    author_id: string; // ID de l'auteur
}

const ContentUpdate: React.FC<NewsFormModalProps> = ({ isOpen, onClose, author, newsData }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [newsdate, setNewsdate] = useState('');
    const [images, setImages] = useState<File | null>(null);
    const [type, setType] = useState('');
    const [frome, setFrome] = useState('');
    const [author_id, setAuthor_id] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    // Si newsData est fourni, pré-remplissez les champs
    useEffect(() => {
        if (newsData) {
            setName(newsData.name);
            setDescription(newsData.description);
            setNewsdate(newsData.newsdate);
            setType(newsData.type);
            setFrome(newsData.frome);
            setAuthor_id(newsData.author_id);
            setImagePreview(newsData.image ?`http://127.0.0.1:8000/images/news/${newsData.image}`: null);
        }
    }, [newsData]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImages(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('newsdate', newsdate);
        if (images) {
            data.append('image', images);
        }
        data.append('type', type);
        data.append('frome', frome);
        data.append('user_id', "1");
        data.append('author_id', author_id);

        console.log([...data]); // Affichez les données pour déboguer

        try {
            if (newsData?.id != null) { // This checks for both null and undefined
                const str = newsData?.id.toString();
               
            await updateNews(str, data);
            } else {
                console.log('id is null or undefined');
            }
           
            toast.success('Votre actualité est enregistrée avec succès !');
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
                <h2 className="text-xl font-semibold mb-4">Mettre à jour l'Actualité</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="images">Image:</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/*"
                            onChange={handleImageChange}
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
                            <option value="">Sélectionner...</option>
                            <option value="Nouvelles Publications">Nouvelles Publications</option>
                            <option value="Prix Littéraires">Prix Littéraires</option>
                            <option value="Critiques Littéraires">Critiques Littéraires</option>
                            <option value="Événements Littéraires">Événements Littéraires</option>
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
                            <option value="interne">Interne</option>
                            <option value="externe">Externe</option>
                        </select>
                    </div>
                    {frome === "externe" && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="author_id">Auteurs:</label>
                            <select
                                id="author_id"
                                name="author_id"
                                value={author_id}
                                onChange={(e) => setAuthor_id(e.target.value)}
                                className="border border-gray-300 rounded w-full p-2"
                            >
                                <option value="">Sélectionner</option>
                                {author.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
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

export default ContentUpdate;