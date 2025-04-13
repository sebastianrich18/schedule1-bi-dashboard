
import Papa from 'papaparse';
import { CSVData, ParsedEvent } from './types';

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
              
              // Parse the JSON payload
              const parsedPayload = JSON.parse(row.Payload);
              
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
