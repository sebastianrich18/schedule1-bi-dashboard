
import { DashboardData, ParsedEvent } from '@/utils/types';
import { processDashboardData } from '@/utils/dataProcessor';
import { parseCSV } from '@/utils/csvParser';

// Ensure CSV data ends correctly without introducing JSON parsing issues
const sampleCSVData = `GameTime,RealTime,EventType,Payload
14:15:37,2025-04-13 14:15:37,COUNTER_OFFER,{"customer":"Jeff Gilmore","originalProductID":"fruitycrystal","originalProductType":"meth","originalQuantity":"3","originalPrice":"460.00","counterProductID":"fruitycrystal","counterProductType":"meth","counterQuantity":"5","counterPrice":"560.00","accepted":"True"}
14:15:39,2025-04-13 14:15:39,OFFER_ACCEPTED,{"customer":"Jeff Gilmore","productID":"fruitycrystal","productType":"meth","quantity":"5","price":"560.00","window":"LateNight","successChance":"-1.0000"}
14:16:09,2025-04-13 14:16:09,SALE,{"customer":"Jessi Waters","dealer":"Benji","handoverByPlayer":"False","payment":"680.00","satisfaction":"1.0000","quantityRequested":"8","quantityProvided":"4","itemIDs":"meth(8);","itemTypes":"meth;"}
14:16:09,2025-04-13 14:16:09,CUSTOMER_PREFERENCE,{"customer":"Jessi Waters","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:16:10,2025-04-13 14:16:10,SALE,{"customer":"Cranky Frank","dealer":"Jane","handoverByPlayer":"False","payment":"510.00","satisfaction":"1.0000","quantityRequested":"6","quantityProvided":"2","itemIDs":"meth(6);","itemTypes":"meth;"}
14:16:10,2025-04-13 14:16:10,CUSTOMER_PREFERENCE,{"customer":"Cranky Frank","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:16:19,2025-04-13 14:16:19,SALE,{"customer":"Keith Wagner","dealer":"Benji","handoverByPlayer":"False","payment":"255.00","satisfaction":"1.0000","quantityRequested":"3","quantityProvided":"3","itemIDs":"meth(3);","itemTypes":"meth;"}
14:16:19,2025-04-13 14:16:19,CUSTOMER_PREFERENCE,{"customer":"Keith Wagner","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:16:41,2025-04-13 14:16:41,SALE,{"customer":"George Greene","dealer":"Player","handoverByPlayer":"True","payment":"540.00","satisfaction":"1.0000","quantityRequested":"1","quantityProvided":"1","itemIDs":"fruitycrystal(1);","itemTypes":"meth;"}
14:16:41,2025-04-13 14:16:41,CUSTOMER_PREFERENCE,{"customer":"George Greene","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:17:05,2025-04-13 14:17:05,SALE,{"customer":"Kevin Oakley","dealer":"Brad","handoverByPlayer":"False","payment":"435.00","satisfaction":"1.0000","quantityRequested":"3","quantityProvided":"3","itemIDs":"fruitycrystal(3);","itemTypes":"meth;"}
14:17:05,2025-04-13 14:17:05,CUSTOMER_PREFERENCE,{"customer":"Kevin Oakley","currentAddiction":"0.9375","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:17:18,2025-04-13 14:17:18,SALE,{"customer":"Mick Lubbin","dealer":"Player","handoverByPlayer":"True","payment":"540.00","satisfaction":"1.0000","quantityRequested":"1","quantityProvided":"1","itemIDs":"fruitycrystal(1);","itemTypes":"meth;"}
14:17:18,2025-04-13 14:17:18,CUSTOMER_PREFERENCE,{"customer":"Mick Lubbin","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:17:31,2025-04-13 14:17:31,SALE,{"customer":"Austin Steiner","dealer":"Benji","handoverByPlayer":"False","payment":"425.00","satisfaction":"1.0000","quantityRequested":"5","quantityProvided":"1","itemIDs":"meth(5);","itemTypes":"meth;"}
14:17:31,2025-04-13 14:17:31,CUSTOMER_PREFERENCE,{"customer":"Austin Steiner","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:17:55,2025-04-13 14:17:55,SALE,{"customer":"Joyce Ball","dealer":"Benji","handoverByPlayer":"False","payment":"310.00","satisfaction":"1.0000","quantityRequested":"2","quantityProvided":"2","itemIDs":"fruitycrystal(2);","itemTypes":"meth;"}
14:17:55,2025-04-13 14:17:55,CUSTOMER_PREFERENCE,{"customer":"Joyce Ball","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:19:11,2025-04-13 14:19:11,SALE,{"customer":"Doris Lubbin","dealer":"Jane","handoverByPlayer":"False","payment":"269.50","satisfaction":"1.0000","quantityRequested":"3","quantityProvided":"3","itemIDs":"meth(3);","itemTypes":"meth;"}
14:19:11,2025-04-13 14:19:11,CUSTOMER_PREFERENCE,{"customer":"Doris Lubbin","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:19:44,2025-04-13 14:19:44,SALE,{"customer":"Louis Fourier","dealer":"Brad","handoverByPlayer":"False","payment":"478.50","satisfaction":"1.0000","quantityRequested":"3","quantityProvided":"3","itemIDs":"fruitycrystal(3);","itemTypes":"meth;"}
14:19:44,2025-04-13 14:19:44,CUSTOMER_PREFERENCE,{"customer":"Louis Fourier","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:19:58,2025-04-13 14:19:58,SALE,{"customer":"Kyle Cooley","dealer":"Benji","handoverByPlayer":"False","payment":"478.50","satisfaction":"1.0000","quantityRequested":"3","quantityProvided":"3","itemIDs":"fruitycrystal(3);","itemTypes":"meth;"}
14:19:58,2025-04-13 14:19:58,CUSTOMER_PREFERENCE,{"customer":"Kyle Cooley","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}
14:20:13,2025-04-13 14:20:13,SALE,{"customer":"Peter File","dealer":"Player","handoverByPlayer":"True","payment":"577.50","satisfaction":"1.0000","quantityRequested":"5","quantityProvided":"1","itemIDs":"meth(5);","itemTypes":"meth;"}
14:20:13,2025-04-13 14:20:13,CUSTOMER_PREFERENCE,{"customer":"Peter File","currentAddiction":"1.0000","highestAddiction":"0","mainDrugType":"meth","source":"Sale"}`

export const parseSampleData = async (): Promise<ParsedEvent[]> => {
  try {
    console.log("Parsing sample CSV data");
    // Modified to handle the sample data more carefully
    const parsedData = await parseCSV(sampleCSVData);
    console.log("Sample CSV parsed successfully, events:", parsedData.length);
    return parsedData;
  } catch (error) {
    console.error('Error parsing sample data:', error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const getSampleDashboardData = async (): Promise<DashboardData> => {
  try {
    console.log("Getting sample dashboard data");
    const parsedEvents = await parseSampleData();
    console.log("Processing sample events:", parsedEvents.length);
    const processedData = processDashboardData(parsedEvents);
    console.log("Sample data processed successfully");
    return processedData;
  } catch (error) {
    console.error("Error in getSampleDashboardData:", error);
    throw error; // Re-throw to be handled by the caller
  }
};
