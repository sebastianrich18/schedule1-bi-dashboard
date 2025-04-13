
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import CSVUpload from '@/components/CSVUpload';
import TopDealersChart from '@/components/TopDealersChart';
import { useDashboard } from '@/context/DashboardContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const Dealers = () => {
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
          <p className="text-muted-foreground">Loading dealer data...</p>
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
            <div className="p-6 space-y-6 animate-fade-in">
              <DashboardHeader 
                onUploadClick={handleUploadClick} 
                onReset={handleReset}
                data={dashboardData}
                isCustomData={isCustomData}
              />
              
              {!isCustomData && (
                <Alert variant="default" className="bg-primary/10 border border-primary/20">
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>Sample Data Mode</AlertTitle>
                  <AlertDescription>
                    You are currently viewing sample data. Upload your own CSV file to see your custom data.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 gap-6">
                <TopDealersChart data={dashboardData} limit={10} />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Dealer Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Dealer Name</TableHead>
                            <TableHead>Total Sales ($)</TableHead>
                            <TableHead>Quantity Sold</TableHead>
                            <TableHead>Customers Served</TableHead>
                            <TableHead>Avg Sale Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dashboardData.topDealers.map((dealer, index) => (
                            <TableRow key={index}>
                              <TableCell>{dealer.name}</TableCell>
                              <TableCell>${dealer.sales.toFixed(2)}</TableCell>
                              <TableCell>{dealer.quantity}</TableCell>
                              <TableCell>{dealer.customers}</TableCell>
                              <TableCell>${(dealer.sales / dealer.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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

export default Dealers;
