
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload, RefreshCcw } from 'lucide-react';
import { DashboardData } from '@/utils/types';

interface DashboardHeaderProps {
  onUploadClick: () => void;
  onReset: () => void;
  data: DashboardData | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  onUploadClick, 
  onReset,
  data
}) => {
  const handleExport = () => {
    if (!data) return;
    
    // Convert data to JSON and create downloadable link
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales_analytics_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Sales Analytics Dashboard</h1>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset}
          className="text-xs"
        >
          <RefreshCcw className="h-3.5 w-3.5 mr-1.5" />
          Reset
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onUploadClick}
          className="text-xs"
        >
          <Upload className="h-3.5 w-3.5 mr-1.5" />
          New CSV
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleExport}
          disabled={!data}
          className="text-xs"
        >
          <Download className="h-3.5 w-3.5 mr-1.5" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
