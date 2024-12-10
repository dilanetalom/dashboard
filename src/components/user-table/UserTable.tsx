import React, { useEffect, useState } from 'react'
import { FaEdit, FaUser } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import UserSave from './UserSave';
import { deleteUser, getUsers, User } from './userservice';
import LoadingModal from '../LoadingModal';
import Userupdate from './Userupdate';
import { toast, ToastContainer } from 'react-toastify';
import ConfirmationModal from '../books-table/ConfirmModal';

const UserTable: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpens, setModalIsOpens] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User[]>([]);
    const [users, setUsers] = useState<User>();

    const update = (user:User)=>{
        setModalIsOpens(true)
         setUsers(user)
    }

    const getauthors = async () => {
        setLoading(true);
        try {
            const datas = await getUsers()
            setUser(datas)
            setLoading(false);
        } catch (error) {

        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        getauthors()
        
    }, [])

    const [selectuser, setSelectuser] = useState<User>();

    const change = (user:User)=>{
        setSelectuser(user)
        setIsConfirmModalOpen(true)
    }


    const handleDelete = async () => {
        if (selectuser) {
            console.log(selectuser);
            
          setLoading(true);
          try {
            const num = selectuser.id;
        const str = num.toString();
            await deleteUser(str);
            // Mettre à jour l'état ou recharger les auteurs si nécessaire
            toast.success('Livres supprimé avec succès !');
            setTimeout(() => {
               setIsConfirmModalOpen(false)
            }, 2000); 
          // Fermer le modal après soumission
            // Recharge la page après un délai pour que l'utilisateur puisse voir le message
            setTimeout(() => {
                window.location.reload();
            }, 1000);
          }catch (error) {
            toast.error('Une erreur s\'est produite lors de la suppression. Veuillez réessayer.');
        }
        }
      };


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
        <div className='p-10 flex flex-col gap-10'>
       <ToastContainer />
            <div className='w-full h-auto bg-white p-10 flex flex-col gap-5 rounded-md'>
                <p className='text-[19px] font-bold '> Information personnel</p>
                <div className='w-full flex justify-between items-end'>
                    <div className='flex flex-row gap-5 items-center'>
                        <div className='w-[120px] h-[120px] bg-gray-100 rounded-full flex items-center justify-center'>
                            <FaUser size={30}/>
                        </div>
                        <div>
                            <p> {parsedUser ? parsedUser.name : ''}</p>
                            <p> {parsedUser ? parsedUser.email : ''}</p>
                            <p> {parsedUser ? parsedUser.gender : ''}</p>
                            <p className='font-bold'> {parsedUser ? parsedUser.role : ''}</p>
                        </div>
                    </div>
                 
                <div className='w-full flex justify-center'>
                    <button className='font-bold orangebackcolor text-white p-[12px] rounded-[5px] w-[144px] h-[42px] text-[13px]' onClick={() => setModalIsOpen(true)}>Ajouter un admin</button>
                </div>
                
                </div>
            </div>

            <div className='w-full h-auto py-10 bg-white flex flex-col gap-5 rounded-md '>
                <p className='font-bold'>Utilisateurs</p>
                <table className="books-table w-full">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Role</th>
                            {/* <th>Date de creation</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    {loading && <LoadingModal />}
                    {!loading && user && (

                        <tbody>
                            {user.map((item) => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    {/* <td>{item.created_at}</td> */}

                                    <td className='flex gap-2'>
                                        <button className="text-white py-2 px-3 rounded-md bg-green-500" onClick={()=>change(item)} ><FaDeleteLeft /></button>
                                        <button className="text-white py-2 px-3 rounded-md bg-blue-500" onClick={()=>update(item)}><FaEdit /></button>
                                        {/* <button className="text-white py-2 px-3 rounded-md bg-black"

                                        ><FaEye /></button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}

                </table>
                <UserSave
                    isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
                <Userupdate
                    isOpen={modalIsOpens} onClose={() => setModalIsOpens(false)
                        
                    } 
                    user={users}
                    />
                       <ConfirmationModal
                      isOpen={isConfirmModalOpen}
                      onClose={() => setIsConfirmModalOpen(false)}
                      onConfirm={handleDelete}
                    />

            </div>

        </div>
    )
}

export default UserTable