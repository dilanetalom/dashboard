import React, { useEffect, useState } from 'react';
import './switcher.css';
import AddSaleModal, { Book } from './AddSaleModal';
import { getBooks } from '../books-table/bookService';
import { deleteOrder, getOrders, Order } from './Orderservice';
import LoadingModal from '../LoadingModal';
import { FaDeleteLeft } from 'react-icons/fa6';
import { FaEdit, FaEye } from 'react-icons/fa';
import OrderDetailModal from './OrderDetailModal';
import UpdateSaleModal from './Orderupdate';
import { toast, ToastContainer } from 'react-toastify';
import ConfirmationModal from '../books-table/ConfirmModal';

const OrderAndSellSwitcher: React.FC = () => {
  // Tab state: "Vente" for Sell and "Commande" for Order
  const [activeTab, setActiveTab] = useState<'Vente' | 'Commande'>('Vente');


  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      const data = await getOrders();
      setOrdersData(data);
      setLoading(true);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchOrder();
  }, []);




  const handleTabClick = (tab: 'Vente' | 'Commande') => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to the first page when switching tabs
  };



  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [book, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
      // setLoading(true);
    } catch (error) {

    } finally {
      // setLoading(false);
    }
  };


  useEffect(() => {
    fetchBooks();
  }, []);



  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Filtrer les auteurs en fonction du terme de recherche
  const filteredAuthors = ordersData.filter(author =>
    author.sale_date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculer l'index des éléments à afficher
  const indexOfLastAuthor = currentPage * itemsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - itemsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  // Changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Nombre total de pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredAuthors.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  const [isModalOpens, setIsModalOpens] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpens(true);
  };

  const handleCloseModal = () => {
    setIsModalOpens(false);
    setSelectedOrder(null);
  };


  const [isModalOpense, setIsModalOpense] = useState(false);
  const [selectedOrdere, setSelectedOrdere] = useState<Order | null>(null);

  const handleOpenModale = (order: Order) => {
    setSelectedOrdere(order);
    setIsModalOpense(true);
  };

  const handleCloseModale = () => {
    setIsModalOpense(false);
    setSelectedOrdere(null);
  };



  const [readerdel, setReaderdel] = useState<Order>();
  const [showModalts, setShowModalts] = useState<boolean>(false);


  const handleDeletes = (oder: Order) => {
    setShowModalts(true)
    setReaderdel(oder)

  };

  const handleDelete = async () => {
    if (readerdel) {
      setLoading(true);
      try {
        const num = readerdel.id;
        const str = num.toString();
        await deleteOrder(str)
        toast.success('lecteur supprimé avec succès !');
        setTimeout(() => {
          setLoading(false)
        }, 2000);
        // Fermer le modal après soumission
        // Recharge la page après un délai pour que l'utilisateur puisse voir le message
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast.error('Une erreur s\'est produite lors de la suppression. Veuillez réessayer.');
      }
    }
  };




  return (
    <div className="order-sell-container">
       <ToastContainer />
      <AddSaleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} books={book} />
      <OrderDetailModal
        isOpen={isModalOpens}
        onClose={handleCloseModal}
        order={selectedOrder}
      />

      <UpdateSaleModal
        isOpen={isModalOpense}
        onClose={handleCloseModale}
        books={book}
        existingSale={selectedOrdere}
      />

      <ConfirmationModal
        isOpen={showModalts}
        onClose={() => setShowModalts(false)}
        onConfirm={handleDelete}
      />
      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'Vente' ? 'active' : ''}`}
          onClick={() => handleTabClick('Vente')}
        >
          Vente
        </button>
        <button
          className={`tab-button ${activeTab === 'Commande' ? 'active' : ''}`}
          onClick={() => handleTabClick('Commande')}
        >
          Commande
        </button>
      </div>
      <div className="books-search-filter">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Recherche un livre"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">🔍</button>
        </div>
        {/* <button className="filter-button">Filter</button> */}
        {/* <button className="add-button" onClick={() => setIsModalOpen(true)}>
        Ajouter une {activeTab === 'Vente' ? 'vente' : 'commande'}
      </button> */}
        <button onClick={() => setIsModalOpen(true)} className='px-3 py-2 orangebackcolor text-white rounded-md'>
          Ajouter une {activeTab === 'Vente' ? 'vente' : 'commande'}
        </button>
      </div>


      {/* Content */}
      {activeTab === 'Vente' && (
        <div className="sell-table" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h3>Vente</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Nom du livre</th>
                <th>Auteur</th>
                <th>Qté</th>
                <th>Prix U</th>
                <th>Total</th>
                <th>Mode paiement</th>
                <th>Localisation</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            {loading && <LoadingModal />}
            {!loading && ordersData && (
              <tbody>
                {/* {ordersData.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.date}</td>
                  <td>{sale.bookName}</td>
                  <td>{sale.author}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.priceUnit}</td>
                  <td>{sale.total}</td>
                  <td>{sale.paymentMode}</td>
                  <td>{sale.location}</td>
                  <td>
                    <span className="status-badge">{sale.status}</span>
                  </td>
                  <td>
                    <button className="delete-button">Supprimer</button>
                    <button className="edit-button">Modifier</button>
                  </td>
                </tr>
              ))} */}
              </tbody>
            )}
          </table>
        </div>
      )}

      {activeTab === 'Commande' && (
        <div className="order-table" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h3>Commande</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                {/* <th>Nom du client</th> */}
                {/* <th>Adresse livraison</th> */}
                <th>Livres commandés</th>
                <th>Quantité T</th>
                <th>Montant T</th>
                <th>Mode de paie</th>
                <th>Statut</th>
                {/* <th>Statut comm</th> */}
                <th>Action</th>
              </tr>
            </thead>
            {loading && <LoadingModal />}
            {!loading && ordersData && (
              <tbody>
                {currentAuthors.map((order) => (
                  <tr key={order.id}>
                    <td>{order.sale_date}</td>
                    <td>{order.book.title}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total_price}</td>
                    <td>
                      <span className="payment-status-badge">{order.paiement_type}</span>
                    </td>
                    <td>
                      <span className={`${order.status === 'encours'?'payment-status-badge':"bg-black text-white font-bold p-2 rounded-full"}`}>{order.status}</span>
                    </td>
                    <td className='flex gap-3'>
                      <button className="text-white py-2 px-3 rounded-md bg-green-500" onClick={() => handleDeletes(order)}><FaDeleteLeft /></button>

                      <button className="text-white py-2 px-3 rounded-md bg-blue-500" onClick={() => handleOpenModale(order)}><FaEdit /></button>

                      <button className="text-white py-2 px-3 rounded-md bg-black" onClick={() => handleOpenModal(order)}><FaEye /></button>

                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      )}
      {/* Pagination Controls */}
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className={`pagination-button ${currentPage === number ? 'active' : ''}`}>
            {number}
          </button>
        ))}
      </div>

      {/* Add Button */}

    </div>
  );
};

export default OrderAndSellSwitcher;
