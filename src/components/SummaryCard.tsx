
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Package, BarChart3, ThumbsUp } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: 'revenue' | 'customers' | 'products' | 'sales' | 'satisfaction';
  trend?: number;
  colorScheme?: 'purple' | 'blue' | 'green' | 'orange' | 'indigo';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  colorScheme = 'purple'
}) => {
  const getIcon = () => {
    const iconProps = {
      className: `h-5 w-5 ${getIconColorClass()}`,
      strokeWidth: 2
    };
    
    switch (icon) {
      case 'revenue':
        return <DollarSign {...iconProps} />;
      case 'customers':
        return <Users {...iconProps} />;
      case 'products':
        return <Package {...iconProps} />;
      case 'sales':
        return <BarChart3 {...iconProps} />;
      case 'satisfaction':
        return <ThumbsUp {...iconProps} />;
      default:
        return <BarChart3 {...iconProps} />;
    }
  };
  
  const getIconColorClass = () => {
    switch (colorScheme) {
      case 'purple':
        return 'text-dashboard-purple';
      case 'blue':
        return 'text-dashboard-blue';
      case 'green':
        return 'text-dashboard-green';
      case 'orange':
        return 'text-dashboard-orange';
      case 'indigo':
        return 'text-dashboard-indigo';
      default:
        return 'text-dashboard-purple';
    }
  };
  
  const getBgColorClass = () => {
    switch (colorScheme) {
      case 'purple':
        return 'bg-dashboard-purple/10';
      case 'blue':
        return 'bg-dashboard-blue/10';
      case 'green':
        return 'bg-dashboard-green/10';
      case 'orange':
        return 'bg-dashboard-orange/10';
      case 'indigo':
        return 'bg-dashboard-indigo/10';
      default:
        return 'bg-dashboard-purple/10';
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${getBgColorClass()}`}>
          {getIcon()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== undefined && (
          <p className={`text-xs ${trend >= 0 ? 'text-dashboard-green' : 'text-dashboard-red'}`}>
            {trend >= 0 ? '+' : ''}{trend}% from previous period
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
