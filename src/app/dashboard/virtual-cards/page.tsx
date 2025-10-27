'use client';

import { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Eye, 
  Download, 
  MoreVertical,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import NotificationSheet from '../../../components/NotificationSheet';
import { logout } from '../../../lib/auth';

interface VirtualCard {
  id: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  status: 'active' | 'suspended' | 'expired';
  balance: number;
  currency: string;
  spendingLimit: number;
  vendorName: string;
  issuedDate: string;
  lastUsed: string;
}

export default function VirtualCards() {
  const [cards, setCards] = useState<VirtualCard[]>([
    {
      id: '1',
      cardNumber: '4532 1234 5678 9012',
      cardholderName: 'Dangote Industries Ltd',
      expiryDate: '12/26',
      cvv: '123',
      status: 'active',
      balance: 2500000,
      currency: 'NGN',
      spendingLimit: 5000000,
      vendorName: 'Dangote Industries Limited',
      issuedDate: '2024-01-01',
      lastUsed: '2024-01-15'
    },
    {
      id: '2',
      cardNumber: '5555 4321 9876 5432',
      cardholderName: 'MTN Nigeria Comm',
      expiryDate: '08/26',
      cvv: '456',
      status: 'active',
      balance: 1800000,
      currency: 'NGN',
      spendingLimit: 3000000,
      vendorName: 'MTN Nigeria Communications',
      issuedDate: '2023-12-15',
      lastUsed: '2024-01-14'
    },
    {
      id: '3',
      cardNumber: '4111 1111 1111 1111',
      cardholderName: 'Access Bank Plc',
      expiryDate: '06/26',
      cvv: '789',
      status: 'active',
      balance: 3200000,
      currency: 'USD',
      spendingLimit: 10000000,
      vendorName: 'Access Bank Plc',
      issuedDate: '2023-11-20',
      lastUsed: '2024-01-13'
    },
    {
      id: '4',
      cardNumber: '2223 0000 0000 0000',
      cardholderName: 'Flutterwave Tech',
      expiryDate: '03/26',
      cvv: '321',
      status: 'suspended',
      balance: 0,
      currency: 'NGN',
      spendingLimit: 1000000,
      vendorName: 'Flutterwave Technologies',
      issuedDate: '2023-10-10',
      lastUsed: '2023-12-20'
    }
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [issuing, setIssuing] = useState(false);

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    }
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
              <a href="/dashboard/virtual-cards" className="flex items-center px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg">
                <CreditCard className="mr-3 h-5 w-5" />
                Virtual Cards
              </a>
              <a href="/dashboard/wallet" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <Globe className="mr-3 h-5 w-5" />
                Multi-Currency Wallet
              </a>
              <a href="/dashboard/invoices" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <TrendingUp className="mr-3 h-5 w-5" />
                Invoice Tracking
              </a>
              <a href="/dashboard/analytics" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <TrendingUp className="mr-3 h-5 w-5" />
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
              <h2 className="text-3xl font-bold text-gray-900">Virtual Cards Management</h2>
              <p className="mt-2 text-gray-600">Issue and manage virtual cards for your vendors with instant activation</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Cards</p>
                    <p className="text-2xl font-bold text-gray-900">{cards.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Cards</p>
                    <p className="text-2xl font-bold text-gray-900">{cards.filter(c => c.status === 'active').length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Balance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(cards.reduce((acc, c) => acc + c.balance, 0), 'NGN')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Multi-Currency</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Set(cards.map(c => c.currency)).size}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    if (issuing) return;
                    setIssuing(true);
                    setTimeout(() => {
                      const newCard: VirtualCard = {
                        id: Math.random().toString(36).slice(2),
                        cardNumber: '4' + Math.random().toString().slice(2, 6) + ' ' + Math.random().toString().slice(2, 6) + ' ' + Math.random().toString().slice(2, 6) + ' ' + Math.random().toString().slice(2, 6),
                        cardholderName: 'New Vendor',
                        expiryDate: '12/27',
                        cvv: '***',
                        status: 'active',
                        balance: 1000000,
                        currency: 'NGN',
                        spendingLimit: 2000000,
                        vendorName: 'Demo Vendor',
                        issuedDate: new Date().toISOString().slice(0,10),
                        lastUsed: new Date().toISOString().slice(0,10)
                      };
                      setCards(prev => [newCard, ...prev]);
                      setIssuing(false);
                    }, 1200);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium flex items-center disabled:opacity-70"
                  disabled={issuing}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  {issuing ? 'Issuing…' : 'Issue New Card'}
                </button>
                <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Export Cards
                </button>
                <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </button>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <div key={card.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{card.vendorName}</h3>
                        <p className="text-sm text-gray-500">{card.cardholderName}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(card.status)}`}>
                        {card.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Card Number</p>
                        <p className="text-lg font-mono text-gray-900">{card.cardNumber}</p>
                      </div>
                      
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Expires</p>
                          <p className="text-sm text-gray-900">{card.expiryDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">CVV</p>
                          <p className="text-sm text-gray-900">***</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">Available Balance</p>
                        <p className="text-xl font-bold text-gray-900">
                          {formatCurrency(card.balance, card.currency)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">Spending Limit</p>
                        <p className="text-sm text-gray-900">
                          {formatCurrency(card.spendingLimit, card.currency)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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



