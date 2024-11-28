import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const InvoiceStatistics: React.FC = () => {
  const data = {
    labels: ['Factures payées', 'Factures en attente', 'Factures en retard'],
    datasets: [
      {
        data: [20, 54, 24], // Replace with your actual data
        backgroundColor: ['#ff6600', '#007bff', '#cccccc'],
        hoverBackgroundColor: ['#ff8533', '#339aff', '#dddddd'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div style={{backgroundColor: 'white', height: '350px',display: 'flex', flexDirection: 'column', alignItems: 'start', width: 750}}>
      <h3>Statistique de la facture</h3>
      <div style={{backgroundColor: 'white', height: '350px',display: 'flex', alignItems: 'center', width: 750, justifyContent: 'space-evenly'}}>
      <Doughnut data={data} options={options}  width={750} height={350} />
      <div style={{ marginTop: '10px' }}>
        <ul style={{listStyle: 'none'}}>
          <li><span style={{ color: '#ff6600' }}>●</span> Factures payées: 20</li>
          <li><span style={{ color: '#007bff' }}>●</span> Factures en attente: 54</li>
          <li><span style={{ color: '#cccccc' }}>●</span> Factures en retard: 24</li>
        </ul>
      </div>
      </div>
      
    </div>
  );
};

export default InvoiceStatistics;
