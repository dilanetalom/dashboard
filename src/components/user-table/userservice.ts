// userService.ts
import axios, { AxiosError } from 'axios';
import { API_URL } from '../Url';


export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    gender: string;
    role: string;
  }

  const getToken = () => {
    return localStorage.getItem('authToken'); // Assurez-vous que le token est bien stocké dans localStorage
};
const token = getToken();


// Créer un nouvel utilisateur
export const createUser = async (userData: User): Promise<User> => {
    try {
        const response = await axios.post<User>(`${API_URL}/register`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },});
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError; // Assertion de type
        throw axiosError.response?.data || 'Erreur lors de la création de l\'utilisateur';
    }
};



// Lire tous les utilisateurs
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(`${API_URL}/allusers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },});
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError; // Assertion de type
        throw axiosError.response?.data || 'Erreur lors de la recuperation des utilisateurs';
    }
};

// Lire un utilisateur par ID
export const getUserById = async (userId: string): Promise<User> => {
    try {
        const response = await axios.get<User>(`${API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },});
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError; // Assertion de type
        throw axiosError.response?.data || 'Erreur lors de la recuperation de l\'utilisateur';
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (userId: string, userData: User): Promise<User> => {
    try {
        const response = await axios.put<User>(`${API_URL}/updateuser/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },});
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError; // Assertion de type
        throw axiosError.response?.data || 'Erreur lors de la modification de l\'utilisateur';
    }
};

// Supprimer un utilisateur
export const deleteUser = async (userId: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/deleteuser/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },});
    } catch (error) {
        const axiosError = error as AxiosError; // Assertion de type
        throw axiosError.response?.data || 'Erreur lors de la Suppression de l\'utilisateur';
    }
};