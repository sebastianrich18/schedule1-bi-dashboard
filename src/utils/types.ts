
export interface CSVData {
  GameTime: string;
  RealTime: string;
  EventType: string;
  Payload: string;
}

export interface ParsedEvent {
  gameTime: string;
  realTime: Date;
  eventType: string;
  payload: any;
  // Adding original properties for Events.tsx
  GameTime: string;
  RealTime: string;
  EventType: string;
  Payload: string;
}

export interface SaleEvent {
  customer: string;
  dealer: string;
  handoverByPlayer: boolean;
  payment: number;
  satisfaction: number;
  quantityRequested: number;
  quantityProvided: number;
  itemIDs: string;
  itemTypes: string;
  realTime: Date;
}

export interface OfferEvent {
  customer: string;
  productID: string;
  productType: string;
  quantity: string;
  price: string;
  window: string;
  successChance: string;
  realTime: Date;
}

export interface OfferChanceEvent {
  customer: string;
  items: string;
  itemTypes: string;
  askingPrice: string;
  totalQuantity: string;
  successChance: string;
  realTime: Date;
}

export interface CounterOfferEvent {
  customer: string;
  originalProductID: string;
  originalProductType: string;
  originalQuantity: string;
  originalPrice: string;
  counterProductID: string;
  counterProductType: string;
  counterQuantity: string;
  counterPrice: string;
  accepted: string;
  realTime: Date;
}

export interface CustomerPreferenceEvent {
  customer: string;
  currentAddiction: string;
  highestAddiction: string;
  mainDrugType: string;
  source: string;
  realTime: Date;
}

export interface DashboardData {
  salesOverTime: {
    date: string;
    sales: number;
    quantity: number;
  }[];
  topCustomers: {
    name: string;
    sales: number;
    purchases: number;
    satisfaction?: number;
    preferredProduct?: string;
  }[];
  topDealers: {
    name: string;
    sales: number;
    quantity: number;
    customers: number;
  }[];
  topProducts: {
    name: string;
    sales: number;
    quantity: number;
    avgPrice: number;
    type?: string;
  }[];
  eventDistribution: {
    name: string;
    value: number;
  }[];
  summary: {
    totalSales: number;
    totalRevenue: number;
    avgSatisfaction: number;
    totalCustomers: number;
    totalProducts: number;
  };
  rawEvents: ParsedEvent[];
}
