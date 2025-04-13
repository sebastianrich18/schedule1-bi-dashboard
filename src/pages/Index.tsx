
import React from 'react';
import CSVUpload from '@/components/CSVUpload';
import Dashboard from '@/components/Dashboard';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useDashboard } from '@/context/DashboardContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const Index = () => {
  const { 
    dashboardData, 
    isLoading, 
    showUpload, 
    handleUploadClick, 
    handleReset, 
    handleDataProcessed,
    isCustomData
  } = useDashboard();

  if (isLoading) {
    return (
      <div className="dark flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading sample data...</p>
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
            {!isCustomData && (
              <div className="p-4 bg-primary/10 mx-4 mt-4 rounded-md border border-primary/20">
                <div className="flex items-center space-x-2">
                  <InfoIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Viewing Sample Data</h3>
                </div>
                <p className="text-sm mt-1">
                  This is example data. Upload your own CSV file to see your custom data.
                </p>
                <button 
                  onClick={handleUploadClick}
                  className="mt-2 px-4 py-2 bg-primary text-white rounded-md text-sm"
                >
                  Upload CSV
                </button>
              </div>
            )}
            <Dashboard 
              data={dashboardData} 
              onUploadClick={handleUploadClick}
              onReset={handleReset}
              isCustomData={isCustomData}
            />
          </div>
        ) : (
          <div className="text-center">
            <p>No data available. Please upload a CSV file.</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
              onClick={handleUploadClick}
            >
              Upload CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
