'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  FileText,
  Globe,
  PieChart,
  Activity,
  Calendar,
  Download,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import NotificationSheet from '../../../components/NotificationSheet';
import { logout } from '../../../lib/auth';

interface AnalyticsData {
  totalRevenue: number;
  totalTransactions: number;
  activeVendors: number;
  averageTransactionValue: number;
  monthlyGrowth: number;
  topCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  monthlyData: Array<{
    month: string;
    revenue: number;
    transactions: number;
  }>;
  topVendors: Array<{
    name: string;
    amount: number;
    transactions: number;
  }>;
  currencyBreakdown: Array<{
    currency: string;
    amount: number;
    percentage: number;
  }>;
}

export default function Analytics() {
  const [analyticsData] = useState<AnalyticsData>({
    totalRevenue: 156750000,
    totalTransactions: 2847,
    activeVendors: 18,
    averageTransactionValue: 55000,
    monthlyGrowth: 23.5,
    topCategories: [
      { category: 'Fintech', amount: 45600000, percentage: 29.1 },
      { category: 'Manufacturing', amount: 38700000, percentage: 24.7 },
      { category: 'Telecommunications', amount: 23400000, percentage: 14.9 },
      { category: 'Financial Services', amount: 18900000, percentage: 12.1 },
      { category: 'E-commerce', amount: 15600000, percentage: 9.9 },
      { category: 'Others', amount: 14500000, percentage: 9.3 }
    ],
    monthlyData: [
      { month: 'Jul', revenue: 12500000, transactions: 234 },
      { month: 'Aug', revenue: 15600000, transactions: 289 },
      { month: 'Sep', revenue: 18900000, transactions: 345 },
      { month: 'Oct', revenue: 22300000, transactions: 412 },
      { month: 'Nov', revenue: 26700000, transactions: 498 },
      { month: 'Dec', revenue: 31200000, transactions: 587 },
      { month: 'Jan', revenue: 37800000, transactions: 682 }
    ],
    topVendors: [
      { name: 'Dangote Industries Ltd', amount: 45670000, transactions: 1247 },
      { name: 'MTN Nigeria Comm', amount: 23450000, transactions: 892 },
      { name: 'Access Bank Plc', amount: 18760000, transactions: 654 },
      { name: 'Safaricom Kenya', amount: 12340000, transactions: 423 },
      { name: 'Shoprite Holdings', amount: 9876000, transactions: 345 }
    ],
    currencyBreakdown: [
      { currency: 'NGN', amount: 134250000, percentage: 85.6 },
      { currency: 'USD', amount: 15600000, percentage: 9.9 },
      { currency: 'EUR', amount: 4500000, percentage: 2.9 },
      { currency: 'GBP', amount: 2400000, percentage: 1.5 }
    ]
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-emerald-500',
      'bg-blue-500',
      'bg-purple-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="text-2xl font-bold text-emerald-600 ml-2 lg:ml-0">Venndoor</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <BellButton />
              <button onClick={logout} className="p-2 text-gray-400 hover:text-gray-500">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <nav className="flex-1 px-4 py-6 space-y-2">
              <a href="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <TrendingUp className="mr-3 h-5 w-5" />
                Vendor Management
              </a>
              <a href="/dashboard/virtual-cards" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <CreditCard className="mr-3 h-5 w-5" />
                Virtual Cards
              </a>
              <a href="/dashboard/wallet" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <Globe className="mr-3 h-5 w-5" />
                Multi-Currency Wallet
              </a>
              <a href="/dashboard/invoices" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <FileText className="mr-3 h-5 w-5" />
                Invoice Tracking
              </a>
              <a href="/dashboard/analytics" className="flex items-center px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg">
                <BarChart3 className="mr-3 h-5 w-5" />
                Analytics
              </a>
              <a href="/dashboard/messages" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <Bell className="mr-3 h-5 w-5" />
                Secure Communication
              </a>
              <a href="/dashboard/settings" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
              <p className="mt-2 text-gray-600">Comprehensive insights into your B2B operations and performance metrics</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.totalRevenue)}</p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 ml-1">+{analyticsData.monthlyGrowth}%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.totalTransactions.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 ml-1">+12.5%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.activeVendors}</p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 ml-1">+3 new</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Transaction</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.averageTransactionValue)}</p>
                    <div className="flex items-center mt-1">
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600 ml-1">-2.1%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Trend */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {analyticsData.monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 text-sm text-gray-600">{data.month}</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${(data.revenue / 40000000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-20 text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(data.revenue)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <PieChart className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {analyticsData.topCategories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex items-center flex-1">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(index)} mr-3`}></div>
                        <span className="text-sm font-medium text-gray-900">{category.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{category.percentage}%</span>
                        <span className="text-sm font-medium text-gray-900 w-20 text-right">
                          {formatCurrency(category.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Vendors */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Top Performing Vendors</h3>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {analyticsData.topVendors.map((vendor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-emerald-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                          <p className="text-xs text-gray-500">{vendor.transactions} transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(vendor.amount)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Currency Distribution */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Currency Distribution</h3>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {analyticsData.currencyBreakdown.map((currency, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 text-sm font-medium text-gray-900">{currency.currency}</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${getCategoryColor(index)}`}
                            style={{ width: `${currency.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-600 text-right">{currency.percentage}%</div>
                      <div className="w-20 text-sm font-medium text-gray-900 text-right ml-2">
                        {formatCurrency(currency.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function BellButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2 text-gray-400 hover:text-gray-500 relative">
        <Bell size={20} />
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
      </button>
      <NotificationSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}



