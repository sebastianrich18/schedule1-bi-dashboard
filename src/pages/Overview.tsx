
import React from 'react';
import CSVUpload from '@/components/CSVUpload';
import Dashboard from '@/components/Dashboard';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useDashboard } from '@/context/DashboardContext';

const Overview = () => {
  const { 
    dashboardData, 
    isLoading, 
    showUpload, 
    handleUploadClick, 
    handleReset, 
    handleDataProcessed
  } = useDashboard();

  if (isLoading) {
    return (
      <div className="dark flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark flex min-h-screen bg-background">
      {!showUpload && dashboardData && (
        <DashboardSidebar onUploadClick={handleUploadClick} />
      )}
      
      <div className="flex-1 flex items-center justify-center">
        {showUpload ? (
          <div className="w-full p-6">
            <CSVUpload 
              onDataProcessed={handleDataProcessed} 
              onCancel={() => {
                if (dashboardData) {
                  handleUploadClick();
                }
              }}
            />
          </div>
        ) : dashboardData ? (
          <div className="w-full h-full overflow-auto">
            <Dashboard 
              data={dashboardData} 
              onUploadClick={handleUploadClick}
              onReset={handleReset}
              isCustomData={true}
            />
          </div>
        ) : (
          <div className="text-center p-6">
            <p className="mb-4">No data available. Please upload a CSV file.</p>
            <CSVUpload onDataProcessed={handleDataProcessed} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
