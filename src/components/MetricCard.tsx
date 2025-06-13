import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { MetricData } from '../types/analytics';

interface MetricCardProps {
  metric: MetricData;
  showAsPercentage?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  metric, 
  showAsPercentage = false 
}) => {
  const formatChange = (value: number) => {
    if (showAsPercentage) {
      return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
    }
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getChangeColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-500';
  };

  const getChangeIcon = (value: number) => {
    return value >= 0 ? TrendingUp : TrendingDown;
  };

  return (
    <Card hover className="h-full">
      <CardContent className="py-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {metric.title}
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {metric.value}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">YoY</span>
              <span className={`font-medium ${getChangeColor(metric.change.yoy)}`}>
                {formatChange(metric.change.yoy)}
              </span>
              {React.createElement(getChangeIcon(metric.change.yoy), {
                className: `w-3 h-3 ${getChangeColor(metric.change.yoy)}`
              })}
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">QoQ</span>
              <span className={`font-medium ${getChangeColor(metric.change.qoq)}`}>
                {formatChange(metric.change.qoq)}
              </span>
              {React.createElement(getChangeIcon(metric.change.qoq), {
                className: `w-3 h-3 ${getChangeColor(metric.change.qoq)}`
              })}
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">WoW</span>
              <span className={`font-medium ${getChangeColor(metric.change.wow)}`}>
                {formatChange(metric.change.wow)}
              </span>
              {React.createElement(getChangeIcon(metric.change.wow), {
                className: `w-3 h-3 ${getChangeColor(metric.change.wow)}`
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};