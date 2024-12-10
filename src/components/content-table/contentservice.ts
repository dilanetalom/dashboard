import axios from 'axios';
import { API_URL } from '../Url';


const getToken = () => {
    return localStorage.getItem('authToken'); // Assurez-vous que le token est bien stocké dans localStorage
};
const token = getToken();

    // Récupérer toutes les actualités
    export const getNews= async () => {
        try {
            const response = await axios.get(`${API_URL}/getnews`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },});
            return response.data; // Retourner les données des actualités
        } catch (error) {
            throw error; // Gérer l'erreur
        }
    }

    // Enregistrer une nouvelle actualité
    export const saveNews= async (newsData: any) => {
        try {
            const response = await axios.post(`${API_URL}/savenews`, newsData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },});
            return response.data; // Retourner les données de la réponse
        } catch (error) {
            throw error; // Gérer l'erreur
        }
    }

    // Récupérer une actualité par ID
    export const getByNewsId= async (id:string) => {
        try {
            const response = await axios.get(`${API_URL}/getbynews/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },});
            return response.data; // Retourner les données de l'actualité
        } catch (error) {
            throw error; // Gérer l'erreur
        }
    }

    // Mettre à jour une actualité
    export const updateNews =async (id:string, newsData:FormData) => {
        try {
            const response = await axios.put(`${API_URL}/updatenews/${id}`, newsData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },});
            return response.data; // Retourner les données de la réponse
        } catch (error) {
            throw error; // Gérer l'erreur
        }
    }

    // Supprimer une actualité
    export const  deleteNews= async (id:string) => {
        try {
            const response = await axios.delete(`${API_URL}/deletenews/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },});
            return response.data; // Retourner le message de succès
        } catch (error) {
            throw error; // Gérer l'erreur
        }
    }

