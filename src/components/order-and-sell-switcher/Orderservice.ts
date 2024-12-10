// services/orderService.ts
import axios from 'axios';
import { Book } from './AddSaleModal';
import { API_URL } from '../Url';



export interface Order {
    id: string;        // Date de la vente
    sale_date: string;        // Date de la vente
    paiement_type: string;    // Type de paiement (ex: 'carte', 'espèces', etc.)
    total_price: number;      // Prix total de la commande
    status: string;          // Statut de la commande (ex: 'en cours', 'terminée', 'annulée')
    quantity: number;        // Quantité de livres commandés
    type_book: string;        // Type de livre (ex: 'physique', 'numérique')
    book_id: number;          // Identifiant du livre
    user_id: string; 
    book:Book         // Identifiant de l'utilisateur qui a passé la commande
}



    // Fonction pour récupérer le token d'authentification
    const getToken = () => {
        return localStorage.getItem('authToken'); // Assurez-vous que le token est bien stocké dans localStorage
    };
    const token = getToken();

    export const createOrder = async (orderData: any) => {
        
        const response = await axios.post(`${API_URL}/sales`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    // Récupérer toutes les commandes
    export const getOrders= async () => {
       
        const response = await axios.get(`${API_URL}/sale`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    // Récupérer une commande par ID
   export const  getOrderById = async (orderId: number) => {
       
        const response = await axios.get(`${API_URL}/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    // Mettre à jour une commande
    export const updateOrder = async (orderId: number, orderData: any) => {
       
        const response = await axios.put(`${API_URL}/sale/${orderId}`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    // Supprimer une commande
 export const  deleteOrder = async (orderId: string) => {
       
        const response = await axios.delete(`${API_URL}/sale/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }


