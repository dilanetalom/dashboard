import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
// import { User } from '../navbar/AppNavbar';
import LoadingModal from '../LoadingModal';
import { updateOrder } from './Orderservice';


export interface Book {
    id: number;
    title: string;
    description: string;
    category: string;
    language: string;
    image: File | null;
    status: string;
    niveau: string;
    pub_date: string;
    price_n: string; // Prix numérique
    price_p: string; // Prix physique
    user_id: string;
    author_id: string;
}

interface UpdateSaleModalProps {
    isOpen: boolean;
    onClose: () => void;
    books: Book[];
    existingSale: any; // Remplacez par l'interface appropriée pour la vente existante
}

const UpdateSaleModal: React.FC<UpdateSaleModalProps> = ({ isOpen, onClose, books, existingSale }) => {
    const [saleDate, setSaleDate] = useState<string>('');
    const [paiementType, setPaiementType] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<string>('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [status, setStatus] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [typeBook, setTypeBook] = useState<string>('');
    const [bookId, setBookId] = useState<number | ''>('');

    useEffect(() => {
        if (existingSale) {
            setSaleDate(existingSale.sale_date);
            setPaiementType(existingSale.paiement_type);
            setTotalPrice(existingSale.total_price);
            setStatus(existingSale.status);
            setQuantity(existingSale.quantity);
            setTypeBook(existingSale.type_book);
            setBookId(existingSale.book_id);
        }
    }, [existingSale]);

    const [loading, setLoading] = useState(false);

    const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBookId = Number(e.target.value);
        setBookId(selectedBookId);
        
        const selectedBook = books.find(book => book.id === selectedBookId);
        if (selectedBook) {
            const price = typeBook === 'physique' ? Number(selectedBook.price_p) : Number(selectedBook.price_n);
            setUnitPrice(price);
            setTotalPrice((price * quantity).toString());
        } else {
            setUnitPrice('');
            setTotalPrice('');
        }
    };

    const handleTypeBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setTypeBook(selectedType);
        
        const selectedBook = books.find(book => book.id === bookId);
        if (selectedBook) {
            const price = selectedType === 'physique' ? Number(selectedBook.price_p) : Number(selectedBook.price_n);
            setUnitPrice(price);
            setTotalPrice((price * quantity).toString());
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const qty = Number(e.target.value);
        setQuantity(qty);
        setTotalPrice(unitPrice ? (unitPrice * qty).toString() : '');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const saleData = {
            sale_date: saleDate,
            paiement_type: paiementType,
            total_price: totalPrice,
            status,
            quantity,
            type_book: typeBook,
            book_id: bookId,
            user_id: existingSale.user_id, // Remplacez ceci par l'ID d'utilisateur approprié
        };

        setLoading(true);
        try {
            await updateOrder(existingSale.id, saleData); // Appel à la fonction de mise à jour
            toast.success('Vente mise à jour avec succès !');
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la vente:', error);
            toast.error('Erreur lors de la mise à jour de la vente.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
            {loading && <LoadingModal />}
            <ToastContainer />
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 h-[98%] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Mettre à Jour la Vente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Date de vente</label>
                        <input
                            type="date"
                            value={saleDate}
                            onChange={(e) => setSaleDate(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Type de livre</label>
                        <select
                            value={typeBook}
                            onChange={handleTypeBookChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Sélectionner le type</option>
                            <option value="physique">Physique</option>
                            <option value="numerique">Numérique</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nom du livre</label>
                        <select
                            value={bookId}
                            onChange={handleBookChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Sélectionner un livre</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                    </div>
                 
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Prix unitaire</label>
                        <input
                            type="number"
                            value={unitPrice || ''}
                            readOnly
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Quantité</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Prix total</label>
                        <input
                            type="number"
                            value={totalPrice || ''}
                            readOnly
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Type de paiement</label>
                        <select
                            value={paiementType}
                            onChange={(e) => setPaiementType(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Sélectionner le type</option>
                            <option value="OM">Orange Money</option>
                            <option value="MOMO">Mtn money</option>
                            <option value="paypal">Paypal</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Statut</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Statut</option>
                            <option value="encours">Encours</option>
                            <option value="terminée">Terminée</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 orangebackcolor text-white rounded-md px-3"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="graybackcolor text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Mettre à Jour
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSaleModal;