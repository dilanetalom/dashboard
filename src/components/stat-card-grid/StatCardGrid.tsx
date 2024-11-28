import StatCard from '../stat-card/StatCard';
import Money from '../../assets/icons_png/money.png';
import CartIcon from '../../assets/icons_png/cart.png';
import BookIcon from '../../assets/icons_png/book.png';
import WriterIcon from '../../assets/icons_png/writer.png';
import ReaderIcon from '../../assets/icons_png/reader.png';
import AgendaIcon from '../../assets/icons_png/agenda-star.png';
import NewsIcon from '../../assets/icons_png/news-icon.png';
import './stat-card-grid.css';

const StatCardGrid: React.FC = () => {
  const statsData = [
    {
      title: "Chiffre d’affaire",
      value: "1000 $",
      icon: Money,
      percentageChange: "+2.4%",
      description: "Augmentation élevée",
      isPositive: true,
      color: '#FF7300'
    },
    {
      title: "Nombre de ventes",
      value: "10",
      icon: "path/to/sales-icon.png",
      percentageChange: "-0.3%",
      description: "Faible élevé",
      isPositive: false,
      color: '#007F99'
    },
    {
      title: "Nombre de commandes",
      value: "100",
      icon: CartIcon,
      percentageChange: "+2.4%",
      description: "Augmentation élevée",
      isPositive: true,
      color: '#FF7300'
    },
    {
      title: "Nombre de livres",
      value: "300",
      icon: BookIcon,
      percentageChange: "+2.4%",
      description: "Augmentation élevée",
      isPositive: true,
      color: '#007F99'
    },
    {
      title: "Nombre d’auteurs",
      value: "150",
      icon: WriterIcon,
      percentageChange: "+2.4%",
      description: "Augmentation élevée",
      isPositive: true,
      color: '#FF7300'
    },
    {
      title: "Nombre de lecteurs",
      value: "150",
      icon: ReaderIcon,
      percentageChange: "+2.4%",
      description: "Augmentation élevée",
      isPositive: true,
      color: '#007F99'
    },
    {
      title: "Nombre d’agenda",
      value: "10",
      icon: AgendaIcon,
      percentageChange: "-0.3%",
      description: "Faible élevé",
      isPositive: false,
      color: '#FF7300'
    },
    {
      title: "Nombre d’actualité",
      value: "90",
      icon: NewsIcon,
      percentageChange: "+2.4%",
      description: "Augmentation élevée",
      isPositive: true,
      color: '#007F99'
    },
  ];

  return (
    <div className="stat-card-grid">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          percentageChange={stat.percentageChange}
          description={stat.description}
          isPositive={stat.isPositive}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatCardGrid;
