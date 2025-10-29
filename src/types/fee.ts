export interface FeeItem {
  Service: string;
  Fee: string;
  Description: string;
}

export interface FeeCategory {
  [key: string]: FeeItem[];
}

export interface FeeData {
  Customer: FeeCategory;
  Business: FeeCategory;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
}
