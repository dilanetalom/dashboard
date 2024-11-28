import './stat-card.css';

interface StatCardProps {
  title: string;
  value: string;
  icon?: string; // URL or path for an icon image
  percentageChange: string;
  description: string;
  isPositive?: boolean; // Determines if percentageChange is positive or negative
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  percentageChange,
  description,
  isPositive = true,
  color
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-card-bar" style={{backgroundColor: color}}></div>
        <div className="stat-card-title-and-value">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-value">{value}</span>
        </div>
        {icon && 
        <div style={{width: 40 , height:40 , backgroundColor: `${color}40`, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={icon} alt="icon" className="stat-card-icon" />
        </div>
        }
      </div>
      <div className={`stat-card-footer ${isPositive ? 'positive' : 'negative'}`}>
        <span className="stat-card-percentage">{percentageChange}</span>
        <span className="stat-card-description">{description}</span>
      </div>
    </div>
  );
};

export default StatCard;
