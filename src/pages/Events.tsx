
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardSidebar from '@/components/DashboardSidebar';
import EventTypeDistribution from '@/components/EventTypeDistribution';
import DashboardHeader from '@/components/DashboardHeader';
import CSVUpload from '@/components/CSVUpload';
import { useDashboard } from '@/context/DashboardContext';

const Events = () => {
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
          <p className="text-muted-foreground">Loading event data...</p>
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
                <EventTypeDistribution data={dashboardData} />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Game Time</TableHead>
                            <TableHead>Real Time</TableHead>
                            <TableHead>Event Type</TableHead>
                            <TableHead>Details</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dashboardData.rawEvents.slice(0, 20).map((event, index) => (
                            <TableRow key={index}>
                              <TableCell>{event.gameTime}</TableCell>
                              <TableCell>{event.realTime.toLocaleString()}</TableCell>
                              <TableCell>
                                <span className="rounded-md px-2 py-1 text-xs font-medium bg-primary/20 text-primary">
                                  {event.eventType}
                                </span>
                              </TableCell>
                              <TableCell className="max-w-xs truncate">
                                {typeof event.payload === 'object' 
                                  ? JSON.stringify(event.payload).substring(0, 50) + '...'
                                  : String(event.payload).substring(0, 50) + '...'}
                              </TableCell>
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

export default Events;
