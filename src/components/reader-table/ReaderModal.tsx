import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { API_URL } from '../Url';

interface ReaderModalProps {
    showModal: boolean;
    handleClose: () => void;
}

const ReaderModal: React.FC<ReaderModalProps> = ({ showModal, handleClose }) => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const getToken = () => {
        return localStorage.getItem('authToken'); // Assurez-vous que le token est bien stocké dans localStorage
    };
    const token = getToken();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/readers`, { email, name, phone }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },});
            console.log('Reader added:', response.data);        
            toast.success('Lecteur enregistré avec succès !');
            setTimeout(() => {
                handleClose(); // Fermer le modal après l'enregistrement
            }, 2000); 
          // Fermer le modal après soumission
            // Recharge la page après un délai pour que l'utilisateur puisse voir le message
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error adding reader:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
                     <ToastContainer />
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-xl font-semibold mb-4">Enregistrement d'un lecteur</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email *</label>
                                <input
                                    type="email"
                                    placeholder="Entrez l'email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    placeholder="Entrez le nom"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                                <input
                                    type="number"
                                    placeholder="Entrez le numero"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="mr-2  p-3 rounded-md text-white orangebackcolor hover:text-gray-800"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`graybackcolor text-white rounded-md px-4 py-2 ${loading ? 'opacity-50' : ''}`}
                                >
                                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReaderModal;