import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import logo from "../../assets/logos.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login:React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {

      e.preventDefault();
      setError(''); // Réinitialiser l'erreur
      setLoading(true); // Démarrer le chargement
      const API_URL = "http://127.0.0.1:8000/api"

      // Validation simple
      if (!email) {
          setError('Veuillez entrer votre email.');
          setLoading(false);
          return;
      }

      if (!password) {
          setError('Veuillez entrer votre mot de passe.');
          setLoading(false);
          return;
      }

      try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
      
         const token = response.data.token;
          localStorage.setItem('authToken', token);
          toast.success('Connexion réussie !');
        
          setTimeout(() => {
            navigate("main/board");
        }, 2000);
         

      } catch (error) {
          toast.error('Une erreur s\'est produite lors de l authentification. Veuillez réessayer.');
      }
       finally {
          setLoading(false); // Arrêter le chargement
      }
  };


  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen bg-gray-100">
           <ToastContainer />
      <div>
        <img src={logo} alt="" />
      </div>
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-1/4"
    >
      {/* <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2> */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 outline-none"
          required
        />
      </div>
      <div className="mb-6 relative">
        <label className="block text-gray-700 mb-2" htmlFor="password">Mot de passe</label>
        <input
          type={visible?"password":"text"}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 outline-none"
          placeholder='*****'
          required
        />
     
          <FaEye className='absolute right-4 transform -translate-y-[28px]  graycolor cursor-pointer' onClick={()=>setVisible(!visible)}/>
     
      </div>
      {/* {
      error && <p style={{ color: 'red' }}>{error}</p>
      } */}
      <button
         type="submit" disabled={loading}
        className="graybackcolor text-white font-semibold py-2 px-4 rounded hover:orangebackcolor transition duration-200 w-full"
      >
           {loading ? 'Chargement...' : 'Se connecter'}
      </button>
    </form>
  </div>
  )
}

export default Login
