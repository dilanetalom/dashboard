import axios from 'axios';

// URL de base de l'API
const API_URL = 'http://127.0.0.1:8000/api';

// Fonction pour obtenir le token depuis localStorage
const getToken = () => {
    return localStorage.getItem('authToken'); // Assurez-vous que le token est bien stocké dans localStorage
};

// Service pour créer un nouvel auteur
export const createAuthor = async (authorData:FormData) => {
    const token = getToken();
     
    const response = await axios.post(`${API_URL}/saveauthor`, authorData, {
        headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json',
        },
    });
    return response.data;
};



// Service pour obtenir tous les auteurs
export const getAllAuthors = async () => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/allauthor`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};




// Service pour obtenir un auteur par son ID
export const getAuthorById = async (id: string) => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/getbyauthor/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Service pour mettre à jour un auteur
export const updateAuthor = async (id: string, authorData: any) => {
    const token = getToken();
    const response = await axios.put(`${API_URL}/${id}`, authorData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

// Service pour supprimer un auteur
export const deleteAuthor = async (id: string) => {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/deleteauthor/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};