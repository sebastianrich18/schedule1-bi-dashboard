
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { parseCSVFile } from '@/utils/csvParser';
import { processDashboardData } from '@/utils/dataProcessor';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileText, AlertCircle, X, Info } from 'lucide-react';

interface CSVUploadProps {
  onDataProcessed: (data: any) => void;
  onCancel?: () => void;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onDataProcessed, onCancel }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const processFile = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setFileName(file.name);
    setError(null);

    try {
      const parsedData = await parseCSVFile(file);
      
      if (parsedData.length === 0) {
        throw new Error("No valid data found in CSV file");
      }
      
      const dashboardData = processDashboardData(parsedData);
      
      toast({
        title: "CSV Uploaded Successfully",
        description: `Processed ${parsedData.length} events`
      });
      
      onDataProcessed(dashboardData);
    } catch (error) {
      console.error("Error processing CSV:", error);
      setError(error instanceof Error ? error.message : "Unknown error processing CSV");
      
      toast({
        title: "Error Processing CSV",
        description: "There was an error processing your file. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      processFile(files[0]);
    }
  }, []);

  return (
    <Card className="w-full md:max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-center text-2xl">Upload CSV Data</CardTitle>
            <CardDescription className="text-center">
              Upload your sales CSV data to generate insights
            </CardDescription>
          </div>
          
          {onCancel && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCancel} 
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors
            ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'}`}
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
              <p className="text-muted-foreground">Processing {fileName}...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <h3 className="text-lg font-medium mb-2 text-destructive">Error Processing File</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">{error}</p>
              <Button variant="outline" onClick={() => setError(null)}>
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Drag & Drop CSV File</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                or click to select a file from your computer
              </p>
              
              <div className="mt-2">
                <Button variant="outline" asChild className="cursor-pointer">
                  <label>
                    <input 
                      type="file" 
                      accept=".csv" 
                      className="hidden" 
                      onChange={handleFileInput}
                    />
                    <FileText className="mr-2 h-4 w-4" /> Select CSV File
                  </label>
                </Button>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <AlertCircle className="h-3 w-3" />
                  <span>The CSV must have GameTime, RealTime, EventType, and Payload columns</span>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-md flex gap-2 text-xs">
                  <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Looking for your game data file?</p>
                    <p className="mt-1">It's typically located at:</p>
                    <pre className="bg-background/50 p-2 rounded mt-1 text-xs overflow-auto">
                      C:\Users\{"{USER}"}\AppData\LocalLow\TVGS\Schedule I\BusinessIntelligence\business_intelligence_data.csv
                    </pre>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Your data is processed locally and never leaves your browser
      </CardFooter>
    </Card>
  );
};

export default CSVUpload;
