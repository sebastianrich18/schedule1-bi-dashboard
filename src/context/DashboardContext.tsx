
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DashboardData } from '@/utils/types';
import { getSampleDashboardData } from '@/data/sampleData';
import { useToast } from '@/components/ui/use-toast';

interface DashboardContextType {
  dashboardData: DashboardData | null;
  setDashboardData: React.Dispatch<React.SetStateAction<DashboardData | null>>;
  isLoading: boolean;
  isCustomData: boolean;
  setIsCustomData: React.Dispatch<React.SetStateAction<boolean>>;
  showUpload: boolean;
  setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
  handleUploadClick: () => void;
  handleReset: () => void;
  handleDataProcessed: (data: DashboardData) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [isCustomData, setIsCustomData] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load sample data on initial render
    const loadSampleData = async () => {
      try {
        console.log("Loading sample data...");
        const sampleData = await getSampleDashboardData();
        console.log("Sample data loaded successfully:", sampleData);
        setDashboardData(sampleData);
        setIsCustomData(false);
        
        toast({
          title: "Sample Data Loaded",
          description: "Viewing sample sales data. You can upload your own CSV file."
        });
      } catch (error) {
        console.error("Failed to load sample data:", error);
        setShowUpload(true);
        
        toast({
          variant: "destructive",
          title: "Error Loading Sample Data",
          description: "Failed to load sample data. Please upload your own CSV."
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading && !dashboardData) {
      loadSampleData();
    }
  }, [isLoading, toast, dashboardData]);

  const handleDataProcessed = (data: DashboardData) => {
    setDashboardData(data);
    setShowUpload(false);
    setIsCustomData(true);
    setIsLoading(false);
    
    toast({
      title: "Custom Data Loaded",
      description: `Processed ${data.rawEvents.length} events successfully.`
    });
  };

  const handleUploadClick = () => {
    setShowUpload(!showUpload);
  };

  const handleReset = () => {
    // Reset to sample data
    setIsLoading(true);
    setShowUpload(false);
    
    getSampleDashboardData()
      .then(sampleData => {
        setDashboardData(sampleData);
        setIsCustomData(false);
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
          variant: "destructive",
          title: "Error Resetting Data",
          description: "Failed to reset to sample data."
        });
      });
  };

  return (
    <DashboardContext.Provider 
      value={{ 
        dashboardData, 
        setDashboardData,
        isLoading,
        isCustomData,
        setIsCustomData,
        showUpload, 
        setShowUpload,
        handleUploadClick,
        handleReset,
        handleDataProcessed
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
