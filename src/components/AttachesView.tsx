import React from 'react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { AttachData } from '../types/analytics';
import { Package, Link } from 'lucide-react';

interface AttachesViewProps {
  data: AttachData;
}

export const AttachesView: React.FC<AttachesViewProps> = ({ data }) => {
  const renderHeatmap = () => {
    const products = Array.from(new Set([
      ...data.heatmapData.map(d => d.product1),
      ...data.heatmapData.map(d => d.product2)
    ]));

    const maxFrequency = Math.max(...data.heatmapData.map(d => d.frequency));

    return (
      <div className="p-4">
        <div className="grid gap-1" style={{ gridTemplateColumns: `120px repeat(${products.length}, 1fr)` }}>
          <div></div>
          {products.map(product => (
            <div key={product} className="text-xs font-medium text-gray-600 p-2 text-center transform -rotate-45 origin-left">
              {product.split(' ')[0]}
            </div>
          ))}
          
          {products.map(product1 => (
            <React.Fragment key={product1}>
              <div className="text-xs font-medium text-gray-600 p-2 text-right">
                {product1.split(' ')[0]}
              </div>
              {products.map(product2 => {
                const dataPoint = data.heatmapData.find(
                  d => (d.product1 === product1 && d.product2 === product2) ||
                       (d.product1 === product2 && d.product2 === product1)
                );
                const frequency = dataPoint?.frequency || 0;
                const intensity = frequency / maxFrequency;
                
                return (
                  <div
                    key={`${product1}-${product2}`}
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-medium cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: product1 === product2 
                        ? '#f3f4f6' 
                        : `rgba(59, 165, 93, ${intensity})`,
                      color: intensity > 0.5 ? 'white' : '#374151'
                    }}
                    title={product1 === product2 ? '' : `${product1} + ${product2}: ${frequency.toFixed(1)}%`}
                  >
                    {product1 !== product2 && frequency > 0 ? frequency.toFixed(0) : ''}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderTrendChart = () => {
    const maxRate = Math.max(...data.trendData.map(t => t.rate));
    const minRate = Math.min(...data.trendData.map(t => t.rate));
    
    return (
      <div className="h-48 bg-gray-50 rounded-lg p-4">
        <div className="h-full relative">
          <svg width="100%" height="100%" className="overflow-visible">
            <path
              d={data.trendData.reduce((path, point, index) => {
                const x = (index / (data.trendData.length - 1)) * 100;
                const y = 100 - ((point.rate - minRate) / (maxRate - minRate)) * 80;
                const command = index === 0 ? 'M' : 'L';
                return `${path} ${command} ${x}% ${y}%`;
              }, '')}
              fill="none"
              stroke="#3BA55D"
              strokeWidth="3"
              className="transition-all duration-300"
            />
            {data.trendData.map((point, index) => (
              <circle
                key={index}
                cx={`${(index / (data.trendData.length - 1)) * 100}%`}
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
            {data.trendData.map((point, index) => (
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Link className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">Attach Rate</p>
                <p className="text-3xl font-bold text-gray-900">{data.attachRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Package className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">Top Products</p>
                <p className="text-3xl font-bold text-gray-900">{data.topProducts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Package className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">Common Combos</p>
                <p className="text-3xl font-bold text-gray-900">{data.commonCombos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Product Attach Heatmap</h3>
            <p className="text-sm text-gray-500">Frequency of product combinations (%)</p>
          </CardHeader>
          <CardContent>
            {renderHeatmap()}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Top Add-on Products</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.rate}% attach rate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${product.revenue}M</p>
                    <p className="text-sm text-gray-500">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Attach Rate Trend</h3>
          <p className="text-sm text-gray-500">Overall attach rate percentage over time</p>
        </CardHeader>
        <CardContent>
          {renderTrendChart()}
        </CardContent>
      </Card>
    </div>
  );
};