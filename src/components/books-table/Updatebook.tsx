import React, { ChangeEvent, useEffect, useState } from 'react';
import { updateBook } from './bookService'; // Assurez-vous d'avoir une fonction pour mettre à jour le livre
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Author {
    id: number;
    name: string;
}

interface BookFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    authors: Author[];
    book: any; // Type correspondant à l'objet livre, à ajuster selon vos besoins
}

const Updatebook: React.FC<BookFormModalProps> = ({ isOpen, onClose, authors, book }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [language, setLanguage] = useState<string>('');
    const [statut, setStatut] = useState<string>('');
    const [niveau, setNiveau] = useState<string>('');
    const [pubDate, setPubDate] = useState<string>('');
    const [price_p, setPrice_p] = useState<number | string>('');
    const [price_n, setPrice_n] = useState<number | string>('');
    const [userId, setUserId] = useState<number | string>('');
    const [authorId, setAuthorId] = useState<number | string>('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (book) {
            // Remplir les champs avec les données du livre existant
            setTitle(book.title);
            setDescription(book.description);
            setCategory(book.category);
            setLanguage(book.language);
            setStatut(book.status);
            setNiveau(book.niveau);
            setPubDate(book.pub_date);
            setPrice_p(book.price_p);
            setPrice_n(book.price_n);
            setUserId(book.user_id);
            setAuthorId(book.author_id);
            setImagePreview(`http://127.0.0.1:8000/images/books/${book.image}`); // Si l'image est une URL
        }
    }, [book]);
    

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                setImage(file);
                console.log(file); // Vérifie que le fichier est bien une image
    
                // Créer une URL pour l'aperçu de l'image
                const previewUrl = URL.createObjectURL(file);
                setImagePreview(previewUrl);
            } else {
                console.error('Le fichier sélectionné n\'est pas une image.');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('language', language);
        if (image) formData.append('image', image);
        formData.append('status', statut);
        formData.append('niveau', niveau);
        formData.append('pub_date', pubDate);
        formData.append('price_p', String(price_p));
        formData.append('price_n', String(price_n));
        formData.append('user_id', String(userId));
        formData.append('author_id', String(authorId));
        
      

        try {
            await updateBook(book.id, formData); // Assurez-vous d'utiliser la bonne méthode pour mettre à jour le livre
            toast.success('Livre modifié avec succès !');
            setTimeout(() => {
                onClose();
            }, 2000);
            // Recharge la page après un délai pour que l'utilisateur puisse voir le message
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Une erreur s\'est produite lors de la modification. Veuillez réessayer.');
        }
    };

    if (!isOpen) return null; // Ne rien rendre si le modal n'est pas ouvert

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] ">
            <ToastContainer />
            <div className="bg-white w-96 h-[95%] p-6 rounded-lg shadow-md  overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Modifier le livre</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex justify-center">
                        <label className="block text-sm font-medium mb-1 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer" htmlFor="image">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                            ) : (
                                "Photo"
                            )}
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="border border-gray-300 rounded w-full p-2 hidden"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="title">Titre</label>
                        <input
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="category">Catégorie</label>
                        <input
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="language">Langue</label>
                        <input
                            id="language"
                            name="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="status">Statut</label>
                        <select
                            id="status"
                            name="status"
                            value={statut}
                            onChange={(e) => setStatut(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            <option value="">Sélectionner le statut</option>
                            <option value="Nouveauté">Nouveauté</option>
                            <option value="A paraitre">À paraître</option>
                            <option value="Meilleure vente">Meilleure vente</option>
                            <option value="En promotion">En promotion</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="niveau">Niveau</label>
                        <select
                            id="niveau"
                            name="niveau"
                            value={niveau}
                            onChange={(e) => setNiveau(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            <option value="">Sélectionner le niveau</option>
                            <option value="Etudiant">Étudiant</option>
                            <option value="Professionnel">Professionnel</option>
                            <option value="Chercheur">Chercheur</option>
                            <option value="Lecteur occasionnel">Lecteur occasionnel</option>
                            <option value="Lecteur passionné">Lecteur passionné</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="pub_date">Date de publication</label>
                        <input
                            type="date"
                            id="pub_date"
                            name="pub_date"
                            value={pubDate}
                            onChange={(e) => setPubDate(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="price_n">Prix numérique</label>
                        <input
                            type="number"
                            id="price_n"
                            name="price_n"
                            value={price_n}
                            onChange={(e) => setPrice_n(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="price_p">Prix physique</label>
                        <input
                            type="number"
                            id="price_p"
                            name="price_p"
                            value={price_p}
                            onChange={(e) => setPrice_p(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="user_id">ID Utilisateur</label>
                        <input
                            type="text"
                            id="user_id"
                            name="user_id"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="author_id">Auteur</label>
                        <select
                            id="author_id"
                            name="author_id"
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            {
                                authors.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button type="button" className="orangebackcolor text-white py-2 px-4 rounded mr-2" onClick={onClose}>Annuler</button>
                        <button type="submit" className="graybackcolor text-white py-2 px-4 rounded">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Updatebook;