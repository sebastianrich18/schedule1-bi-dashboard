
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DashboardData } from '@/utils/types';

interface SalesOverTimeChartProps {
  data: DashboardData;
}

const SalesOverTimeChart: React.FC<SalesOverTimeChartProps> = ({ data }) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Sales Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data.salesOverTime}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorQuantity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                scale="auto"
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
                tickFormatter={(value) => `${value} units`}
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
                  return [`${value} units`, name];
                }}
              />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="sales" 
                name="Sales"
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#colorSales)" 
                strokeWidth={2}
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="quantity" 
                name="Quantity"
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorQuantity)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesOverTimeChart;
