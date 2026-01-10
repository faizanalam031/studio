'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Package,
  AlertCircle,
  BarChart3,
  Settings
} from 'lucide-react';

export default function StaffDashboard() {
  const { isLoggedIn, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || role !== 'staff') {
      router.push('/login');
    }
  }, [isLoggedIn, role, router]);

  if (!isLoggedIn || role !== 'staff') {
    return null;
  }

  const stats = [
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+12%',
      icon: ShoppingBag,
      color: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: '$12,345',
      change: '+8%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Active Users',
      value: '567',
      change: '+5%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Pending Orders',
      value: '23',
      change: '-2%',
      icon: Package,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your QuickBite operations</p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            Staff Portal
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  {' '}from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics
              </CardTitle>
              <CardDescription>
                View detailed reports and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Reports</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Management
              </CardTitle>
              <CardDescription>
                Manage incoming orders and deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Orders</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
              <CardDescription>
                Configure store settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Store Settings</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest orders and system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-xs text-gray-600">Order #1234 - 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment processed</p>
                  <p className="text-xs text-gray-600">Order #1233 - 5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Delivery completed</p>
                  <p className="text-xs text-gray-600">Order #1232 - 10 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}