import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { User } from '../navbar/AppNavbar';
import LoadingModal from '../LoadingModal';
import { createOrder } from './Orderservice';

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

interface AddSaleModalProps {
    isOpen: boolean;
    onClose: () => void;
    books: Book[];
}

const AddSaleModal: React.FC<AddSaleModalProps> = ({ isOpen, onClose, books }) => {
    const [saleDate, setSaleDate] = useState<string>('');
    const [paiementType, setPaiementType] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<number | ''>('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [status, setStatus] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [typeBook, setTypeBook] = useState<string>('');
    const [bookId, setBookId] = useState<number | ''>('');

    const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBookId = Number(e.target.value);
        setBookId(selectedBookId);
        
        const selectedBook = books.find(book => book.id === selectedBookId);
        if (selectedBook) {
            if (typeBook === 'physique') {
                const price = Number(selectedBook.price_p);
                setUnitPrice(price);
                setTotalPrice(price * (quantity || 1)); 
            } else if (typeBook === 'numerique') {
                const price = Number(selectedBook.price_n);
                setUnitPrice(price);
                setTotalPrice(price * (quantity || 1)); 
            }
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
            if (selectedType === 'physique') {
                const price = Number(selectedBook.price_p);
                setUnitPrice(price);
                setTotalPrice(price * (quantity || 1)); 
            } else if (selectedType === 'numerique') {
                const price = Number(selectedBook.price_n);
                setUnitPrice(price);
                setTotalPrice(price * (quantity || 1)); 
            }
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const qty = Number(e.target.value);
        setQuantity(qty);
        setTotalPrice(unitPrice ? unitPrice * qty : ''); // Mettre à jour le total
    };



    const [parsedUser, setParsedUser] = useState<User|null>()


    useEffect(()=>{
      const user = localStorage.getItem('user'); // Récupérer l'utilisateur du localStorage
  
    if (user) { // Vérifiez que l'utilisateur n'est pas null
      setParsedUser(JSON.parse(user)); // Convertir la chaîne JSON en objet
    } else {
        console.log('Aucun utilisateur trouvé dans le localStorage.');
    }
    },[])

    const [loading, setLoading] = useState(false);
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
            user_id: parsedUser?parsedUser.id:'',
        };
        setLoading(true)
        try {
             await createOrder(saleData); 
                setLoading(false)    
                toast.success(' enregistré avec succès !');
                setTimeout(() => {
                    onClose(); // Fermer le modal après l'enregistrement
                }, 2000); 
              // Fermer le modal après soumission
                // Recharge la page après un délai pour que l'utilisateur puisse voir le message
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            // Reset form
            setSaleDate('');
            setPaiementType('');
            setTotalPrice('');
            setStatus('');
            setQuantity(1); // Réinitialiser à 1
            setTypeBook('');
            setBookId('');
            setUnitPrice('');
            onClose(); // Fermer le modal après l'ajout
        } catch (error) {
            console.error('Error adding reader:', error);
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
                <h2 className="text-xl font-bold mb-4">Ajouter une Vente</h2>
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
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSaleModal;