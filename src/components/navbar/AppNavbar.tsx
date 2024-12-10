
import { useEffect, useState } from 'react';
import UserButton from '../user-button/UserButton';
import './navbar.css';
import { FaBell } from "react-icons/fa";


export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  role: string;
}

function AppNavbar() {
  const [parsedUser, setParsedUser] = useState<User|null>()


  useEffect(()=>{
    const user = localStorage.getItem('user'); // Récupérer l'utilisateur du localStorage

  if (user) { // Vérifiez que l'utilisateur n'est pas null
    setParsedUser(JSON.parse(user)); // Convertir la chaîne JSON en objet
  } else {
      console.log('Aucun utilisateur trouvé dans le localStorage.');
  }
  },[])


  return (
    <div className="navbar-container">
        <div className="welcome-user">
            Bienvenue {parsedUser ? parsedUser.name : ''} 👋
        </div>
        <div className="navbar-right-side">
        <FaBell />
        <UserButton/>
        </div>
    </div>
  )
}

export default AppNavbar