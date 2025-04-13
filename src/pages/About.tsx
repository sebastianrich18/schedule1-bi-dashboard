
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Github, Globe, BookOpen, SendHorizonal, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="dark flex min-h-screen bg-background">
      <DashboardSidebar onUploadClick={() => {}} />
      
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">About Sales Analytics Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics Dashboard</CardTitle>
              <CardDescription>Version 1.0</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Sales Analytics Dashboard is a powerful tool designed to visualize and analyze sales data for businesses.
                Upload your CSV data to get detailed insights on sales performance, customer behavior, product popularity, and more.
              </p>
              
              <p>
                Built with modern technologies including React, TypeScript, Tailwind CSS, and Recharts,
                this dashboard provides a seamless experience for sales data analysis.
              </p>
              
              <div className="pt-4">
                <h3 className="font-medium text-lg mb-2">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Comprehensive sales overview with key metrics</li>
                  <li>Detailed customer and dealer insights</li>
                  <li>Product performance analysis</li>
                  <li>Sales event tracking and timeline</li>
                  <li>CSV data import and export</li>
                  <li>Responsive design for all devices</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
              <Button variant="outline" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub Repository
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
              <CardDescription>Getting started with the dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">1. Loading Data</h3>
                <p className="text-sm text-muted-foreground">
                  The dashboard comes pre-loaded with sample data. To use your own data,
                  click the "Upload CSV" button in the sidebar or header.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">2. Navigating Sections</h3>
                <p className="text-sm text-muted-foreground">
                  Use the sidebar menu to navigate between different sections:
                  Overview, Customers, Products, Dealers, and Events.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">3. Interacting with Charts</h3>
                <p className="text-sm text-muted-foreground">
                  Hover over charts to see detailed information. Click on legend items to show/hide data series.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">4. Exporting Data</h3>
                <p className="text-sm text-muted-foreground">
                  Use the Export button in the header to download your data in JSON format.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Documentation
              </Button>
              <Button variant="outline" size="sm">
                <SendHorizonal className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Sales Analytics Dashboard. All rights reserved.</p>
          <div className="flex items-center justify-center mt-2 gap-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>using React, TypeScript, Tailwind CSS, and Recharts.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
