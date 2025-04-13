
import React, { useState } from 'react';
import CSVUpload from '@/components/CSVUpload';
import Dashboard from '@/components/Dashboard';
import DashboardSidebar from '@/components/DashboardSidebar';
import { DashboardData } from '@/utils/types';

const Index = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [showUpload, setShowUpload] = useState(true);

  const handleDataProcessed = (data: DashboardData) => {
    setDashboardData(data);
    setShowUpload(false);
  };

  const handleUploadClick = () => {
    setShowUpload(true);
  };

  const handleReset = () => {
    setDashboardData(null);
    setShowUpload(true);
  };

  return (
    <div className="dark flex min-h-screen bg-background">
      {!showUpload && dashboardData && (
        <DashboardSidebar onUploadClick={handleUploadClick} />
      )}
      
      <div className="flex-1 flex items-center justify-center">
        {showUpload ? (
          <div className="w-full p-6">
            <CSVUpload onDataProcessed={handleDataProcessed} />
          </div>
        ) : dashboardData ? (
          <div className="w-full h-full overflow-auto">
            <Dashboard 
              data={dashboardData} 
              onUploadClick={handleUploadClick}
              onReset={handleReset}
            />
          </div>
        ) : (
          <div className="text-center">
            <p>No data available. Please upload a CSV file.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
