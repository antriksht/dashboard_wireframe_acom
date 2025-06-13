export interface MetricData {
  title: string;
  value: string | number;
  change: {
    yoy: number;
    qoq: number;
    wow: number;
  };
  format: 'number' | 'percentage' | 'currency';
}

export interface FilterState {
  region: string[];
  country: string[];
  productType: string[];
  entitlementType: string[];
  segment: string[];
  surface: string[];
  weekQuarterYear: string[];
  quarterYear: string[];
  dateRange: {
    start: string;
    end: string;
  };
  channel: string[];
  device: string[];
  compareMode: boolean;
}

export interface ChartDataPoint {
  date: string;
  period: string;
  [key: string]: string | number;
}

export interface FunnelStep {
  name: string;
  value: number;
  percentage: number;
  dropOff?: number;
}

export interface FunnelData {
  [key: string]: {
    steps: FunnelStep[];
    trend: Array<{ period: string; rate: number }>;
  };
}

export interface BreakdownRow {
  name: string;
  orders: number;
  cvr: number;
  gnarr: number;
  trend: number[];
}

export interface AttachData {
  attachRate: number;
  topProducts: Array<{
    name: string;
    rate: number;
    revenue: number;
  }>;
  commonCombos: Array<{
    products: string[];
    frequency: number;
  }>;
  heatmapData: Array<{
    product1: string;
    product2: string;
    frequency: number;
  }>;
  trendData: Array<{
    period: string;
    rate: number;
  }>;
}

export interface TrendViewType {
  type: 'WoW' | 'QoQ';
  data: ChartDataPoint[];
}