
import React, { useState, useEffect } from 'react';
import CSVUpload from '@/components/CSVUpload';
import Dashboard from '@/components/Dashboard';
import DashboardSidebar from '@/components/DashboardSidebar';
import { DashboardData } from '@/utils/types';
import { getSampleDashboardData } from '@/data/sampleData';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load sample data on initial render
    const loadSampleData = async () => {
      try {
        const sampleData = await getSampleDashboardData();
        setDashboardData(sampleData);
        setIsLoading(false);
        
        toast({
          title: "Sample Data Loaded",
          description: "Viewing sample sales data. You can upload your own CSV file.",
        });
      } catch (error) {
        console.error("Failed to load sample data:", error);
        setIsLoading(false);
        setShowUpload(true);
        
        toast({
          title: "Error Loading Sample Data",
          description: "Failed to load sample data. Please upload your own CSV.",
          variant: "destructive"
        });
      }
    };

    loadSampleData();
  }, []);

  const handleDataProcessed = (data: DashboardData) => {
    setDashboardData(data);
    setShowUpload(false);
    
    toast({
      title: "Custom Data Loaded",
      description: `Processed ${data.rawEvents.length} events successfully.`
    });
  };

  const handleUploadClick = () => {
    setShowUpload(true);
  };

  const handleReset = () => {
    // Reset to sample data
    setIsLoading(true);
    getSampleDashboardData()
      .then(sampleData => {
        setDashboardData(sampleData);
        setShowUpload(false);
        setIsLoading(false);
        
        toast({
          title: "Reset to Sample Data",
          description: "Dashboard has been reset to sample data."
        });
      })
      .catch(error => {
        console.error("Failed to load sample data:", error);
        setIsLoading(false);
        
        toast({
          title: "Error Resetting Data",
          description: "Failed to reset to sample data.",
          variant: "destructive"
        });
      });
  };

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
                  setShowUpload(false);
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
