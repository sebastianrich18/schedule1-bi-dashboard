
import { ParsedEvent, DashboardData, SaleEvent } from './types';

const extractSalesData = (events: ParsedEvent[]): SaleEvent[] => {
  return events
    .filter(event => event.eventType === 'SALE')
    .map(event => ({
      ...event.payload,
      payment: parseFloat(event.payload.payment),
      satisfaction: parseFloat(event.payload.satisfaction),
      quantityRequested: parseInt(event.payload.quantityRequested),
      quantityProvided: parseInt(event.payload.quantityProvided),
      realTime: event.realTime
    }));
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    month: 'short',
    day: 'numeric'
  });
};

const groupSalesByTimeInterval = (sales: SaleEvent[], intervalMinutes = 5) => {
  const groupedSales: Record<string, { sales: number, quantity: number }> = {};
  
  sales.forEach(sale => {
    // Round time to nearest interval
    const time = new Date(sale.realTime);
    time.setMinutes(Math.floor(time.getMinutes() / intervalMinutes) * intervalMinutes);
    time.setSeconds(0);
    time.setMilliseconds(0);
    
    const timeKey = formatDate(time);
    
    if (!groupedSales[timeKey]) {
      groupedSales[timeKey] = { sales: 0, quantity: 0 };
    }
    
    groupedSales[timeKey].sales += sale.payment;
    groupedSales[timeKey].quantity += sale.quantityProvided;
  });
  
  return Object.entries(groupedSales).map(([date, data]) => ({
    date,
    sales: parseFloat(data.sales.toFixed(2)),
    quantity: data.quantity
  }));
};

const getTopCustomers = (sales: SaleEvent[], limit = 10) => {
  const customerMap: Record<string, { 
    sales: number, 
    purchases: number, 
    satisfaction: number,
    preferredProducts: Record<string, number>
  }> = {};
  
  sales.forEach(sale => {
    if (!customerMap[sale.customer]) {
      customerMap[sale.customer] = { 
        sales: 0, 
        purchases: 0, 
        satisfaction: 0,
        preferredProducts: {}
      };
    }
    
    customerMap[sale.customer].sales += sale.payment;
    customerMap[sale.customer].purchases += 1;
    customerMap[sale.customer].satisfaction += sale.satisfaction;
    
    // Extract products from itemIDs
    const itemsStr = sale.itemIDs;
    const items = itemsStr.split(';').filter(Boolean);
    
    items.forEach(itemStr => {
      const match = itemStr.match(/(.+)\((\d+)\)/);
      if (match) {
        const [_, productName, quantity] = match;
        if (!customerMap[sale.customer].preferredProducts[productName]) {
          customerMap[sale.customer].preferredProducts[productName] = 0;
        }
        customerMap[sale.customer].preferredProducts[productName] += parseInt(quantity);
      }
    });
  });
  
  return Object.entries(customerMap)
    .map(([name, data]) => {
      // Find preferred product
      let preferredProduct = '';
      let maxQuantity = 0;
      
      Object.entries(data.preferredProducts).forEach(([product, quantity]) => {
        if (quantity > maxQuantity) {
          maxQuantity = quantity;
          preferredProduct = product;
        }
      });
      
      return {
        name,
        sales: parseFloat(data.sales.toFixed(2)),
        purchases: data.purchases,
        satisfaction: data.purchases > 0 ? parseFloat((data.satisfaction / data.purchases).toFixed(2)) : 0,
        preferredProduct: preferredProduct || 'N/A'
      };
    })
    .sort((a, b) => b.sales - a.sales)
    .slice(0, limit);
};

