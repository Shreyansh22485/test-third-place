'use client';

import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface DashboardStats {
  totalEvents: number;
  totalUsers: number;
  totalBookings: number;
  pendingBookings: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await adminService.getDashboardStats();
      setStats(response.stats);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard stats');
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

  const statsCards = [
    {
      title: 'Total Events',
      value: stats?.totalEvents || 0,
      icon: Calendar,
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColorLight: 'bg-blue-50'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      bgColor: 'bg-green-500',
      textColor: 'text-green-600',
      bgColorLight: 'bg-green-50'
    },
    {
      title: 'Total Bookings',
      value: stats?.totalBookings || 0,
      icon: TrendingUp,
      bgColor: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColorLight: 'bg-purple-50'
    },
    {
      title: 'Pending Bookings',
      value: stats?.pendingBookings || 0,
      icon: Clock,
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColorLight: 'bg-yellow-50'
    },
    {
      title: 'Total Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      bgColor: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgColorLight: 'bg-emerald-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 truncate">
                      {card.title}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>
                  </div>
                  <div className={`${card.bgColorLight} p-3 rounded-full`}>
                    <Icon className={`h-6 w-6 ${card.textColor}`} />
                  </div>
                </div>
              </div>
              <div className={`${card.bgColor} h-1`}></div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <QuickActionCard
              title="Create New Event"
              description="Add a new event to the platform"
              href="/admin/dashboard/events?action=create"
              icon={Calendar}
              color="blue"
            />
            <QuickActionCard
              title="View All Users"
              description="Manage user accounts and profiles"
              href="/admin/dashboard/users"
              icon={Users}
              color="green"
            />
            <QuickActionCard
              title="View Analytics"
              description="Check detailed analytics and reports"
              href="/admin/dashboard/analytics"
              icon={TrendingUp}
              color="purple"
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <ActivityItem
              title="New user registration"
              time="2 minutes ago"
              type="user"
            />
            <ActivityItem
              title="Event booking confirmed"
              time="1 hour ago"
              type="booking"
            />
            <ActivityItem
              title="New event created"
              time="3 hours ago"
              type="event"
            />
            <ActivityItem
              title="Payment received"
              time="5 hours ago"
              type="payment"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, href, icon: Icon, color }: {
  title: string;
  description: string;
  href: string;
  icon: any;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
  };

  return (
    <a
      href={href}
      className={`${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-4 hover:shadow-md transition-all duration-200 block`}
    >
      <div className="flex items-center mb-2">
        <Icon className="h-5 w-5 mr-2" />
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm opacity-75">{description}</p>
    </a>
  );
}

function ActivityItem({ title, time, type }: {
  title: string;
  time: string;
  type: string;
}) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'booking': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'payment': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
          {type}
        </div>
        <span className="ml-3 text-sm text-gray-900">{title}</span>
      </div>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
} 