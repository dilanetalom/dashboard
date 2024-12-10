import { useEffect, useState } from 'react';
import './user-button.css'
import { User } from '../navbar/AppNavbar';

function UserButton() {
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
    <div className="user-button-container">
        <div>
        <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="" />
        </div>
       
        <p className="user-name">{parsedUser ? parsedUser.name : ''} </p>
    </div>
  )
}

export default UserButton