
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { DashboardData } from '@/utils/types';

interface TopCustomersChartProps {
  data: DashboardData;
  limit?: number;
}

const TopCustomersChart: React.FC<TopCustomersChartProps> = ({ data, limit = 10 }) => {
  const chartData = data.topCustomers.slice(0, limit);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} horizontal={false} />
              <XAxis 
                type="number" 
                tick={{ fill: '#888', fontSize: 12 }} 
                tickLine={{ stroke: '#888' }}
                axisLine={{ stroke: '#888' }}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fill: '#888', fontSize: 12 }} 
                tickLine={{ stroke: '#888' }}
                axisLine={{ stroke: '#888' }}
                width={80}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 30, 30, 0.8)', 
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                }}
                formatter={(value: any, name: any) => {
                  if (name === 'Sales') return [`$${value}`, name];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar dataKey="sales" name="Sales" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="purchases" name="Purchases" fill="#4338CA" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCustomersChart;