const getTopDealers = (sales: SaleEvent[], limit = 10) => {
  const dealerMap: Record<string, { 
    sales: number, 
    quantity: number, 
    customers: Set<string>
  }> = {};
  
  sales.forEach(sale => {
    if (!dealerMap[sale.dealer]) {
      dealerMap[sale.dealer] = { 
        sales: 0, 
        quantity: 0, 
        customers: new Set() 
      };
    }
    
    dealerMap[sale.dealer].sales += sale.payment;
    dealerMap[sale.dealer].quantity += sale.quantityProvided;
    dealerMap[sale.dealer].customers.add(sale.customer);
  });
  
  return Object.entries(dealerMap)
    .map(([name, data]) => ({
      name,
      sales: parseFloat(data.sales.toFixed(2)),
      quantity: data.quantity,
      customers: data.customers.size
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, limit);
};

const getTopProducts = (sales: SaleEvent[], limit = 10) => {
  const productMap: Record<string, { 
    sales: number, 
    quantity: number, 
    transactions: number,
    type: string
  }> = {};
  
  sales.forEach(sale => {
    // Parse the itemIDs string which looks like: "product(quantity);"
    const itemsStr = sale.itemIDs;
    const itemTypesStr = sale.itemTypes;
    const items = itemsStr.split(';').filter(Boolean);
    const types = itemTypesStr.split(';').filter(Boolean);
    
    items.forEach((itemStr, index) => {
      // Extract product name and quantity
      const match = itemStr.match(/(.+)\((\d+)\)/);
      if (match) {
        const [_, productName, quantity] = match;
        const qtyNum = parseInt(quantity);
        const productType = types[index] || 'unknown';
        
        if (!productMap[productName]) {
          productMap[productName] = { 
            sales: 0, 
            quantity: 0, 
            transactions: 0,
            type: productType
          };
        }
        
        // For simplicity, distribute the payment equally among items
        // This is an approximation since we don't have item-specific prices
        const itemPayment = sale.payment / items.length;
        
        productMap[productName].sales += itemPayment;
        productMap[productName].quantity += qtyNum;
        productMap[productName].transactions += 1;
      }
    });
  });
  
  return Object.entries(productMap)
    .map(([name, data]) => ({
      name,
      sales: parseFloat(data.sales.toFixed(2)),
      quantity: data.quantity,
      avgPrice: parseFloat((data.sales / data.quantity).toFixed(2)),
      type: data.type
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, limit);
};

const getEventDistribution = (events: ParsedEvent[]) => {
  const eventCounts: Record<string, number> = {};
  
  events.forEach(event => {
    if (!eventCounts[event.eventType]) {
      eventCounts[event.eventType] = 0;
    }
    
    eventCounts[event.eventType] += 1;
  });
  
  return Object.entries(eventCounts)
    .map(([name, value]) => ({
      name,
      value
    }))
    .sort((a, b) => b.value - a.value);
};

const getSummary = (sales: SaleEvent[], events: ParsedEvent[]) => {
  const customers = new Set<string>();
  const products = new Set<string>();
  let totalSatisfaction = 0;
  let totalRevenue = 0;
  
  sales.forEach(sale => {
    customers.add(sale.customer);
    
    const itemsStr = sale.itemIDs;
    const items = itemsStr.split(';').filter(Boolean);
    
    items.forEach(itemStr => {
      const match = itemStr.match(/(.+)\(\d+\)/);
      if (match) {
        products.add(match[1]);
      }
    });
    
    totalSatisfaction += sale.satisfaction;
    totalRevenue += sale.payment;
  });
  
  return {
    totalSales: sales.length,
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    avgSatisfaction: sales.length > 0 ? 
      parseFloat((totalSatisfaction / sales.length).toFixed(2)) : 0,
    totalCustomers: customers.size,
    totalProducts: products.size
  };
};

export const processDashboardData = (events: ParsedEvent[]): DashboardData => {
  const salesEvents = extractSalesData(events);
  
  const salesOverTime = groupSalesByTimeInterval(salesEvents);
  const topCustomers = getTopCustomers(salesEvents);
  const topDealers = getTopDealers(salesEvents);
  const topProducts = getTopProducts(salesEvents);
  const eventDistribution = getEventDistribution(events);
  const summary = getSummary(salesEvents, events);
  
  return {
    salesOverTime,
    topCustomers,
    topDealers,
    topProducts,
    eventDistribution,
    summary,
    rawEvents: events
  };
};
