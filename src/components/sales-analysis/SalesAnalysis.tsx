import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SalesAnalysis: React.FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Ventes',
        data: [2, 4, 6, 5, 9, 8, 7, 6, 10, 8, 7, 5], // Replace with your actual data
        borderColor: '#ff6600',
        backgroundColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: function (value: string | number) {
            return `${value}%`; // Add a percentage symbol
          },
        },
      },
    },
  };

  return (
    <div style={{backgroundColor: 'white', height: '300px',display: 'flex', flexDirection: 'column', gap: 25 }}>
      <h3>Analyse des ventes</h3>
      <Line data={data} options={options} height={250}  width={550}/>
    </div>
  );
};

export default SalesAnalysis;
