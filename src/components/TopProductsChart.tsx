
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { DashboardData } from '@/utils/types';

interface TopProductsChartProps {
  data: DashboardData;
  limit?: number;
}

const TopProductsChart: React.FC<TopProductsChartProps> = ({ data, limit = 10 }) => {
  const chartData = data.topProducts.slice(0, limit);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#888', fontSize: 12 }} 
                tickLine={{ stroke: '#888' }}
                axisLine={{ stroke: '#888' }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: '#888', fontSize: 12 }} 
                tickLine={{ stroke: '#888' }}
                axisLine={{ stroke: '#888' }}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                tick={{ fill: '#888', fontSize: 12 }} 
                tickLine={{ stroke: '#888' }}
                axisLine={{ stroke: '#888' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 30, 30, 0.8)', 
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                }}
                formatter={(value: any, name: any) => {
                  if (name === 'Sales' || name === 'Avg Price') return [`$${value}`, name];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="sales" name="Sales" fill="#10B981" />
              <Bar yAxisId="right" dataKey="quantity" name="Quantity" fill="#059669" />
              <Bar yAxisId="left" dataKey="avgPrice" name="Avg Price" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
