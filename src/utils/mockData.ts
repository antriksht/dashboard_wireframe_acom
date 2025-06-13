import { MetricData, ChartDataPoint, FunnelData, BreakdownRow, AttachData, TrendViewType } from '../types/analytics';

export const mockMetrics: MetricData[] = [
  {
    title: 'Total Visits',
    value: '50,00,000',
    change: { yoy: 12.4, qoq: 3.2, wow: -1.8 },
    format: 'number'
  },
  {
    title: 'Total Entries',
    value: '30,00,000',
    change: { yoy: 8.7, qoq: 1.4, wow: 0.3 },
    format: 'percentage'
  },
  {
    title: 'Web Orders',
    value: '30,000',
    change: { yoy: 15.6, qoq: 4.8, wow: 2.1 },
    format: 'currency'
  },
  {
    title: 'Net Orders',
    value: '25,000',
    change: { yoy: 2.8, qoq: -0.6, wow: 1.2 },
    format: 'currency'
  },
  {
    title: 'Converstion Rate (Web)',
    value: '10%',
    change: { yoy: 18.3, qoq: 6.2, wow: 1.9 },
    format: 'number'
  },
  {
    title: 'GNARR (Net)',
    value: '$400M',
    change: { yoy: 4.2, qoq: 1.1, wow: -0.4 },
    format: 'percentage'
  }
];

export const generateTrendData = (viewType: 'WoW' | 'QoQ', metrics: string[]): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const periods = viewType === 'WoW' ? 26 : 8; // 26 weeks or 8 quarters
  
  for (let i = 0; i < periods; i++) {
    let period: string;
    let date: string;
    
    if (viewType === 'WoW') {
      const weekStart = new Date('2024-07-01');
      weekStart.setDate(weekStart.getDate() + i * 7);
      period = `W${26 + i}-2025`;
      date = weekStart.toISOString().split('T')[0];
    } else {
      const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
      const years = [2023, 2023, 2024, 2024, 2024, 2024, 2025, 2025];
      period = `${quarters[i % 4]} ${years[i]}`;
      date = `${years[i]}-${(i % 4) * 3 + 1}-01`;
    }
    
    const point: ChartDataPoint = {
      date,
      period
    };
    
    metrics.forEach(metric => {
      let baseValue: number;
      
      switch (metric) {
        case 'Orders':
          baseValue = 450000 + Math.sin(i / 4) * 50000 + i * 2000;
          break;
        case 'CVR%':
          baseValue = 3.2 + Math.sin(i / 3) * 0.4 + (Math.random() - 0.5) * 0.2;
          break;
        case 'GNARR':
          baseValue = 140 + Math.sin(i / 5) * 20 + i * 1.5;
          break;
        case 'ARPU':
          baseValue = 295 + Math.sin(i / 6) * 15 + (Math.random() - 0.5) * 10;
          break;
        case 'Users':
          baseValue = 1.8 + Math.sin(i / 4) * 0.2 + i * 0.01;
          break;
        case 'Retention':
          baseValue = 84 + Math.sin(i / 7) * 3 + (Math.random() - 0.5) * 1;
          break;
        default:
          baseValue = Math.random() * 1000 + 500;
      }
      
      point[metric] = Math.round(baseValue * 100) / 100;
    });
    
    data.push(point);
  }
  
  return data;
};

export const mockFunnelData: FunnelData = {
  '3in1': {
    steps: [
      { name: 'Email', value: 1000000, percentage: 100 },
      { name: 'Payment', value: 450000, percentage: 45, dropOff: 55 },
      { name: 'Order Conf', value: 315000, percentage: 31.5, dropOff: 13.5 }
    ],
    trend: [
      { period: 'W20-Q2 2025', rate: 29.8 },
      { period: 'W21-Q2 2025', rate: 30.2 },
      { period: 'W22-Q2 2025', rate: 31.1 },
      { period: 'W23-Q2 2025', rate: 30.8 },
      { period: 'W24-Q2 2025', rate: 31.5 },
      { period: 'W25-Q2 2025', rate: 32.1 },
      { period: 'W26-Q2 2025', rate: 31.8 }
    ]
  },
  'TwP': {
    steps: [
      { name: 'Email', value: 850000, percentage: 100 },
      { name: 'Payment', value: 382500, percentage: 45, dropOff: 55 },
      { name: 'Order Conf', value: 263750, percentage: 31, dropOff: 14 }
    ],
    trend: [
      { period: 'W20-Q2 2025', rate: 29.2 },
      { period: 'W21-Q2 2025', rate: 29.8 },
      { period: 'W22-Q2 2025', rate: 30.4 },
      { period: 'W23-Q2 2025', rate: 30.1 },
      { period: 'W24-Q2 2025', rate: 31.0 },
      { period: 'W25-Q2 2025', rate: 30.7 },
      { period: 'W26-Q2 2025', rate: 31.2 }
    ]
  },
  'Commitment': {
    steps: [
      { name: 'Email', value: 650000, percentage: 100 },
      { name: 'Payment', value: 292500, percentage: 45, dropOff: 55 },
      { name: 'Order Conf', value: 201500, percentage: 31, dropOff: 14 }
    ],
    trend: [
      { period: 'W20-Q2 2025', rate: 28.9 },
      { period: 'W21-Q2 2025', rate: 29.5 },
      { period: 'W22-Q2 2025', rate: 30.2 },
      { period: 'W23-Q2 2025', rate: 29.8 },
      { period: 'W24-Q2 2025', rate: 30.6 },
      { period: 'W25-Q2 2025', rate: 31.0 },
      { period: 'W26-Q2 2025', rate: 30.4 }
    ]
  },
  'Recommendation': {
    steps: [
      { name: 'Email', value: 750000, percentage: 100 },
      { name: 'Payment', value: 337500, percentage: 45, dropOff: 55 },
      { name: 'Order Conf', value: 232500, percentage: 31, dropOff: 14 }
    ],
    trend: [
      { period: 'W20-Q2 2025', rate: 29.5 },
      { period: 'W21-Q2 2025', rate: 30.1 },
      { period: 'W22-Q2 2025', rate: 30.8 },
      { period: 'W23-Q2 2025', rate: 30.4 },
      { period: 'W24-Q2 2025', rate: 31.0 },
      { period: 'W25-Q2 2025', rate: 31.6 },
      { period: 'W26-Q2 2025', rate: 31.2 }
    ]
  }
};

