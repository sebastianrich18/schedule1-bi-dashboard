
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DashboardData } from '@/utils/types';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(true);
  const [isCustomData, setIsCustomData] = useState<boolean>(true);
  const { toast } = useToast();

  const handleDataProcessed = (data: DashboardData) => {
    setDashboardData(data);
    setShowUpload(false);
    setIsCustomData(true);
    setIsLoading(false);
    
    toast({
      title: "Data Loaded Successfully",
      description: `Processed ${data.rawEvents.length} events.`
    });
  };

  const handleUploadClick = () => {
    setShowUpload(!showUpload);
  };

  const handleReset = () => {
    // Reset to empty state
    setDashboardData(null);
    setShowUpload(true);
    setIsCustomData(true);
    setIsLoading(false);
    
    toast({
      title: "Dashboard Reset",
      description: "Please upload a CSV file."
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
