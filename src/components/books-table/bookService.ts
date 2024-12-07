import axios from 'axios';

// Définir l'interface pour un livre
export interface Book {
    id: number; // Optionnel pour un nouvel livre
    title: string;
    description: string;
    category: string;
    language: string;
    image: File | null; // Pour gérer les fichiers d'image
    status: string;
    niveau: string;
    pub_date: string;
    price_n: string;
    price_p: string;
    user_id: string;
    author_id: string;
}



export interface Author {
    id: number;
    name: string;
    gender: string;
    country: string;
    imageauthor: File | null; // ou string si vous voulez stocker l'URL de l'image
    description: string;
    date_nais: string; // Format de date, par exemple "YYYY-MM-DD"
    email: string;
}
// URL de l'API (à adapter selon ton backend)
const API_URL = 'http://127.0.0.1:8000/api';
const getToken = () => {
    return localStorage.getItem('authToken'); // Assurez-vous que le token est bien stocké dans localStorage
};
const token = getToken();
// Fonction pour créer un livre
export const createBook = async (bookData: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/savebook`, bookData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du livre:', error);
        throw error;
    }
};

// Fonction pour récupérer tous les livres
export const getBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/getbook`, {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des livres:', error);
        throw error;
    }
};

// Fonction pour récupérer un livre par ID
export const getBookById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/getbybook/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du livre:', error);
        throw error;
    }
};

// Fonction pour mettre à jour un livre
export const updateBook = async (id: string, bookData: FormData) => {

    for (let [key, value] of bookData.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        const response = await axios.put(`${API_URL}/updatebook/${id}`, bookData, {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data'
                        },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du livre:', error);
        throw error;
    }
};

// Fonction pour supprimer un livre
export const deleteBook = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/deletebook/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression du livre:', error);
        throw error;
    }
};