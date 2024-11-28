import React, { useState } from 'react';

interface FormData {
    title: string;
    description: string;
    category: string;
    language: string;
    image: File | null;
    status: string;
    niveau: string;
    pub_date: string;
    price_n: number | string;
    price_p: number | string;
    user_id: string;
    author_id: string;
}

interface BookFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BookFormModal: React.FC<BookFormModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        category: '',
        language: '',
        image: null,
        status: '',
        niveau: '',
        pub_date: '',
        price_n: '',
        price_p: '',
        user_id: '',
        author_id: ''
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, image: file }));

        // Créer une URL pour afficher l'aperçu de l'image
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null); // Réinitialiser si aucun fichier
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Book submitted:', formData);
        onClose(); // Fermer le modal après soumission
    };

    if (!isOpen) return null; // Ne rien rendre si le modal n'est pas ouvert

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] overflow-y-auto">
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
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
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
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="language">Language</label>
                        <input
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                  

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        >
                            <option value="">Select Status</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="niveau">Level</label>
                        <input
                            id="niveau"
                            name="niveau"
                            value={formData.niveau}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="pub_date">Publication Date</label>
                        <input
                            type="date"
                            id="pub_date"
                            name="pub_date"
                            value={formData.pub_date}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="price_n">Normal Price</label>
                        <input
                            type="number"
                            id="price_n"
                            name="price_n"
                            value={formData.price_n}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="price_p">Promotional Price</label>
                        <input
                            type="number"
                            id="price_p"
                            name="price_p"
                            value={formData.price_p}
                            onChange={handleChange}
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="user_id">User ID</label>
                        <input
                            type="text"
                            id="user_id"
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="author_id">Author ID</label>
                        <input
                            type="text"
                            id="author_id"
                            name="author_id"
                            value={formData.author_id}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded w-full p-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button type="button" className="bg-red-500 text-white py-2 px-4 rounded mr-2" onClick={onClose}>Cancel</button>
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookFormModal;