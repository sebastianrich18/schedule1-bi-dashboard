
import { CSVData, ParsedEvent } from './types';

export const parseCSV = (csvText: string): CSVData[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  const result: CSVData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i];
    
    // Find the position of the first three commas (for GameTime, RealTime, EventType)
    let commaCount = 0;
    let lastCommaPos = -1;
    for (let j = 0; j < currentLine.length; j++) {
      if (currentLine[j] === ',') {
        commaCount++;
        lastCommaPos = j;
        if (commaCount >= 3) break;
      }
    }
    
    if (commaCount < 3 || lastCommaPos === -1) continue;
    
    // Split the line into four parts: GameTime, RealTime, EventType, and Payload
    const gameTime = currentLine.substring(0, currentLine.indexOf(','));
    const remaining = currentLine.substring(currentLine.indexOf(',') + 1);
    const realTime = remaining.substring(0, remaining.indexOf(','));
    const remaining2 = remaining.substring(remaining.indexOf(',') + 1);
    const eventType = remaining2.substring(0, remaining2.indexOf(','));
    const payload = remaining2.substring(remaining2.indexOf(',') + 1);
    
    // Create the CSVData object
    const csvDataObj: CSVData = {
      GameTime: gameTime,
      RealTime: realTime,
      EventType: eventType,
      Payload: payload
    };
    
    result.push(csvDataObj);
  }
  
  return result;
};

export const processRawCSVData = (data: CSVData[]): ParsedEvent[] => {
  return data.map(item => {
    // Try to parse the JSON payload
    let parsedPayload: any = {};
    try {
      // The JSON might have escaped quotes that need to be handled
      const cleanPayload = item.Payload.trim();
      
      // Check if the payload is already valid JSON or needs further cleaning
      if (cleanPayload.startsWith('{') && cleanPayload.endsWith('}')) {
        parsedPayload = JSON.parse(cleanPayload);
      } else {
        // Handle differently formatted payloads if needed
        console.log('Non-standard payload format:', cleanPayload);
      }
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

// New function to parse a CSV string directly
export const parseCSVString = (csvString: string): Promise<ParsedEvent[]> => {
  return new Promise((resolve, reject) => {
    try {
      const parsedCSV = parseCSV(csvString);
      const processedData = processRawCSVData(parsedCSV);
      resolve(processedData);
    } catch (error) {
      reject(error);
    }
  });
};
