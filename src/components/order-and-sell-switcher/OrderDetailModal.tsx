import React from 'react';
import { Order } from './Orderservice';

interface OrderDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null; // Assurez-vous que l'interface Order est importée
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isOpen, onClose, order }) => {
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Détails de la Commande</h2>
                <div className="mb-4 opacitybackcolor py-10 pl-2">
                    <p><strong>Date de Vente:</strong> {new Date(order.sale_date).toLocaleDateString()}</p>
                    <p><strong>Type de Paiement:</strong> {order.paiement_type}</p>
                    <p><strong>Statut:</strong> {order.status}</p>
                    <p><strong>Type de Livre:</strong> {order.type_book}</p>
                    <p><strong>Nom du Livre:</strong> {order.book.title}</p>
                    <p><strong>Prix unitaire:</strong> {order.type_book === "physique"? order.book.price_p:order.book.price_n}</p>
                    <p><strong>Quantité:</strong> {order.quantity}</p>
                    <p><strong>Prix Total:</strong> {order.total_price} €</p>
                </div>
                <div className="flex justify-end">
                    <button
                        className="orangebackcolor text-white px-4 py-2 rounded "
                        onClick={onClose}
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailModal;