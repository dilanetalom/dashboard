import { Link, useLocation } from 'react-router-dom';
import AppLogo from '../../assets/logo.png';
import './sidebar.css';
import DashboardIcon from '../../assets/icons_png/board.png';
import AuthorIcon from '../../assets/icons_png/hand.png';
import BookIcon from '../../assets/icons_png/book.png';
import CartIcon from '../../assets/icons_png/cart.png';
import AgendaIcon from '../../assets/icons_png/calendar.png';
import ReaderIcon from '../../assets/icons_png/person.png';
import ContentIcon from '../../assets/icons_png/content.png';
// import ReportIcon from '../../assets/icons_png/report.png';
import SettingsIcon from '../../assets/icons_png/settings.png';
import { MdLogout } from "react-icons/md";
import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../Url';



const linkItems = [
    {
        id: 1,
        label: "Tableau de bord",
        icon: DashboardIcon,
        currentRoute: false,
        href: "board"
    },
    {
        id: 2,
        label: "Gestion des auteurs",
        icon: AuthorIcon ,
        currentRoute: false,
        href: "authors"
    },
    {
        id: 3,
        label: "Gestion des livres",
        icon: BookIcon,
        currentRoute: false,
        href: "books"
    },
 
 
    {
        id: 4,
        label: "Gestion des actualites",
        icon: ContentIcon,
        currentRoute: false,
        href: "content"
    },

    {
        id: 5,
        label: "Gestion des evennements",
        icon: AgendaIcon,
        currentRoute: false,
        href: "agendas"
    },

    {
        id: 6,
        label: "Gestion des commandes/ventes",
        icon: CartIcon,
        currentRoute: false,
        href: "orders"
    },
 
    {
        id: 7,
        label: "Gestion des lecteurs",
        icon: ReaderIcon,
        currentRoute: false,
        href: "readers"
    },
    // {
    //     id: 8,
    //     label: "Reports et analytiques",
    //     icon: ReportIcon,
    //     currentRoute: false,
    //     href: "analytics"
    // },
    {
        id: 8,
        label: "Parametres",
        icon: SettingsIcon,
        currentRoute: false,
        href: "settings"
    },
    
]



interface ConfirmationModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div style={modalOverlayStyle}>
            <div style={modalStyle} className='flex flex-col gap-10'>
                <h2>Voulez-vous vraiment vous déconnecter ?</h2>
                <div className='flex gap-5 justify-center'>
                    <button className='px-3 py-2 rounded-md graybackcolor text-white' onClick={onConfirm}>Oui</button>
                    <button className='px-3 py-2 rounded-md yellowbackcolor text-white' onClick={onCancel}>Non</button>
                </div>
            </div>
        </div>
    );
};

// Styles pour le modal
const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
};



function AppSidebar() {
    const {pathname} = useLocation();
    const [showModal, setShowModal] = useState(false);
   


// Fonction de déconnexion
 const logout = async () => {
    const token = localStorage.getItem('authToken'); // Récupère le token

    try {
        // Envoie une requête de déconnexion à l'API
        const response = await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`, // Passe le token dans les en-têtes
                'Content-Type': 'application/json',
            },
        });

        // Vérifie si la requête a réussi
        if (response.status === 200) {
            // Supprime le token du localStorage
            localStorage.removeItem('authToken');
            return true; // Retourne une confirmation de succès
        }
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        return false; // En cas d'erreur, retourne false
    }
}



const handleLogout = async () => {
    const success = await logout();
    if (success) {
        console.log('Déconnexion réussie');
        window.location.href = '/'; // Rediriger vers la page de connexion
    } else {
        console.log('Déconnexion échouée');
    }
    setShowModal(false); // Fermer le modal après la déconnexion
};
  
  return (
    <nav className='sidebar-container'>
        <div className="logo">
            <img src={AppLogo} alt="logo finex" />
        </div>
        <ul className="sidebar-items">
            {
                linkItems.map((link) => (
                    <li className="sidebar-item" key={link.id}>
                        <Link to={link.href} className={`sidebar-item-link ${pathname.startsWith(link.href) || (link.href === 'main/board' && pathname === '/') ? 'active' : ''}`}>
                        <img src={link.icon} alt="" />
                        <span>{link.label}</span>
                        </Link>
                    </li>
                ))
            }
           
          
        </ul>
        <button className="sidebar-logout-button orangebackcolor" onClick={() => setShowModal(true)} >
        <MdLogout />
            Deconnexion
        </button>
        {showModal && (
                <ConfirmationModal
                    onConfirm={handleLogout}
                    onCancel={() => setShowModal(false)} // Ferme le modal sans déconnexion
                />
            )}
    </nav>
  )
}

export default AppSidebar