export const mockBreakdownData: BreakdownRow[] = [
  {
    name: 'North America',
    orders: 1247832,
    cvr: 4.2,
    gnarr: 387.2,
    trend: [95, 108, 112, 106, 118, 125, 122, 134]
  },
  {
    name: 'Europe',
    orders: 987456,
    cvr: 3.8,
    gnarr: 298.7,
    trend: [88, 92, 98, 102, 97, 105, 110, 108]
  },
  {
    name: 'Asia Pacific',
    orders: 612005,
    cvr: 2.9,
    gnarr: 161.3,
    trend: [76, 82, 79, 85, 91, 88, 94, 97]
  }
];

export const mockAttachData: AttachData = {
  attachRate: 68.4,
  topProducts: [
    { name: 'Acrobat Pro', rate: 34.2, revenue: 147.8 },
    { name: 'Creative Cloud All Apps', rate: 28.7, revenue: 298.4 },
    { name: 'Photoshop', rate: 23.1, revenue: 89.2 },
    { name: 'Illustrator', rate: 19.8, revenue: 76.5 },
    { name: 'InDesign', rate: 15.4, revenue: 52.1 }
  ],
  commonCombos: [
    { products: ['Creative Cloud', 'Acrobat Pro'], frequency: 42.3 },
    { products: ['Photoshop', 'Lightroom'], frequency: 38.7 },
    { products: ['Illustrator', 'InDesign'], frequency: 31.2 }
  ],
  heatmapData: [
    { product1: 'Creative Cloud', product2: 'Acrobat Pro', frequency: 42.3 },
    { product1: 'Creative Cloud', product2: 'Stock', frequency: 28.7 },
    { product1: 'Photoshop', product2: 'Lightroom', frequency: 38.7 },
    { product1: 'Illustrator', product2: 'InDesign', frequency: 31.2 },
    { product1: 'Premiere Pro', product2: 'After Effects', frequency: 25.8 },
    { product1: 'Acrobat Pro', product2: 'Sign', frequency: 22.4 }
  ],
  trendData: [
    { period: 'W20-Q2 2025', rate: 66.2 },
    { period: 'W21-Q2 2025', rate: 67.1 },
    { period: 'W22-Q2 2025', rate: 67.8 },
    { period: 'W23-Q2 2025', rate: 68.4 },
    { period: 'W24-Q2 2025', rate: 69.1 },
    { period: 'W25-Q2 2025', rate: 68.7 },
    { period: 'W26-Q2 2025', rate: 69.3 }
  ]
};

// Generate date filter options
export const generateDateFilters = () => {
  const currentYear = 2025;
  const startYear = currentYear - 3; // Last 4 years
  
  const weekQuarterYearOptions: string[] = [];
  const quarterYearOptions: string[] = [];
  
  // Generate Quarter-Year options
  for (let year = startYear; year <= currentYear; year++) {
    for (let quarter = 1; quarter <= 4; quarter++) {
      quarterYearOptions.push(`Q${quarter} ${year}`);
    }
  }
  
  // Generate Week-Quarter-Year options (last 26 weeks for current quarter)
  for (let week = 1; week <= 26; week++) {
    weekQuarterYearOptions.push(`W${week}-Q2 2025`);
  }
  
  return {
    weekQuarterYear: weekQuarterYearOptions,
    quarterYear: quarterYearOptions
  };
};

export const filterOptions = {
  regions: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'],
  countries: ['United States', 'Canada', 'Germany', 'France', 'United Kingdom', 'Japan', 'Australia'],
  productTypes: ['Creative Cloud', 'Document Cloud', 'Experience Cloud', 'Commerce'],
  entitlementTypes: ['Free', 'Paid', 'Lapsed', 'Trial'],
  loggedInStatus: ['Logged In', 'Not Logged In'],
  surface: ['a.com', 'AH', 'CCD', 'HelpX'],
  subsurface: ['AH Home', 'AH apps 2.0', 'CCD Home', 'CCD Apps 2.0', 'a.com catalog', 'a.com plans', 'a.com product', 'a.com cc overview'],
  entrypage: ['3in1', 'TwP', 'Commitment', 'Recommendation'],
  purchasetype: ['D2P', 'TwP'],
  segments: ['Individual (IND)', 'B2B Admin', 'Delegate', 'Team', 'Enterprise'],
  surfaces: ['Web', 'Desktop', 'Mobile'],
  channels: ['Direct', 'Retail', 'Partner', 'App Store'],
  devices: ['Desktop', 'Mobile'],
  marketingchannel: ['Search Paid', 'Organic', 'Social', 'Email', 'Display'],
  ...generateDateFilters()
};