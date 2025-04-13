
import Papa from 'papaparse';
import { CSVData, ParsedEvent } from './types';

// Parse CSV string content
export const parseCSV = (csvContent: string): Promise<ParsedEvent[]> => {
  return new Promise((resolve, reject) => {
    try {
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const parsedData = results.data as Record<string, string>[];
            
            // Transform the data to match our ParsedEvent type
            const events: ParsedEvent[] = parsedData.map(row => {
              // Ensure the row has all the required fields
              if (!row.GameTime || !row.RealTime || !row.EventType || !row.Payload) {
                console.error("Invalid row format:", row);
                throw new Error("CSV format is invalid. Required columns: GameTime, RealTime, EventType, Payload");
              }
              
              // Parse the JSON payload more safely with error handling
              let parsedPayload;
              try {
                parsedPayload = JSON.parse(row.Payload);
              } catch (err) {
                console.error("Error parsing payload JSON:", row.Payload);
                console.error("JSON parse error:", err);
                // Provide a fallback object instead of breaking the entire process
                parsedPayload = { error: "Failed to parse", raw: row.Payload };
              }
              
              // Create a properly formatted ParsedEvent
              const event: ParsedEvent = {
                // Original CSV fields
                GameTime: row.GameTime,
                RealTime: row.RealTime,
                EventType: row.EventType, 
                Payload: row.Payload,
                
                // Parsed fields
                gameTime: row.GameTime,
                realTime: new Date(row.RealTime),
                eventType: row.EventType,
                payload: parsedPayload
              };
              
              return event;
            });
            
            resolve(events);
          } catch (err) {
            console.error("Error processing CSV data:", err);
            reject(err);
          }
        },
        error: (error) => {
          console.error("CSV parsing error:", error);
          reject(error);
        }
      });
    } catch (err) {
      console.error("Unexpected error during CSV parsing:", err);
      reject(err);
    }
  });
};

// Parse CSV file
export const parseCSVFile = (file: File): Promise<ParsedEvent[]> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const csvContent = e.target?.result as string;
          const events = await parseCSV(csvContent);
          resolve(events);
        } catch (err) {
          console.error("Error processing CSV file:", err);
          reject(err);
        }
      };
      
      reader.onerror = (e) => {
        console.error("Error reading file:", e);
        reject(new Error("Failed to read the CSV file"));
      };
      
      reader.readAsText(file);
    } catch (err) {
      console.error("Unexpected error while reading file:", err);
      reject(err);
    }
  });
};

// Process raw CSV data
export const processRawCSVData = (csvContent: string): Promise<ParsedEvent[]> => {
  return parseCSV(csvContent);
};
