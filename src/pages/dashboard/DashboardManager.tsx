import RecentInvoices from "../../components/recent-invoices/RecentInvoices";
import StatCardGrid from "../../components/stat-card-grid/StatCardGrid"
import StatisticsAndSales from "../../components/statistics-and-sales/StatisticsAndSales";
import './dashboard-manager.css';

function DashboardManager() {
  return (
    <div className="dasboard-manager-container">
      <StatCardGrid/>
      <StatisticsAndSales/>
      <RecentInvoices/>
    </div>
  )
}

export default DashboardManager