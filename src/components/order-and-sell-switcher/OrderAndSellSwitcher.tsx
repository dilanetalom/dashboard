import React, { useState } from 'react';
import './switcher.css';

const OrderAndSellSwitcher: React.FC = () => {
  // Tab state: "Vente" for Sell and "Commande" for Order
  const [activeTab, setActiveTab] = useState<'Vente' | 'Commande'>('Vente');

  // Simulated data for sales and orders
  const salesData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    date: '12/09/2024',
    bookName: 'Mesopotamia',
    author: 'Gael Faye',
    quantity: '01',
    priceUnit: '23.00 $',
    total: '23.00 $',
    paymentMode: 'Paypal',
    location: 'Douala',
    status: 'Terminé',
  }));

  const ordersData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    date: '12/03/2024',
    clientName: 'Defo Franck',
    deliveryAddress: 'Ange Raphael',
    bookOrdered: 'Mesopotamia',
    quantityTotal: '20',
    totalAmount: '150$',
    paymentStatus: 'En attente',
    orderStatus: 'En préparation',
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get the active data based on the current tab
  const activeData = activeTab === 'Vente' ? salesData : ordersData;

  // Pagination logic
  const totalPages = Math.ceil(activeData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = activeData.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleTabClick = (tab: 'Vente' | 'Commande') => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to the first page when switching tabs
  };

  return (
    <div className="order-sell-container">
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
          />
          <button className="search-button">🔍</button>
        </div>
        <button className="filter-button">Filter</button>
      </div>


      {/* Content */}
      {activeTab === 'Vente' && (
        <div className="sell-table" style={{display: 'flex', flexDirection: 'column', gap: 20}}>
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
            <tbody>
              {currentItems.map((sale) => (
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
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Commande' && (
        <div className="order-table" style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <h3>Commande</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Nom du client</th>
                <th>Adresse livraison</th>
                <th>Livres commandés</th>
                <th>Quantité T</th>
                <th>Montant T</th>
                <th>Statut paie</th>
                <th>Statut comm</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>{order.clientName}</td>
                  <td>{order.deliveryAddress}</td>
                  <td>{order.bookOrdered}</td>
                  <td>{order.quantityTotal}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    <span className="payment-status-badge">{order.paymentStatus}</span>
                  </td>
                  <td>
                    <span className="order-status-badge">{order.orderStatus}</span>
                  </td>
                  <td>
                    <button className="delete-button">Supprimer</button>
                    <button className="edit-button">Modifier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        {/* Pagination Controls */}
        <div className="pagination">
        <button
          className="pagination-button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Add Button */}
      <button className="add-button">
        Ajouter une {activeTab === 'Vente' ? 'vente' : 'commande'}
      </button>
    </div>
  );
};

export default OrderAndSellSwitcher;
