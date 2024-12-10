import { useEffect, useState } from "react";

import './dashboard-manager.css';
import axios from "axios";


interface DashboardData {
  authors_count: number;
  books_count: number;
  news_count: number;
  event_count: number;
}
function DashboardManager() {

  const [data, setData] = useState<DashboardData | null>(null);

  const API_URL = 'http://127.0.0.1:8000/api';


    const token =  localStorage.getItem('authToken'); // Assurez-vous que le token est bien stocké dans localStorage


 const getBooks = async () => {
        try {
            const response = await axios.get(`${API_URL}/count`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },});
            setData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des livres:', error);
            throw error;
        }
    };

    useEffect(()=>{
        getBooks()     
        
    },[])


  return (
    <div className="dasboard-manager-container p-10">
      {/* <StatCardGrid/>
      <StatisticsAndSales/>
      <RecentInvoices/> */}

     <div className="grid grid-cols-3 gap-10">
     <div className="w-80 h-auto bg-white shadow-md rounded-md p-5">
             <div className="h-1/2 w-full border-l-4 border-[#FF7300] flex justify-between">
             <div className="pl-4">
                   <p>Nombre d'auteur</p>
                   <p className="font-bold">{data ? data.authors_count : 0}</p>
             </div>
             <div className="h-14 w-14 rounded-full bg-yellow-100 opacity-50"></div>
             </div>
             <div className="h-1/2 w-full"></div>
      </div>
      <div className="w-80 h-auto bg-white shadow-md rounded-md p-5">
             <div className="h-1/2 w-full border-l-4 border-[#FF7300] flex justify-between">
             <div className="pl-4">
                   <p>Nombre de livres</p>
                   <p className="font-bold">{data ?data.books_count:0}</p>
             </div>
             <div className="h-14 w-14 rounded-full bg-yellow-100 opacity-50"></div>
             </div>
             <div className="h-1/2 w-full"></div>
      </div>
      <div className="w-80 h-auto bg-white shadow-md rounded-md p-5">
             <div className="h-1/2 w-full border-l-4 border-[#FF7300] flex justify-between">
             <div className="pl-4">
                   <p>Nombre d'actualité</p>
                   <p className="font-bold">{data ?data.news_count:0}</p>
             </div>
             <div className="h-14 w-14 rounded-full bg-yellow-100 opacity-50"></div>
             </div>
             <div className="h-1/2 w-full"></div>
      </div>
      <div className="w-80 h-auto bg-white shadow-md rounded-md p-5">
             <div className="h-1/2 w-full border-l-4 border-[#FF7300] flex justify-between">
             <div className="pl-4">
                   <p>Nombre d'evenement</p>
                   <p className="font-bold">{data ?data.event_count:0}</p>
             </div>
             <div className="h-14 w-14 rounded-full bg-yellow-100 opacity-50"></div>
             </div>
             <div className="h-1/2 w-full"></div>
      </div>
     </div>

    </div>
  )
}

export default DashboardManager