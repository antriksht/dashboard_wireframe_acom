import React from 'react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { generateTrendData } from '../utils/mockData';
import { ChartDataPoint } from '../types/analytics';

const metrics = ['Orders', 'CVR%', 'GNARR'];
const colors = ['#1f77b4', '#ff7f0e', '#2ca02c'];

interface TrendChartProps {
  selectedMetrics: string[];
  onMetricsChange: React.Dispatch<React.SetStateAction<string[]>>;
  availableMetrics: string[];
}

const TrendGridChart: React.FC<TrendChartProps> = ({ selectedMetrics }) => {
  const [viewType, setViewType] = React.useState<'WoW' | 'QoQ'>('WoW');
  // Store trend data for each metric
  const [data, setData] = React.useState<Record<string, ChartDataPoint[]>>({});

  React.useEffect(() => {
    const newData = selectedMetrics.reduce((acc, metric) => {
      acc[metric] = generateTrendData(viewType, [metric]);
      return acc;
    }, {} as Record<string, ChartDataPoint[]>);
    setData(newData);
  }, [viewType, selectedMetrics]); // Added selectedMetrics dependency

  const renderChart = (metric: string, color: string) => {
    const points = data[metric] || [];
    const max = Math.max(...points.map(p => Number(p[metric]) || 0));
    const prevPoints = points.map(p => ({
      period: p.period,
      value: Number(p[metric]) * (0.9 + Math.random() * 0.2) // Simulated YoY data
    }));

    const barWidth = 100 / points.length;

    const lines = (points: Array<{ value: number }>, stroke: string) => {
      const linePath = points.reduce((path, point, i) => {
        const x = (i + 0.5) * barWidth;
        const y = 100 - (point.value / max) * 100;
        return `${path}${i === 0 ? 'M' : 'L'} ${x} ${y} `;
      }, '');
      return (
        <path d={linePath} fill="none" stroke={stroke} strokeWidth="2" />
      );
    };

    return (
      <div className="bg-white border p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">{metric}</h4>
        <div className="relative h-40 w-full pb-6">
          <svg width="100%" height="100%" className="overflow-visible">
            <g>{lines(prevPoints, '#ccc')}</g>
            {points.map((p, i) => {
              const x = i * barWidth;
              const height = (Number(p[metric]) / max) * 100;
              return (
                <rect
                  key={i}
                  x={`${x}%`}
                  y={`${100 - height}%`}
                  width={`${barWidth - 1}%`}
                  height={`${height}%`}
                  fill={color}
                >
                  <title>{`${p.period}: ${p[metric]}`}</title>
                </rect>
              );
            })}
          </svg>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-gray-500">
            {points.map((p, i) => (
              <span key={i} className="transform -rotate-45 origin-left whitespace-nowrap">
                {p.period}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Trend Analysis</h3>
          <div className="flex space-x-2">
            <Button
              variant={viewType === 'WoW' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewType('WoW')}
            >
              WoW View
            </Button>
            <Button
              variant={viewType === 'QoQ' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewType('QoQ')}
            >
              QoQ View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, i) => renderChart(metric, colors[i]))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendGridChart;
