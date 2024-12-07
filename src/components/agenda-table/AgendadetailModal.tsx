import React from 'react';
import { NewsData } from './Agendaservice';

// export interface NewsData {
//     id: number;
//     name: string;
//     type: string;
//     description: string;
//     newsdate: string;
//     image: string;  // Assurez-vous que c'est de type string
// }

interface NewsDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    news: NewsData | null;  // Utiliser NewsData ici
}

const AgendaDetailModal: React.FC<NewsDetailModalProps> = ({ isOpen, onClose, news }) => {
    if (!isOpen || !news) return null;

 

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 overflow-auto">
                <h2 className="text-xl font-bold mb-4">{news.name}</h2>
                <img
                    src={`http://127.0.0.1:8000/images/event/${news.image}`}
                    alt={news.name}
                    className="w-full h-40 object-cover rounded mb-4"
                />
                <p className="mb-2"><strong>Type:</strong> {news.type}</p>
                <p className="mb-2"><strong>Description:</strong> {news.description}</p>
                <p className="mb-4"><strong>Date de début:</strong> {news.eventdate}</p>
                <p className="mb-4"><strong>Date de fin:</strong> {news.enddate}</p>
                <button 
                    onClick={onClose} 
                    className="px-4 py-2 graybackcolor text-white rounded hover:bg-blue-600 transition"
                >
                    Fermer
                </button>
            </div>
        </div>
    )
};

export default AgendaDetailModal;