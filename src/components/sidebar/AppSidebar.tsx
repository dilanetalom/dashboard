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
import ReportIcon from '../../assets/icons_png/report.png';
import SettingsIcon from '../../assets/icons_png/settings.png';
import { MdLogout } from "react-icons/md";



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
        label: "Gestion des commandes/ventes",
        icon: CartIcon,
        currentRoute: false,
        href: "orders"
    },
    {
        id: 5,
        label: "Gestion des agendas",
        icon: AgendaIcon,
        currentRoute: false,
        href: "agendas"
    },
    {
        id: 6,
        label: "Gestion des lecteurs",
        icon: ReaderIcon,
        currentRoute: false,
        href: "readers"
    },
    {
        id: 7,
        label: "Gestion des contenus",
        icon: ContentIcon,
        currentRoute: false,
        href: "content"
    },
    {
        id: 8,
        label: "Reports et analytiques",
        icon: ReportIcon,
        currentRoute: false,
        href: "analytics"
    },
    {
        id: 9,
        label: "Parametres",
        icon: SettingsIcon,
        currentRoute: false,
        href: "settings"
    },
    
]

function AppSidebar() {
    const {pathname} = useLocation();

 
  
  return (
    <nav className='sidebar-container'>
        <div className="logo">
            <img src={AppLogo} alt="logo finex" />
        </div>
        <ul className="sidebar-items">
            {
                linkItems.map((link) => (
                    <li className="sidebar-item" key={link.id}>
                        <Link to={link.href} className={`sidebar-item-link ${pathname.startsWith(link.href) || (link.href === '/board' && pathname === '/') ? 'active' : ''}`}>
                        <img src={link.icon} alt="" />
                        <span>{link.label}</span>
                        </Link>
                    </li>
                ))
            }
           
          
        </ul>
        <button className="sidebar-logout-button">
        <MdLogout />
            Deconnexion
        </button>
    </nav>
  )
}

export default AppSidebar