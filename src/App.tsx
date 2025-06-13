import React from 'react';
import { Button } from './components/ui/Button';
import { MetricCard } from './components/MetricCard';
import { FilterPanel } from './components/FilterPanel';
import TrendChart from './components/TrendChart';
import { BreakdownTable } from './components/BreakdownTable';
import { FunnelView } from './components/FunnelView';
import { AttachesView } from './components/AttachesView';
import { AdvancedDrilldown } from './components/AdvancedDrilldown';
import { 
  mockMetrics, 
  mockBreakdownData, 
  mockAttachData 
} from './utils/mockData';
import { FilterState } from './types/analytics';

function App() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [showAsPercentage, setShowAsPercentage] = React.useState(false);
  const [selectedMetrics, setSelectedMetrics] = React.useState(['Orders', 'CVR%', 'GNARR']);
  const [filters, setFilters] = React.useState<FilterState>({
    region: [],
    country: [],
    productType: [],
    entitlementType: [],
    segment: [],
    surface: [],
    weekQuarterYear: ['W26-Q2 2025'], // Default to current week
    quarterYear: ['Q2 2025'], // Default to current quarter
    dateRange: { start: '', end: '' },
    channel: [],
    device: [],
    compareMode: false
  });

  const availableMetrics = ['Orders', 'CVR%', 'GNARR', 'ARPU', 'Users', 'Retention'];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'funnel', label: 'Funnel' },
    { id: 'attaches', label: 'Attaches' },
    { id: 'advanced', label: 'Advanced Drilldown' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Hero Metrics */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Key Metrics</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMetrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  metric={metric}
                  showAsPercentage={showAsPercentage}
                />
              ))}
            </div>

            {/* Trend Chart */}
            <TrendChart
              selectedMetrics={selectedMetrics}
              onMetricsChange={setSelectedMetrics}
              availableMetrics={availableMetrics}
            />

            {/* Breakdown Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BreakdownTable
                data={mockBreakdownData}
                title="Geographic Breakdown"
              />
              <BreakdownTable
                data={mockBreakdownData.map(row => ({
                  ...row,
                  name: row.name.replace('North America', 'Individual').replace('Europe', 'B2B Admin').replace('Asia Pacific', 'Enterprise')
                }))}
                title="Segment Breakdown"
              />
            </div>
          </div>
        );
      
      case 'funnel':
        return <FunnelView />;
      
      case 'attaches':
        return <AttachesView data={mockAttachData} />;
      
      case 'advanced':
        return <AdvancedDrilldown />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
            </div>
            
            <nav className="flex space-x-1">
              {tabs.map(tab => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-2"
                >
                  {tab.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <FilterPanel filters={filters} onFiltersChange={setFilters} />
        
        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;
