export interface FeeItem {
  service: string;
  fee: string;
  description: string;
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
