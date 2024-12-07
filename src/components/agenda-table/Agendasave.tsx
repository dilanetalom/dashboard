import React, { ChangeEvent, useState } from 'react';
import { saveNews } from './Agendaservice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NewsFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}



const Agendasave: React.FC<NewsFormModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [eventdate, setEventdate] = useState('');
    const [enddate, setEnddate] = useState('');
    const [images, setImages] = useState<File | null>(null);
    const [type, setType] = useState('');
    const [frome, setFrome] = useState('');
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
        // const user_id = 1;
        // Créer un FormData pour envoyer l'image et les autres données
        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('eventdate', eventdate);
        data.append('enddate', enddate);
        if (images) { // Vérifiez si image n'est pas null
            data.append('image', images);
        }
        data.append('type', type);
        data.append('frome', frome);
        data.append('user_id', "1");

        console.log([...data]); // Affichez les données pour déboguer

        try {
            await saveNews(data);
            toast.success('Votre actualité est enregistré avec succès !');
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
                <h2 className="text-xl font-semibold mb-4">Ajouter une Evennement</h2>
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
                        <label className="block text-sm font-medium text-gray-700" htmlFor="eventdate">Date de début:</label>
                        <input
                            type="date"
                            id="eventdate"
                            name="eventdate"
                            value={eventdate}
                            onChange={(e) => setEventdate(e.target.value)}
                            required
                            className="mt-1 h-10 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="enddate">Date de fin:</label>
                        <input
                            type="date"
                            id="enddate"
                            name="enddate"
                            value={enddate}
                            onChange={(e) => setEnddate(e.target.value)}
                            required
                            className="mt-1 h-10 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="type">Type:</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                            className="mt-1 h-10 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="frome">Provenance:</label>
                        <select
                            id="frome"
                            name="frome"
                            value={frome}
                            onChange={(e)=>setFrome(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            <option value="">Provenance</option>
                            <option value="interne">interne</option>
                            <option value="externe">externe</option>
                      
                        </select>
                       
                     
                    </div>
                    {/* <input type="hidden" name="user_id" value={user_id} /> */}
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="graybackcolor text-white px-4 py-2 rounded-md mr-2">Soumettre</button>
                        <button type="button" onClick={onClose} className="orangebackcolor px-4 py-2 rounded-md text-white">Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Agendasave;