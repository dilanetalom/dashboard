import React from 'react';
import { NewsData } from './ContentUpdate';



interface NewsDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    news: NewsData | null;  // Utiliser NewsData ici
}

const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ isOpen, onClose, news }) => {
    if (!isOpen || !news) return null;

 

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 overflow-auto">
                <h2 className="text-xl font-bold mb-4">{news.name}</h2>
                <img
                    src={`http://127.0.0.1:8000/images/news/${news.image}`}
                    alt={news.name}
                    className="w-full h-40 object-cover rounded mb-4"
                />
                <p className="mb-2"><strong>Type:</strong> {news.type}</p>
                <p className="mb-2"><strong>Description:</strong> {news.description}</p>
                <p className="mb-4"><strong>Date de publication:</strong> {news.newsdate}</p>
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

export default NewsDetailModal;