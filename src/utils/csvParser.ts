
import { CSVData, ParsedEvent } from './types';

export const parseCSV = (csvText: string): CSVData[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  const result: CSVData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i];
    
    // Match all fields but handle quoted values correctly (especially for the JSON payload)
    const regex = /(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))/g;
    const matches: string[] = [];
    
    let match;
    while ((match = regex.exec(currentLine)) !== null) {
      // match[1] is for quoted fields, match[2] is for unquoted
      matches.push(match[1] !== undefined ? match[1].replace(/""/g, '"') : match[2]);
    }
    
    if (matches.length >= headers.length) {
      // Create a record with the expected CSVData properties
      const csvDataObj: CSVData = {
        GameTime: '',
        RealTime: '',
        EventType: '',
        Payload: ''
      };
      
      // Assign values to the object based on the headers
      headers.forEach((header, index) => {
        // Only assign known properties from the CSVData type
        if (header in csvDataObj) {
          (csvDataObj as any)[header] = matches[index];
        }
      });
      
      result.push(csvDataObj);
    }
  }
  
  return result;
};

export const processRawCSVData = (data: CSVData[]): ParsedEvent[] => {
  return data.map(item => {
    // Try to parse the JSON payload
    let parsedPayload: any = {};
    try {
      // The payload seems to be JSON string but with escaped quotes
      const cleanPayload = item.Payload.replace(/\\"/g, '"');
      parsedPayload = JSON.parse(cleanPayload);
    } catch (error) {
      console.error('Failed to parse payload:', item.Payload, error);
    }
    
    return {
      gameTime: item.GameTime,
      realTime: new Date(item.RealTime),
      eventType: item.EventType,
      payload: parsedPayload
    };
  });
};

export const parseCSVFile = (file: File): Promise<ParsedEvent[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        const parsedCSV = parseCSV(csvText);
        const processedData = processRawCSVData(parsedCSV);
        resolve(processedData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};
