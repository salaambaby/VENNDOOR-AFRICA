'use client';

import { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  Calendar,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Globe,
  CreditCard
} from 'lucide-react';
import NotificationSheet from '../../../components/NotificationSheet';
import { logout } from '../../../lib/auth';

interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: string;
  vendorEmail: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'viewed' | 'approved' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  createdDate: string;
  description: string;
  category: string;
  paymentMethod?: string;
  paidDate?: string;
  attachments: number;
}

export default function InvoiceTracking() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      vendor: 'Dangote Industries Limited',
      vendorEmail: 'accounts@dangote.com',
      amount: 15000000,
      currency: 'NGN',
      status: 'paid',
      dueDate: '2024-01-10',
      createdDate: '2024-01-01',
      description: 'Cement supply for Q1 2024',
      category: 'Manufacturing',
      paymentMethod: 'Virtual Card',
      paidDate: '2024-01-08',
      attachments: 3
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      vendor: 'MTN Nigeria Communications',
      vendorEmail: 'billing@mtn.com.ng',
      amount: 850000,
      currency: 'NGN',
      status: 'approved',
      dueDate: '2024-01-20',
      createdDate: '2024-01-05',
      description: 'Telecommunications services - January 2024',
      category: 'Telecommunications',
      attachments: 1
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      vendor: 'Flutterwave Technologies',
      vendorEmail: 'finance@flutterwave.com',
      amount: 2500,
      currency: 'USD',
      status: 'sent',
      dueDate: '2024-01-25',
      createdDate: '2024-01-10',
      description: 'Payment processing fees',
      category: 'Fintech',
      attachments: 2
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      vendor: 'Access Bank Plc',
      vendorEmail: 'corporate@accessbankplc.com',
      amount: 3200000,
      currency: 'NGN',
      status: 'overdue',
      dueDate: '2024-01-05',
      createdDate: '2023-12-20',
      description: 'Banking services and transaction fees',
      category: 'Financial Services',
      attachments: 1
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      vendor: 'Jumia Technologies AG',
      vendorEmail: 'billing@jumia.com',
      amount: 1250000,
      currency: 'NGN',
      status: 'viewed',
      dueDate: '2024-01-30',
      createdDate: '2024-01-12',
      description: 'E-commerce platform subscription',
      category: 'E-commerce',
      attachments: 1
    },
    {
      id: '6',
      invoiceNumber: 'INV-2024-006',
      vendor: 'Interswitch Limited',
      vendorEmail: 'accounts@interswitch.com',
      amount: 1800000,
      currency: 'NGN',
      status: 'draft',
      dueDate: '2024-02-15',
      createdDate: '2024-01-14',
      description: 'Payment gateway integration services',
      category: 'Fintech',
      attachments: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [downloading, setDownloading] = useState<string|null>(null);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'viewed': return 'bg-purple-100 text-purple-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-emerald-100 text-emerald-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4" />;
      case 'sent': return <Clock className="h-4 w-4" />;
      case 'viewed': return <Eye className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const totalAmount = filteredInvoices.reduce((acc, invoice) => acc + invoice.amount, 0);
  const paidAmount = filteredInvoices.filter(inv => inv.status === 'paid').reduce((acc, invoice) => acc + invoice.amount, 0);
  const overdueAmount = filteredInvoices.filter(inv => inv.status === 'overdue').reduce((acc, invoice) => acc + invoice.amount, 0);

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
              <a href="/dashboard/virtual-cards" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <CreditCard className="mr-3 h-5 w-5" />
                Virtual Cards
              </a>
              <a href="/dashboard/wallet" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <Globe className="mr-3 h-5 w-5" />
                Multi-Currency Wallet
              </a>
              <a href="/dashboard/invoices" className="flex items-center px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg">
                <FileText className="mr-3 h-5 w-5" />
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
              <h2 className="text-3xl font-bold text-gray-900">Invoice Tracking</h2>
              <p className="mt-2 text-gray-600">Track and manage all your vendor invoices in real-time</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <FileText className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                    <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Paid Amount</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(paidAmount, 'NGN')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(overdueAmount, 'NGN')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {invoices.filter(inv => ['sent', 'viewed', 'approved'].includes(inv.status)).length}
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
                      placeholder="Search invoices..."
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
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="viewed">Viewed</option>
                  <option value="approved">Approved</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>

                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                            <div className="text-sm text-gray-500">{invoice.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{invoice.vendor}</div>
                            <div className="text-sm text-gray-500">{invoice.vendorEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(invoice.amount, invoice.currency)}
                          </div>
                          <div className="text-sm text-gray-500">{invoice.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                            {getStatusIcon(invoice.status)}
                            <span className="ml-1">{invoice.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(invoice.createdDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button onClick={() => {
                              setInvoices(prev => prev.map(i => i.id === invoice.id ? { ...i, status: 'paid', paidDate: new Date().toISOString() } : i));
                            }} className="text-emerald-600 hover:text-emerald-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button onClick={() => { setDownloading(invoice.id); setTimeout(() => setDownloading(null), 800); }} className="text-blue-600 hover:text-blue-900">
                              <Download className="h-4 w-4" /> {downloading === invoice.id ? '...' : ''}
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <MoreVertical className="h-4 w-4" />
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
      <button onClick={() => setOpen(true)} className="p-2 text-gray-400 hover:text-gray-500 relative">
        <Bell size={20} />
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
      </button>
      <NotificationSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}



