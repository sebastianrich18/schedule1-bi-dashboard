
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell, Legend } from 'recharts';
import { DashboardData } from '@/utils/types';

interface EventTypeDistributionProps {
  data: DashboardData;
}

const COLORS = ['#8B5CF6', '#F97316', '#10B981', '#3B82F6', '#EF4444', '#F59E0B', '#14B8A6', '#EC4899'];

const EventTypeDistribution: React.FC<EventTypeDistributionProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Type Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.eventDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.eventDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 30, 30, 0.8)', 
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                }}
                formatter={(value: any, name: any, props: any) => {
                  return [`${value} events (${((value/data.rawEvents.length)*100).toFixed(1)}%)`, props.payload.name];
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventTypeDistribution;
