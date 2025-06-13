import React from 'react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowUpDown, TrendingUp } from 'lucide-react';
import { BreakdownRow } from '../types/analytics';

interface BreakdownTableProps {
  data: BreakdownRow[];
  title: string;
}

export const BreakdownTable: React.FC<BreakdownTableProps> = ({
  data,
  title
}) => {
  const [sortField, setSortField] = React.useState<keyof BreakdownRow>('orders');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof BreakdownRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return sortDirection === 'asc' 
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const renderSparkline = (trend: number[]) => (
    <div className="flex items-center space-x-1">
      {trend.map((value, index) => (
        <div
          key={index}
          className="w-1 bg-gray-300 rounded-full"
          style={{ height: `${(value / Math.max(...trend)) * 20 + 4}px` }}
        />
      ))}
      <TrendingUp className="w-3 h-3 text-green-500 ml-1" />
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('name')}
                    className="font-semibold text-xs text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Name
                    <ArrowUpDown className="w-3 h-3 ml-1" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('orders')}
                    className="font-semibold text-xs text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Orders
                    <ArrowUpDown className="w-3 h-3 ml-1" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('cvr')}
                    className="font-semibold text-xs text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    CVR%
                    <ArrowUpDown className="w-3 h-3 ml-1" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('gnarr')}
                    className="font-semibold text-xs text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    GNARR ($M)
                    <ArrowUpDown className="w-3 h-3 ml-1" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-center">
                  <span className="font-semibold text-xs text-gray-500 uppercase tracking-wider">
                    8W Trend
                  </span>
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {sortedData.map(row => (
                <tr key={row.name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{row.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 font-medium">
                    {formatNumber(row.orders)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 font-medium">
                    {row.cvr.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 font-medium">
                    ${row.gnarr.toFixed(1)}M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      {renderSparkline(row.trend)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};