'use client';

import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  BarChart3,
  AlertCircle 
} from 'lucide-react';

interface AnalyticsData {
  totalEvents: number;
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await adminService.getDashboardStats();
      setData(response.stats);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: 'Total Revenue',
      value: `₹${(data?.totalRevenue || 0).toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Users',
      value: data?.totalUsers || 0,
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Events',
      value: data?.totalEvents || 0,
      change: '+5.1%',
      changeType: 'positive',
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Total Bookings',
      value: data?.totalBookings || 0,
      change: '+15.3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const conversionRate = data?.totalBookings && data?.totalUsers 
    ? ((data.totalBookings / data.totalUsers) * 100).toFixed(1)
    : '0.0';

  const avgRevenuePerUser = data?.totalRevenue && data?.totalUsers
    ? (data.totalRevenue / data.totalUsers).toFixed(0)
    : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">Track your platform's performance and growth</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${
                  metric.color === 'green' ? 'bg-green-100' :
                  metric.color === 'blue' ? 'bg-blue-100' :
                  metric.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Revenue chart would go here</p>
              <p className="text-sm text-gray-400 mt-1">Chart integration coming soon</p>
            </div>
          </div>
        </div>

        {/* User Growth Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">User growth chart would go here</p>
              <p className="text-sm text-gray-400 mt-1">Chart integration coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{conversionRate}%</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Conversion Rate</div>
            <div className="text-xs text-gray-500 mt-1">Users who book events</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">₹{avgRevenuePerUser}</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Avg Revenue per User</div>
            <div className="text-xs text-gray-500 mt-1">Revenue divided by total users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{data?.pendingBookings || 0}</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Pending Bookings</div>
            <div className="text-xs text-gray-500 mt-1">Awaiting confirmation</div>
          </div>
        </div>
      </div>

      {/* Recent Performance */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Performance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-gray-900">Event bookings</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-green-600">↗ 15.3%</span> increase this month
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-gray-900">New user registrations</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">↗ 8.2%</span> increase this month
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-gray-900">Event creations</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-purple-600">↗ 5.1%</span> increase this month
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-gray-900">Revenue growth</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-orange-600">↗ 12.5%</span> increase this month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 