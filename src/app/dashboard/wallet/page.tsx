'use client';

import { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  RefreshCw,
  Globe,
  Shield,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import NotificationSheet from '../../../components/NotificationSheet';
import { logout } from '../../../lib/auth';

interface Wallet {
  id: string;
  currency: string;
  balance: number;
  availableBalance: number;
  pendingBalance: number;
  lastUpdated: string;
  exchangeRate: number;
  ngnEquivalent: number;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'transfer' | 'exchange';
  amount: number;
  currency: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  reference: string;
  vendor?: string;
}

export default function Wallet() {
  const [wallets, setWallets] = useState<Wallet[]>([
    {
      id: '1',
      currency: 'NGN',
      balance: 45000000,
      availableBalance: 42000000,
      pendingBalance: 3000000,
      lastUpdated: '2024-01-15T10:30:00Z',
      exchangeRate: 1,
      ngnEquivalent: 45000000
    },
    {
      id: '2',
      currency: 'USD',
      balance: 125000,
      availableBalance: 115000,
      pendingBalance: 10000,
      lastUpdated: '2024-01-15T10:30:00Z',
      exchangeRate: 1500,
      ngnEquivalent: 187500000
    },
    {
      id: '3',
      currency: 'EUR',
      balance: 45000,
      availableBalance: 40000,
      pendingBalance: 5000,
      lastUpdated: '2024-01-15T10:30:00Z',
      exchangeRate: 1650,
      ngnEquivalent: 74250000
    },
    {
      id: '4',
      currency: 'GBP',
      balance: 25000,
      availableBalance: 22000,
      pendingBalance: 3000,
      lastUpdated: '2024-01-15T10:30:00Z',
      exchangeRate: 1900,
      ngnEquivalent: 47500000
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 5000000,
      currency: 'NGN',
      description: 'Payment from Dangote Industries Ltd',
      status: 'completed',
      timestamp: '2024-01-15T09:15:00Z',
      reference: 'TXN001234567',
      vendor: 'Dangote Industries Limited'
    },
    {
      id: '2',
      type: 'debit',
      amount: 2500,
      currency: 'USD',
      description: 'Payment to Flutterwave Technologies',
      status: 'completed',
      timestamp: '2024-01-15T08:45:00Z',
      reference: 'TXN001234568',
      vendor: 'Flutterwave Technologies'
    },
    {
      id: '3',
      type: 'exchange',
      amount: 10000,
      currency: 'USD',
      description: 'Currency exchange USD to NGN',
      status: 'completed',
      timestamp: '2024-01-14T16:20:00Z',
      reference: 'TXN001234569'
    },
    {
      id: '4',
      type: 'transfer',
      amount: 1500000,
      currency: 'NGN',
      description: 'Transfer to Access Bank Plc',
      status: 'pending',
      timestamp: '2024-01-14T14:30:00Z',
      reference: 'TXN001234570',
      vendor: 'Access Bank Plc'
    }
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBalances, setShowBalances] = useState(true);
  const [working, setWorking] = useState<'add'|'withdraw'|'exchange'|'transfer'|null>(null);

  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    return formatter.format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit': return <ArrowDownLeft className="h-5 w-5 text-green-600" />;
      case 'debit': return <ArrowUpRight className="h-5 w-5 text-red-600" />;
      case 'exchange': return <RefreshCw className="h-5 w-5 text-blue-600" />;
      case 'transfer': return <ArrowUpRight className="h-5 w-5 text-purple-600" />;
      default: return <DollarSign className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalNGNEquivalent = wallets.reduce((acc, wallet) => acc + wallet.ngnEquivalent, 0);

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
              <button 
                onClick={() => setShowBalances(!showBalances)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                {showBalances ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
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
                <DollarSign className="mr-3 h-5 w-5" />
                Virtual Cards
              </a>
              <a href="/dashboard/wallet" className="flex items-center px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg">
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
              <h2 className="text-3xl font-bold text-gray-900">Multi-Currency Wallet</h2>
              <p className="mt-2 text-gray-600">Manage your funds across multiple currencies with real-time exchange rates</p>
            </div>

            {/* Total Portfolio Value */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Total Portfolio Value</p>
                  <p className="text-3xl font-bold">
                    {showBalances ? formatCurrency(totalNGNEquivalent, 'NGN') : '••••••••'}
                  </p>
                  <p className="text-emerald-100 text-sm mt-1">Equivalent in NGN</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <RefreshCw className="h-5 w-5" />
                  </button>
                  <div className="text-right">
                    <p className="text-emerald-100 text-sm">Last Updated</p>
                    <p className="text-sm font-medium">2 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {wallets.map((wallet) => (
                <div key={wallet.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <span className="text-emerald-600 font-bold text-sm">{wallet.currency}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{wallet.currency}</p>
                        <p className="text-xs text-gray-500">Balance</p>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {showBalances ? formatCurrency(wallet.balance, wallet.currency) : '••••••'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Available: {showBalances ? formatCurrency(wallet.availableBalance, wallet.currency) : '••••••'}
                      </p>
                    </div>
                    
                    {wallet.currency !== 'NGN' && (
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          ≈ {showBalances ? formatCurrency(wallet.ngnEquivalent, 'NGN') : '••••••'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Rate: 1 {wallet.currency} = ₦{wallet.exchangeRate.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button onClick={() => {
                if (working) return; setWorking('add');
                setTimeout(() => {
                  setWallets(prev => prev.map(w => w.currency === 'NGN' ? { ...w, balance: w.balance + 1000000, availableBalance: w.availableBalance + 1000000, ngnEquivalent: w.ngnEquivalent + 1000000 } : w));
                  setTransactions(prev => [{ id: Math.random().toString(36).slice(2), type: 'credit', amount: 1000000, currency: 'NGN', description: 'Demo top up', status: 'completed', timestamp: new Date().toISOString(), reference: 'TOPUP' }, ...prev]);
                  setWorking(null);
                }, 800);
              }} className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg flex flex-col items-center space-y-2 disabled:opacity-70" disabled={!!working}>
                <Plus className="h-6 w-6" />
                <span className="text-sm font-medium">{working === 'add' ? 'Adding…' : 'Add Funds'}</span>
              </button>
              <button onClick={() => {
                if (working) return; setWorking('withdraw');
                setTimeout(() => {
                  setWallets(prev => prev.map(w => w.currency === 'NGN' ? { ...w, balance: w.balance - 500000, availableBalance: w.availableBalance - 500000, ngnEquivalent: w.ngnEquivalent - 500000 } : w));
                  setTransactions(prev => [{ id: Math.random().toString(36).slice(2), type: 'debit', amount: 500000, currency: 'NGN', description: 'Demo withdrawal', status: 'completed', timestamp: new Date().toISOString(), reference: 'WD' }, ...prev]);
                  setWorking(null);
                }, 800);
              }} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 p-4 rounded-lg flex flex-col items-center space-y-2 disabled:opacity-70" disabled={!!working}>
                <Minus className="h-6 w-6" />
                <span className="text-sm font-medium">{working === 'withdraw' ? 'Withdrawing…' : 'Withdraw'}</span>
              </button>
              <button onClick={() => {
                if (working) return; setWorking('exchange');
                setTimeout(() => {
                  setWallets(prev => prev.map(w => w.currency === 'USD' ? { ...w, balance: w.balance - 1000, availableBalance: w.availableBalance - 1000, ngnEquivalent: (w.balance - 1000) * w.exchangeRate } : w).map(w => w.currency === 'NGN' ? { ...w, balance: w.balance + 1500000, availableBalance: w.availableBalance + 1500000, ngnEquivalent: w.ngnEquivalent + 1500000 } : w));
                  setTransactions(prev => [{ id: Math.random().toString(36).slice(2), type: 'exchange', amount: 1000, currency: 'USD', description: 'USD → NGN demo', status: 'completed', timestamp: new Date().toISOString(), reference: 'FX' }, ...prev]);
                  setWorking(null);
                }, 1000);
              }} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 p-4 rounded-lg flex flex-col items-center space-y-2 disabled:opacity-70" disabled={!!working}>
                <RefreshCw className="h-6 w-6" />
                <span className="text-sm font-medium">{working === 'exchange' ? 'Exchanging…' : 'Exchange'}</span>
              </button>
              <button onClick={() => {
                if (working) return; setWorking('transfer');
                setTimeout(() => {
                  setTransactions(prev => [{ id: Math.random().toString(36).slice(2), type: 'transfer', amount: 200000, currency: 'NGN', description: 'Transfer to Access Bank Plc', status: 'completed', timestamp: new Date().toISOString(), reference: 'TRF', vendor: 'Access Bank Plc' }, ...prev]);
                  setWorking(null);
                }, 800);
              }} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 p-4 rounded-lg flex flex-col items-center space-y-2 disabled:opacity-70" disabled={!!working}>
                <ArrowUpRight className="h-6 w-6" />
                <span className="text-sm font-medium">{working === 'transfer' ? 'Transferring…' : 'Transfer'}</span>
              </button>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.timestamp).toLocaleString()}
                          </p>
                          {transaction.vendor && (
                            <p className="text-xs text-emerald-600 mt-1">
                              {transaction.vendor}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}
                          {showBalances ? formatCurrency(transaction.amount, transaction.currency) : '••••••'}
                        </p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                  View All Transactions
                </button>
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



