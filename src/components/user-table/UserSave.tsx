import React, { useState } from 'react';
import { createUser } from './userservice';
import { toast, ToastContainer } from 'react-toastify';

interface UserFormData {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  role: string;
}

const UserSave = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void;  }) => {
    if (!isOpen) return null;
  const [formData, setFormData] = useState<UserFormData>({
    id: '',
    name: '',
    email: '',
    password: '',
    gender: '',
    role: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation plus poussée (exemple)
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Le nom est requis';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Veuillez entrer un email valide';
    if (formData.password.length < 8) newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    // ... ajouter d'autres validations

    if (Object.keys(newErrors).length === 0) {
      // Envoi des données à votre serveur (à remplacer par votre logique réelle)
     

      try {
        await createUser(formData);
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


      // ... appel à une API pour enregistrer l'utilisateur
      setFormData({
        id: '',
        name: '',
        email: '',
        password: '',
        gender: '',
        role: '',
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
                    <ToastContainer />

    <div className="bg-white rounded-lg p-6 w-96 h-auto overflow-auto">
    <form onSubmit={handleSubmit} className="space-y-6">


      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
    
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Sexe
        </label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          className={`mt-1 block w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
        >
            <option value="">Sexe</option>
            <option value="masculin">Masculin</option>
            <option value="feminin">Feminin</option>
            </select>
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
    
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          className={`mt-1 block w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
        >
            <option value="">Role</option>
            <option value="admin">Admin</option>
            <option value="utilisateur">Utilisateur</option>
            </select>
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
    
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className={`mt-1 block w-full h-10 px-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div className='flex gap-3'>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-500"
        >
          Enregistrer
        </button>

        <button type="button" onClick={onClose} className="orangebackcolor px-4 py-2 rounded-md text-white">Annuler</button>
      </div>
    </form>
    </div>
    </div>
        
  );
};

export default UserSave;