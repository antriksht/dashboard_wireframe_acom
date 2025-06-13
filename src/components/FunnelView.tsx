import React from 'react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Select } from './ui/Select';
import { mockFunnelData } from '../utils/mockData';

export const FunnelView: React.FC = () => {
  const [selectedFunnel, setSelectedFunnel] = React.useState('3in1');
  
  const funnelOptions = ['3in1', 'TwP', 'Commitment', 'Recommendation'];
  const currentFunnel = mockFunnelData[selectedFunnel];

  const renderFunnelChart = () => {
    return (
      <div className="space-y-4">
        {currentFunnel.steps.map((step, index) => (
          <div key={step.name} className="relative">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{step.name}</h4>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="font-medium text-gray-900">
                      {step.value.toLocaleString()}
                    </span>
                    <span className="text-gray-500">
                      {step.percentage.toFixed(1)}%
                    </span>
                    {step.dropOff && (
                      <span className="text-red-500 text-xs font-medium">
                        -{step.dropOff.toFixed(1)}% drop
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-gray-900 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${step.percentage}%` }}
                    >
                      <span className="text-white text-xs font-medium">
                        {step.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {index < currentFunnel.steps.length - 1 && (
              <div className="ml-4 mt-2 mb-2">
                <div className="w-0.5 h-4 bg-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTrendChart = () => {
    const maxRate = Math.max(...currentFunnel.trend.map(t => t.rate));
    const minRate = Math.min(...currentFunnel.trend.map(t => t.rate));
    
    return (
      <div className="h-48 bg-gray-50 rounded-lg p-4">
        <div className="h-full relative">
          <svg width="100%" height="100%" className="overflow-visible">
            <path
              d={currentFunnel.trend.reduce((path, point, index) => {
                const x = (index / (currentFunnel.trend.length - 1)) * 100;
                const y = 100 - ((point.rate - minRate) / (maxRate - minRate)) * 80;
                const command = index === 0 ? 'M' : 'L';
                return `${path} ${command} ${x}% ${y}%`;
              }, '')}
              fill="none"
              stroke="#3BA55D"
              strokeWidth="3"
              className="transition-all duration-300"
            />
            {currentFunnel.trend.map((point, index) => (
              <circle
                key={index}
                cx={`${(index / (currentFunnel.trend.length - 1)) * 100}%`}
                cy={`${100 - ((point.rate - minRate) / (maxRate - minRate)) * 80}%`}
                r="4"
                fill="#3BA55D"
                className="hover:r-6 transition-all duration-200 cursor-pointer"
              >
                <title>{`${point.period}: ${point.rate.toFixed(1)}%`}</title>
              </circle>
            ))}
          </svg>
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            {currentFunnel.trend.map((point, index) => (
              <span key={index} className="transform -rotate-45 origin-left">
                {point.period}
              </span>
            ))}
          </div>
          
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
            <span>{maxRate.toFixed(1)}%</span>
            <span>{((maxRate + minRate) / 2).toFixed(1)}%</span>
            <span>{minRate.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Funnel Analysis</h3>
            <Select
              value={selectedFunnel}
              onChange={setSelectedFunnel}
              options={funnelOptions}
              className="w-48"
            />
          </div>
        </CardHeader>
        
        <CardContent>
          {renderFunnelChart()}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h4 className="font-semibold text-gray-900">Conversion Trend</h4>
            <p className="text-sm text-gray-500">
              Final conversion rate over time for {selectedFunnel}
            </p>
          </CardHeader>
          <CardContent>
            {renderTrendChart()}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h4 className="font-semibold text-gray-900">Funnel Metrics</h4>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Entries</span>
                <span className="font-medium text-gray-900">
                  {currentFunnel.steps[0]?.value.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Final Conversions</span>
                <span className="font-medium text-gray-900">
                  {currentFunnel.steps[currentFunnel.steps.length - 1]?.value.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Overall Conversion Rate</span>
                <span className="font-medium text-green-600">
                  {currentFunnel.steps[currentFunnel.steps.length - 1]?.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Biggest Drop-off</span>
                <span className="font-medium text-red-500">
                  {Math.max(...currentFunnel.steps.filter(s => s.dropOff).map(s => s.dropOff!)).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};