import React from 'react';
import './recent-invoices.css';

const RecentInvoices: React.FC = () => {
  const invoices = [
    {
      id: 1,
      name: 'Defo Mouofo Franck Zidane',
      date: '21/03/2024 08:21',
      status: 'Payées',
      amount: '59 $',
    },
    {
      id: 2,
      name: 'Defo Mouofo Franck Zidane',
      date: '21/03/2024 08:21',
      status: 'Payées',
      amount: '59 $',
    },
  ];

  return (
    <div className="recent-invoices-container">
      <div className="recent-invoices-header">
        <h3>Facture récente</h3>
        <div className="recent-invoices-actions">
          <button className="filter-button">Filter</button>
          <button className="more-button">...</button>
        </div>
      </div>
      <table className="recent-invoices-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nom</th>
            <th>Date</th>
            <th>Status</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.name}</td>
              <td>{invoice.date}</td>
              <td>
                <span className="status-badge">{invoice.status}</span>
              </td>
              <td>{invoice.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentInvoices;
