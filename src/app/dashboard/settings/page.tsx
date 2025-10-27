'use client';

import { useState } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Globe,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Save,
  LogOut,
  Menu,
  X,
  TrendingUp,
  FileText,
  BarChart3,
  MessageCircle,
  Smartphone,
  Mail,
  Key,
  Database,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Dantata User',
    email: 'dantata@venndoor.com',
    company: 'Venndoor B2B Platform',
    role: 'Administrator',
    phone: '+234 901 234 5678',
    location: 'Lagos, Nigeria',
    timezone: 'Africa/Lagos',
    language: 'English'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    biometricEnabled: true,
    sessionTimeout: 30,
    loginNotifications: true,
    suspiciousActivityAlerts: true,
    passwordExpiry: 90
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    invoiceAlerts: true,
    paymentAlerts: true,
    securityAlerts: true,
    weeklyReports: true,
    monthlyReports: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Globe },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'data', name: 'Data & Privacy', icon: Database }
  ];

  const integrations = [
    {
      name: 'SAP ERP',
      description: 'Enterprise resource planning system',
      status: 'connected',
      lastSync: '2 minutes ago'
    },
    {
      name: 'NIBSS Settlement',
      description: 'Nigerian Inter-Bank Settlement System',
      status: 'connected',
      lastSync: '5 minutes ago'
    },
    {
      name: 'MTN MoMo',
      description: 'Mobile money platform integration',
      status: 'pending',
      lastSync: 'Never'
    },
    {
      name: 'Lori Systems',
      description: 'Logistics management system',
      status: 'connected',
      lastSync: '1 hour ago'
    }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              value={profileData.company}
              onChange={(e) => setProfileData({...profileData, company: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              value={profileData.location}
              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              value={profileData.timezone}
              onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
            >
              <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
              <option value="Africa/Nairobi">Africa/Nairobi (GMT+3)</option>
              <option value="Africa/Johannesburg">Africa/Johannesburg (GMT+2)</option>
              <option value="UTC">UTC (GMT+0)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          {Object.entries(securitySettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h4>
                <p className="text-sm text-gray-500">
                  {key === 'twoFactorEnabled' && 'Add an extra layer of security'}
                  {key === 'biometricEnabled' && 'Use fingerprint or face recognition'}
                  {key === 'sessionTimeout' && 'Minutes before automatic logout'}
                  {key === 'loginNotifications' && 'Get notified of new login attempts'}
                  {key === 'suspiciousActivityAlerts' && 'Alerts for unusual account activity'}
                  {key === 'passwordExpiry' && 'Days before password expires'}
                </p>
              </div>
              <div className="flex items-center">
                {typeof value === 'boolean' ? (
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                    onClick={() => setSecuritySettings({...securitySettings, [key]: !value})}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                ) : (
                  <input
                    type="number"
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    value={value}
                    onChange={(e) => setSecuritySettings({...securitySettings, [key]: parseInt(e.target.value)})}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
          </div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center">
            <Save className="h-4 w-4 mr-2" />
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h4>
                <p className="text-sm text-gray-500">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'smsNotifications' && 'Receive notifications via SMS'}
                  {key === 'pushNotifications' && 'Receive push notifications'}
                  {key === 'invoiceAlerts' && 'Alerts for new invoices and payments'}
                  {key === 'paymentAlerts' && 'Payment status updates'}
                  {key === 'securityAlerts' && 'Security-related notifications'}
                  {key === 'weeklyReports' && 'Weekly performance reports'}
                  {key === 'monthlyReports' && 'Monthly comprehensive reports'}
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
                onClick={() => setNotificationSettings({...notificationSettings, [key]: !value})}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Integrations</h3>
        <div className="space-y-4">
          {integrations.map((integration, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-500">{integration.description}</p>
                    <p className="text-xs text-gray-400">Last sync: {integration.lastSync}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    integration.status === 'connected' 
                      ? 'bg-green-100 text-green-800' 
                      : integration.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {integration.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <Info className="h-5 w-5 text-blue-600 mr-2" />
            <p className="text-blue-800 text-sm">
              You're currently on the Enterprise plan. Contact support for billing inquiries.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Billing Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              defaultValue="billing@venndoor.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">•••• •••• •••• 4242</span>
              <span className="text-xs text-gray-400 ml-auto">Expires 12/25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Export Data</h4>
            <p className="text-sm text-gray-500 mb-3">Download a copy of your account data</p>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Delete Account</h4>
            <p className="text-sm text-gray-500 mb-3">Permanently delete your account and all data</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
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
              <a href="/dashboard/analytics" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <BarChart3 className="mr-3 h-5 w-5" />
                Analytics
              </a>
              <a href="/dashboard/messages" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <MessageCircle className="mr-3 h-5 w-5" />
                Secure Communication
              </a>
              <a href="/dashboard/settings" className="flex items-center px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg">
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
              <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
              <p className="mt-2 text-gray-600">Manage your account settings and preferences</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Settings Navigation */}
              <div className="w-full lg:w-64">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          activeTab === tab.id
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {tab.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Settings Content */}
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {activeTab === 'profile' && renderProfileTab()}
                  {activeTab === 'security' && renderSecurityTab()}
                  {activeTab === 'notifications' && renderNotificationsTab()}
                  {activeTab === 'integrations' && renderIntegrationsTab()}
                  {activeTab === 'billing' && renderBillingTab()}
                  {activeTab === 'data' && renderDataTab()}
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



