import React from 'react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Download, BarChart3 } from 'lucide-react';

export const AdvancedDrilldown: React.FC = () => {
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null);
  
  const dimensions = ['Region', 'Country', 'Product Type', 'Segment', 'Channel'];
  const metrics = ['Orders', 'CVR%', 'GNARR', 'ARPU', 'Users'];
  
  const [selectedDimensions, setSelectedDimensions] = React.useState<string[]>(['Region']);
  const [selectedMetrics, setSelectedMetrics] = React.useState<string[]>(['Orders', 'CVR%']);

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDrop = (targetList: 'dimensions' | 'metrics') => {
    if (!draggedItem) return;
    
    if (targetList === 'dimensions' && !selectedDimensions.includes(draggedItem)) {
      setSelectedDimensions([...selectedDimensions, draggedItem]);
    } else if (targetList === 'metrics' && !selectedMetrics.includes(draggedItem)) {
      setSelectedMetrics([...selectedMetrics, draggedItem]);
    }
    
    setDraggedItem(null);
  };

  const removeItem = (item: string, from: 'dimensions' | 'metrics') => {
    if (from === 'dimensions') {
      setSelectedDimensions(selectedDimensions.filter(d => d !== item));
    } else {
      setSelectedMetrics(selectedMetrics.filter(m => m !== item));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Custom Pivot Analysis</h3>
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Available Fields</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Dimensions</p>
                  <div className="flex flex-wrap gap-2">
                    {dimensions.map(dim => (
                      <span
                        key={dim}
                        draggable
                        onDragStart={() => handleDragStart(dim)}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium cursor-move hover:bg-blue-200 transition-colors"
                      >
                        {dim}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Metrics</p>
                  <div className="flex flex-wrap gap-2">
                    {metrics.map(metric => (
                      <span
                        key={metric}
                        draggable
                        onDragStart={() => handleDragStart(metric)}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium cursor-move hover:bg-green-200 transition-colors"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Rows (Dimensions)</h4>
              <div
                className="min-h-24 p-4 border-2 border-dashed border-gray-300 rounded-lg"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop('dimensions')}
              >
                <div className="flex flex-wrap gap-2">
                  {selectedDimensions.map(dim => (
                    <span
                      key={dim}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium cursor-pointer hover:bg-blue-200"
                      onClick={() => removeItem(dim, 'dimensions')}
                    >
                      {dim} ×
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Values (Metrics)</h4>
              <div
                className="min-h-24 p-4 border-2 border-dashed border-gray-300 rounded-lg"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop('metrics')}
              >
                <div className="flex flex-wrap gap-2">
                  {selectedMetrics.map(metric => (
                    <span
                      key={metric}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium cursor-pointer hover:bg-green-200"
                      onClick={() => removeItem(metric, 'metrics')}
                    >
                      {metric} ×
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <h4 className="font-semibold text-gray-900">Pivot Results</h4>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🔄</div>
              <p className="font-medium">Dynamic Pivot Table</p>
              <p className="text-sm mt-1">
                Dimensions: {selectedDimensions.join(', ') || 'None'}
              </p>
              <p className="text-sm">
                Metrics: {selectedMetrics.join(', ') || 'None'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};