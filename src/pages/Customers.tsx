
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardSidebar from '@/components/DashboardSidebar';
import TopCustomersChart from '@/components/TopCustomersChart';
import DashboardHeader from '@/components/DashboardHeader';
import CSVUpload from '@/components/CSVUpload';
import { useDashboard } from '@/context/DashboardContext';

const Customers = () => {
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
          <p className="text-muted-foreground">Loading customer data...</p>
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
                  showUpload && handleUploadClick();
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
              
              <div className="grid grid-cols-1 gap-6">
                <TopCustomersChart data={dashboardData} limit={10} />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer Name</TableHead>
                            <TableHead>Total Purchases</TableHead>
                            <TableHead>Total Spent</TableHead>
                            <TableHead>Satisfaction</TableHead>
                            <TableHead>Preferred Product</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dashboardData.topCustomers.map((customer, index) => (
                            <TableRow key={index}>
                              <TableCell>{customer.name}</TableCell>
                              <TableCell>{customer.purchases}</TableCell>
                              <TableCell>${customer.sales.toFixed(2)}</TableCell>
                              <TableCell>{customer.satisfaction ? `${(customer.satisfaction * 100).toFixed(0)}%` : 'N/A'}</TableCell>
                              <TableCell>{customer.preferredProduct || 'N/A'}</TableCell>
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

export default Customers;
