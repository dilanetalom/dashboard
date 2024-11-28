import React from 'react';
import InvoiceStatistics from '../invoice-statistics/InvoiceStatistics';
import SalesAnalysis from '../sales-analysis/SalesAnalysis';


const StatisticsAndSales: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Left Section: Invoice Statistics */}
      <div style={styles.box}>
        <InvoiceStatistics />
      </div>
      
      {/* Right Section: Sales Analysis */}
      <div style={styles.box}>
        <SalesAnalysis />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '95%',
    gap: '20px',
    height: '400px',
  },
  box: {
    flex: 1,
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    height: 400,
  },
};

export default StatisticsAndSales;
