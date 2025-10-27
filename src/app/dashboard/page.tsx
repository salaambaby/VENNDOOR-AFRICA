'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Star, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Award,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  MessageCircle,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';
import ShipmentTracker from '../../components/ShipmentTracker';
import ClaimStatus from '../../components/ClaimStatus';
import TradeShieldPanel from '../../components/TradeShieldPanel';
import NotificationSheet from '../../components/NotificationSheet';
import { logout } from '../../lib/auth';

interface Vendor {
  id: string;
  name: string;
  email: string;
  category: string;
  status: 'active' | 'pending' | 'suspended';
  performanceScore: number;
  totalTransactions: number;
  totalValue: number;
  lastTransaction: string;
  rating: number;
  location: string;
  joinedDate: string;
  monthlyGrowth: number;
  complianceScore: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function Dashboard() {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'Dangote Industries Limited',
      email: 'procurement@dangote.com',
      category: 'Manufacturing',
      status: 'active',
      performanceScore: 98,
      totalTransactions: 1247,
      totalValue: 45670000,
      lastTransaction: '2024-01-15',
      rating: 4.9,
      location: 'Lagos, Nigeria',
      joinedDate: '2022-03-15',
      monthlyGrowth: 12.5,
      complianceScore: 97,
      riskLevel: 'low'
    },
    {
      id: '2',
      name: 'MTN Nigeria Communications',
      email: 'vendors@mtn.com.ng',
      category: 'Telecommunications',
      status: 'active',
      performanceScore: 94,
      totalTransactions: 892,
      totalValue: 23450000,
      lastTransaction: '2024-01-14',
      rating: 4.8,
      location: 'Lagos, Nigeria',
      joinedDate: '2022-05-20',
      monthlyGrowth: 8.3,
      complianceScore: 95,
      riskLevel: 'low'
    },
    {
      id: '3',
      name: 'Access Bank Plc',
      email: 'suppliers@accessbankplc.com',
      category: 'Financial Services',
      status: 'active',
      performanceScore: 96,
      totalTransactions: 654,
      totalValue: 18760000,
      lastTransaction: '2024-01-13',
      rating: 4.7,
      location: 'Lagos, Nigeria',
      joinedDate: '2022-07-10',
      monthlyGrowth: 15.2,
      complianceScore: 99,
      riskLevel: 'low'
    },
    {
      id: '4',
      name: 'Safaricom Kenya Limited',
      email: 'business@safaricom.co.ke',
      category: 'Telecommunications',
      status: 'active',
      performanceScore: 91,
      totalTransactions: 423,
      totalValue: 12340000,
      lastTransaction: '2024-01-12',
      rating: 4.6,
      location: 'Nairobi, Kenya',
      joinedDate: '2022-09-05',
      monthlyGrowth: 11.8,
      complianceScore: 93,
      riskLevel: 'low'
    },
    {
      id: '5',
      name: 'Shoprite Holdings Ltd',
      email: 'procurement@shoprite.co.za',
      category: 'Retail',
      status: 'active',
      performanceScore: 89,
      totalTransactions: 789,
      totalValue: 15670000,
      lastTransaction: '2024-01-11',
      rating: 4.5,
      location: 'Cape Town, South Africa',
      joinedDate: '2022-11-18',
      monthlyGrowth: 6.7,
      complianceScore: 91,
      riskLevel: 'low'
    },
    {
      id: '6',
      name: 'Ecobank Transnational',
      email: 'vendors@ecobank.com',
      category: 'Financial Services',
      status: 'active',
      performanceScore: 87,
      totalTransactions: 567,
      totalValue: 9876000,
      lastTransaction: '2024-01-10',
      rating: 4.4,
      location: 'Lome, Togo',
      joinedDate: '2023-01-25',
      monthlyGrowth: 9.1,
      complianceScore: 89,
      riskLevel: 'low'
    },
    {
      id: '7',
      name: 'Flutterwave Technologies',
      email: 'partners@flutterwave.com',
      category: 'Fintech',
      status: 'active',
      performanceScore: 93,
      totalTransactions: 234,
      totalValue: 5432000,
      lastTransaction: '2024-01-09',
      rating: 4.8,
      location: 'Lagos, Nigeria',
      joinedDate: '2023-03-12',
      monthlyGrowth: 18.5,
      complianceScore: 94,
      riskLevel: 'low'
    },
    {
      id: '8',
      name: 'Interswitch Limited',
      email: 'business@interswitch.com',
      category: 'Fintech',
      status: 'active',
      performanceScore: 90,
      totalTransactions: 345,
      totalValue: 6789000,
      lastTransaction: '2024-01-08',
      rating: 4.6,
      location: 'Lagos, Nigeria',
      joinedDate: '2023-05-08',
      monthlyGrowth: 14.2,
      complianceScore: 92,
      riskLevel: 'low'
    },
    {
      id: '9',
      name: 'Jumia Technologies AG',
      email: 'vendors@jumia.com',
      category: 'E-commerce',
      status: 'active',
      performanceScore: 85,
      totalTransactions: 456,
      totalValue: 7654000,
      lastTransaction: '2024-01-07',
      rating: 4.3,
      location: 'Lagos, Nigeria',
      joinedDate: '2023-07-20',
      monthlyGrowth: 7.9,
      complianceScore: 87,
      riskLevel: 'medium'
    },
    {
      id: '10',
      name: 'Konga Online Shopping',
      email: 'suppliers@konga.com',
      category: 'E-commerce',
      status: 'active',
      performanceScore: 82,
      totalTransactions: 234,
      totalValue: 4321000,
      lastTransaction: '2024-01-06',
      rating: 4.1,
      location: 'Lagos, Nigeria',
      joinedDate: '2023-09-14',
      monthlyGrowth: 5.6,
      complianceScore: 85,
      riskLevel: 'medium'
    },
    {
      id: '11',
      name: 'Andela Nigeria Limited',
      email: 'partners@andela.com',
      category: 'Technology',
      status: 'active',
      performanceScore: 88,
      totalTransactions: 123,
      totalValue: 3210000,
      lastTransaction: '2024-01-05',
      rating: 4.5,
      location: 'Lagos, Nigeria',
      joinedDate: '2023-11-02',
      monthlyGrowth: 16.3,
      complianceScore: 90,
      riskLevel: 'low'
    },
    {
      id: '12',
      name: 'Paystack Payments',
      email: 'business@paystack.com',
      category: 'Fintech',
      status: 'active',
      performanceScore: 95,
      totalTransactions: 567,
      totalValue: 8765000,
      lastTransaction: '2024-01-04',
      rating: 4.7,
      location: 'Lagos, Nigeria',
      joinedDate: '2023-12-18',
      monthlyGrowth: 22.1,
      complianceScore: 96,
      riskLevel: 'low'
    },
    {
      id: '13',
      name: 'Lori Systems Limited',
      email: 'vendors@lorisystems.com',
      category: 'Logistics',
      status: 'pending',
      performanceScore: 76,
      totalTransactions: 89,
      totalValue: 1876000,
      lastTransaction: '2024-01-03',
      rating: 4.0,
      location: 'Nairobi, Kenya',
      joinedDate: '2024-01-02',
      monthlyGrowth: 3.2,
      complianceScore: 78,
      riskLevel: 'medium'
    },
    {
      id: '14',
      name: 'Twiga Foods Limited',
      email: 'suppliers@twiga.com',
      category: 'Agriculture',
      status: 'pending',
      performanceScore: 73,
      totalTransactions: 67,
      totalValue: 1234000,
      lastTransaction: '2024-01-01',
      rating: 3.9,
      location: 'Nairobi, Kenya',
      joinedDate: '2024-01-01',
      monthlyGrowth: 2.8,
      complianceScore: 75,
      riskLevel: 'medium'
    },
    {
      id: '15',
      name: 'Cellulant Corporation',
      email: 'business@cellulant.com',
      category: 'Fintech',
      status: 'active',
      performanceScore: 86,
      totalTransactions: 234,
      totalValue: 3456000,
      lastTransaction: '2023-12-30',
      rating: 4.2,
      location: 'Nairobi, Kenya',
      joinedDate: '2023-10-15',
      monthlyGrowth: 8.7,
      complianceScore: 88,
      riskLevel: 'low'
    },
    {
      id: '16',
      name: 'Zipline International',
      email: 'vendors@flyzipline.com',
      category: 'Healthcare',
      status: 'active',
      performanceScore: 92,
      totalTransactions: 156,
      totalValue: 2345000,
      lastTransaction: '2023-12-28',
      rating: 4.6,
      location: 'Kigali, Rwanda',
      joinedDate: '2023-08-30',
      monthlyGrowth: 13.4,
      complianceScore: 94,
      riskLevel: 'low'
    },
    {
      id: '17',
      name: 'M-KOPA Solar Limited',
      email: 'suppliers@mkopa.com',
      category: 'Renewable Energy',
      status: 'active',
      performanceScore: 84,
      totalTransactions: 189,
      totalValue: 1876000,
      lastTransaction: '2023-12-25',
      rating: 4.1,
      location: 'Nairobi, Kenya',
      joinedDate: '2023-06-22',
      monthlyGrowth: 6.9,
      complianceScore: 86,
      riskLevel: 'low'
    },
    {
      id: '18',
      name: 'OPay Financial Services',
      email: 'partners@opay.com',
      category: 'Fintech',
      status: 'suspended',
      performanceScore: 45,
      totalTransactions: 45,
      totalValue: 567000,
      lastTransaction: '2023-12-20',
      rating: 3.2,
      location: 'Lagos, Nigeria',
      joinedDate: '2023-04-10',
      monthlyGrowth: -5.2,
      complianceScore: 52,
      riskLevel: 'high'
    },
    {
      id: '19',
      name: 'PalmPay Limited',
      email: 'vendors@palmpay.com',
      category: 'Fintech',
      status: 'active',
      performanceScore: 79,
      totalTransactions: 123,
      totalValue: 987000,
      lastTransaction: '2023-12-18',
      rating: 3.8,
      location: 'Lagos, Nigeria',
      joinedDate: '2023-02-28',
      monthlyGrowth: 4.1,
      complianceScore: 81,
      riskLevel: 'medium'
    },
    {
      id: '20',
      name: 'Carbon Microfinance Bank',
      email: 'business@getcarbon.co',
      category: 'Financial Services',
      status: 'active',
      performanceScore: 87,
      totalTransactions: 234,
      totalValue: 1456000,
      lastTransaction: '2023-12-15',
      rating: 4.3,
      location: 'Lagos, Nigeria',
      joinedDate: '2023-01-15',
      monthlyGrowth: 9.8,
      complianceScore: 89,
      riskLevel: 'low'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || vendor.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 90) return <Award className="h-4 w-4 text-green-600" />;
    if (score >= 70) return <TrendingUp className="h-4 w-4 text-yellow-600" />;
    return <AlertCircle className="h-4 w-4 text-red-600" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
              >
                {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              <h1 className="text-xl font-medium text-emerald-600 ml-2 lg:ml-0">Venndoor</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <BellButton />
              <button onClick={logout} className="p-2 text-gray-400 hover:text-gray-600">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <nav className="flex-1 px-4 py-6 space-y-1">
              <a href="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg">
                <Users className="mr-3 h-4 w-4" />
                Vendors
              </a>
              <a href="/dashboard/virtual-cards" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <CreditCard className="mr-3 h-4 w-4" />
                Cards
              </a>
              <a href="/dashboard/wallet" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <DollarSign className="mr-3 h-4 w-4" />
                Wallet
              </a>
              <a href="/dashboard/invoices" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <BarChart3 className="mr-3 h-4 w-4" />
                Invoices
              </a>
              <a href="/dashboard/analytics" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <BarChart3 className="mr-3 h-4 w-4" />
                Analytics
              </a>
              <a href="/dashboard/messages" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <MessageCircle className="mr-3 h-4 w-4" />
                Messages
              </a>
              <a href="/dashboard/settings" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <Settings className="mr-3 h-4 w-4" />
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
              <h2 className="text-3xl font-bold text-gray-900">Vendor Management</h2>
              <p className="mt-2 text-gray-600">Manage your business partners and track their performance</p>
            </div>

            {/* TradeShield Demo */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">TradeShield Insurance</h3>
              <TradeShieldPanel />
            </div>

            {/* Shipment & Claim (mock) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ShipmentTracker transactionId="demo-tx-123" />
              <ClaimStatus policyId="POL-001" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                    <p className="text-2xl font-bold text-gray-900">{vendors.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                    <p className="text-2xl font-bold text-gray-900">{vendors.filter(v => v.status === 'active').length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{vendors.filter(v => v.status === 'pending').length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(vendors.reduce((acc, v) => acc + v.performanceScore, 0) / vendors.length)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search vendors..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Technology">Technology</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Retail">Retail</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                </select>

                <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vendor
                </button>
              </div>
            </div>

            {/* Vendors Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transactions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Growth
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredVendors.map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-emerald-600">
                                  {vendor.name.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                              <div className="text-sm text-gray-500">{vendor.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vendor.status)}`}>
                            {vendor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getPerformanceIcon(vendor.performanceScore)}
                            <span className={`ml-2 text-sm font-medium ${getPerformanceColor(vendor.performanceScore)}`}>
                              {vendor.performanceScore}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            vendor.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                            vendor.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {vendor.riskLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vendor.totalTransactions.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(vendor.totalValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${
                            vendor.monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {vendor.monthlyGrowth > 0 ? '+' : ''}{vendor.monthlyGrowth}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-900">{vendor.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedVendor(vendor)}
                              className="text-emerald-600 hover:text-emerald-900"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
      <button onClick={() => setOpen(true)} className="p-2 text-gray-400 hover:text-gray-600 relative">
        <Bell size={18} />
        <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
      </button>
      <NotificationSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
