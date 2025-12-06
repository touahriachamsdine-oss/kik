'use client';

import { DollarSign, Users, Package, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';

const kpiData = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month', icon: DollarSign },
  { title: 'Active Bookings', value: '+2350', change: '+180.1% from last month', icon: Users },
  { title: 'Sales', value: '+12,234', change: '+19% from last month', icon: ShoppingCart },
  { title: 'Listed Packages', value: '72', change: '+2 since last hour', icon: Package },
];

const chartData = [
  { month: 'January', sales: 186 },
  { month: 'February', sales: 305 },
  { month: 'March', sales: 237 },
  { month: 'April', sales: 273 },
  { month: 'May', sales: 209 },
  { month: 'June', sales: 214 },
];

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <defs>
                <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="sales"
                type="natural"
                fill="url(#fillSales)"
                stroke="var(--color-sales)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
