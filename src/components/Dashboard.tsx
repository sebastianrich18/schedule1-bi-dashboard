
import React from 'react';
import { DashboardData } from '@/utils/types';
import SummaryCard from './SummaryCard';
import SalesOverTimeChart from './SalesOverTimeChart';
import TopCustomersChart from './TopCustomersChart';
import TopDealersChart from './TopDealersChart';
import TopProductsChart from './TopProductsChart';
import EventTypeDistribution from './EventTypeDistribution';
import DashboardHeader from './DashboardHeader';

interface DashboardProps {
  data: DashboardData;
  onUploadClick: () => void;
  onReset: () => void;
  isCustomData?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  data, 
  onUploadClick, 
  onReset,
  isCustomData = false
}) => {
  const { summary } = data;
  
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <DashboardHeader 
        onUploadClick={onUploadClick} 
        onReset={onReset}
        data={data}
        isCustomData={isCustomData}
      />
      
      {!isCustomData && (
        <div className="bg-primary/10 p-3 rounded-md mb-4 border border-primary/20">
          <p className="text-sm text-muted-foreground">
            Currently viewing sample data. Upload your own CSV file to see your custom data.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <SummaryCard
          title="Total Revenue"
          value={`$${summary.totalRevenue}`}
          icon="revenue"
          colorScheme="purple"
        />
        <SummaryCard
          title="Total Sales"
          value={summary.totalSales}
          icon="sales"
          colorScheme="blue"
        />
        <SummaryCard
          title="Customer Satisfaction"
          value={`${(summary.avgSatisfaction * 100).toFixed(0)}%`}
          icon="satisfaction"
          colorScheme="green"
        />
        <SummaryCard
          title="Total Customers"
          value={summary.totalCustomers}
          icon="customers"
          colorScheme="orange"
        />
        <SummaryCard
          title="Total Products"
          value={summary.totalProducts}
          icon="products"
          colorScheme="indigo"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesOverTimeChart data={data} />
        <TopCustomersChart data={data} limit={5} />
        <TopDealersChart data={data} limit={5} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopProductsChart data={data} />
        <EventTypeDistribution data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
