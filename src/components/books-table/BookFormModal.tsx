import React, { ChangeEvent, useState } from 'react';
import { createBook } from './bookService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Author {
    id: number;
    name: string;
    gender: string;
    country: string;
    imageauthor: File | null; // ou string si vous voulez stocker l'URL de l'image
    description: string;
    date_nais: string; // Format de date, par exemple "YYYY-MM-DD"
    email: string;
}


interface BookFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    authors: Author[]
}

const BookFormModal: React.FC<BookFormModalProps> = ({ isOpen, onClose, authors }) => {

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


    // const [isModalOpen, setIsModalOpen] = useState(false);


    const [imagePreview, setImagePreview] = useState<string | null>(null);


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage(file);

            // Créer une URL pour l'aperçu de l'image
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
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

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });


        try {
            await createBook(formData);
            console.log('Book submitted:', formData);
            toast.success('Votre message a été envoyé avec succès !');
            setTimeout(() => {
                onClose(); 
            }, 2000); 
          // Fermer le modal après soumission
            // Recharge la page après un délai pour que l'utilisateur puisse voir le message
            setTimeout(() => {
                window.location.reload();
            }, 1000); // 2 secondes de délai pour permettre à l'utilisateur de voir le toast
        } catch (error) {
            toast.error('Une erreur s\'est produite lors de l\'enregistrement. Veuillez réessayer.');
        }

    };




    if (!isOpen) return null; // Ne rien rendre si le modal n'est pas ouvert

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] overflow-y-auto">
            <ToastContainer />
            <div className="bg-white w-96 p-6 rounded-lg shadow-md mt-[500px]">
                <h2 className="text-lg font-bold mb-4">Ajouter un livre</h2>
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
                        <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
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
                        <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
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
                        <label className="block text-sm font-medium mb-1" htmlFor="language">Language</label>
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
                        <label className="block text-sm font-medium mb-1" htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={statut}
                            onChange={(e) => setStatut(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            <option value="">Select Status</option>
                            <option value="Nouveauté">Nouveauté</option>
                            <option value="A paraitre">A paraitre</option>
                            <option value="Meilleure vente">Meilleure vente</option>
                            <option value="En promotion">En promotion</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="niveau">Niveau</label>
                        {/* <input
                            id="niveau"
                            name="niveau"
                            value={niveau}
                            onChange={(e) => setNiveau(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        /> */}

                        <select
                            id="niveau"
                            name="niveau"
                            value={niveau}
                            onChange={(e) => setNiveau(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            <option value="">Select Status</option>
                            <option value="Etudiant">Etudiant</option>
                            <option value="Professionnel">Professionnel</option>
                            <option value="Chercheur">Chercheur</option>
                            <option value="Lecteur occasionnel">Lecteur occasionnel</option>
                            <option value="Lecteur passionné">Lecteur passionné</option>
                        </select>


                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="pub_date">Publication Date</label>
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
                        <label className="block text-sm font-medium mb-1" htmlFor="price_p">Prix Physique</label>
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
                        <label className="block text-sm font-medium mb-1" htmlFor="user_id">User ID</label>
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
                                authors.map((item: any) => {
                                    return (
                                        <option value={item.id}>{item.name}</option>
                                    )
                                })

                            }


                        </select>
                        {/* <input
                            type="text"
                            id="author_id"
                            name="author_id"
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        /> */}
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

export default BookFormModal;