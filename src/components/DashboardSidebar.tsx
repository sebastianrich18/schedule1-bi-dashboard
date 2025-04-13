
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  UserCheck,
  PieChart,
  Upload,
  Settings,
  Info
} from 'lucide-react';

interface DashboardSidebarProps {
  onUploadClick: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onUploadClick }) => {
  return (
    <div className="w-64 border-r bg-sidebar h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BarChart3 className="h-5 w-5" /> 
          <span>Analytics</span>
        </h2>
      </div>
      
      {/* Menu */}
      <div className="flex-1 py-4">
        <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground">
          INSIGHTS
        </div>
        <div className="space-y-1 px-2">
          <Button variant="ghost" className="w-full justify-start">
            <BarChart3 className="mr-2 h-4 w-4" />
            Sales Overview
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Customers
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Products
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <UserCheck className="mr-2 h-4 w-4" />
            Dealers
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <PieChart className="mr-2 h-4 w-4" />
            Events
          </Button>
        </div>
        
        <div className="mt-6 px-3 mb-2 text-xs font-semibold text-muted-foreground">
          ACTIONS
        </div>
        <div className="space-y-1 px-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={onUploadClick}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Info className="mr-2 h-4 w-4" />
            About
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t text-xs text-center text-muted-foreground">
        Sales Analytics Dashboard v1.0
      </div>
    </div>
  );
};

export default DashboardSidebar;
