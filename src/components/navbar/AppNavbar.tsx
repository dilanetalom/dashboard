import UserButton from '../user-button/UserButton';
import './navbar.css';
import { FaBell } from "react-icons/fa";

function AppNavbar() {
  return (
    <div className="navbar-container">
        <div className="welcome-user">
            Bienvenue Armel 👋
        </div>
        <div className="navbar-right-side">
        <FaBell />
        <UserButton/>
        </div>
    </div>
  )
}

export default AppNavbar