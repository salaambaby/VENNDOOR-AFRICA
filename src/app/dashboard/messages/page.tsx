'use client';

import { useEffect, useState } from 'react';
import { useToast } from '../../../components/ToastProvider';
import { 
  MessageCircle, 
  Send, 
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Search,
  Filter,
  Shield,
  Lock,
  Eye,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Globe,
  CreditCard,
  FileText,
  BarChart3,
  User,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import NotificationSheet from '../../../components/NotificationSheet';
import { logout } from '../../../lib/auth';

interface Message {
  id: string;
  sender: string;
  senderEmail: string;
  recipient: string;
  recipientEmail: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'file' | 'transaction';
  attachments?: Array<{
    name: string;
    type: string;
    size: string;
  }>;
  transactionRef?: string;
}

interface Conversation {
  id: string;
  vendor: string;
  vendorEmail: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'online' | 'offline' | 'away';
  avatar: string;
}

export default function SecureCommunication() {
  const { notify } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      vendor: 'Dangote Industries Limited',
      vendorEmail: 'procurement@dangote.com',
      lastMessage: 'Thank you for the quick payment. Invoice INV-2024-001 has been processed.',
      timestamp: '2024-01-15T10:30:00Z',
      unreadCount: 0,
      status: 'online',
      avatar: 'D'
    },
    {
      id: '2',
      vendor: 'MTN Nigeria Communications',
      vendorEmail: 'vendors@mtn.com.ng',
      lastMessage: 'Please confirm the delivery schedule for next week.',
      timestamp: '2024-01-15T09:15:00Z',
      unreadCount: 2,
      status: 'online',
      avatar: 'M'
    },
    {
      id: '3',
      vendor: 'Flutterwave Technologies',
      vendorEmail: 'partners@flutterwave.com',
      lastMessage: 'The payment gateway integration is ready for testing.',
      timestamp: '2024-01-15T08:45:00Z',
      unreadCount: 1,
      status: 'away',
      avatar: 'F'
    },
    {
      id: '4',
      vendor: 'Access Bank Plc',
      vendorEmail: 'suppliers@accessbankplc.com',
      lastMessage: 'Document attached: Compliance Certificate.pdf',
      timestamp: '2024-01-14T16:20:00Z',
      unreadCount: 0,
      status: 'offline',
      avatar: 'A'
    },
    {
      id: '5',
      vendor: 'Safaricom Kenya Limited',
      vendorEmail: 'business@safaricom.co.ke',
      lastMessage: 'Meeting scheduled for tomorrow at 2 PM.',
      timestamp: '2024-01-14T14:30:00Z',
      unreadCount: 0,
      status: 'online',
      avatar: 'S'
    }
  ]);

  const [messagesByConv, setMessagesByConv] = useState<Record<string, Message[]>>({
    '1': [
    {
      id: '1',
      sender: 'Dangote Industries Limited',
      senderEmail: 'procurement@dangote.com',
      recipient: 'You',
      recipientEmail: 'user@venndoor.com',
        content: 'Thank you for the quick payment. Invoice INV-2024-001 has been processed successfully.',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      sender: 'You',
      senderEmail: 'user@venndoor.com',
      recipient: 'Dangote Industries Limited',
      recipientEmail: 'procurement@dangote.com',
        content: 'Great! I\'ve also updated the delivery schedule in the system.',
      timestamp: '2024-01-15T10:32:00Z',
      status: 'delivered',
      type: 'text'
    },
    {
      id: '3',
      sender: 'Dangote Industries Limited',
      senderEmail: 'procurement@dangote.com',
      recipient: 'You',
      recipientEmail: 'user@venndoor.com',
        content: 'Perfect. We\'ll proceed with the next batch as scheduled.',
      timestamp: '2024-01-15T10:35:00Z',
      status: 'read',
      type: 'text'
    }
    ],
    '2': [
      {
        id: '1',
        sender: 'MTN Nigeria Communications',
        senderEmail: 'vendors@mtn.com.ng',
        recipient: 'You',
        recipientEmail: 'user@venndoor.com',
        content: 'Please confirm the delivery schedule for next week.',
        timestamp: '2024-01-15T09:15:00Z',
        status: 'delivered',
        type: 'text'
      },
      {
        id: '2',
        sender: 'You',
        senderEmail: 'user@venndoor.com',
        recipient: 'MTN Nigeria Communications',
        recipientEmail: 'vendors@mtn.com.ng',
        content: 'Confirmed. Pickup is 10:00 AM Wednesday; PoD required.',
        timestamp: '2024-01-15T09:18:00Z',
        status: 'sent',
        type: 'text'
      }
    ],
    '3': [
      {
        id: '1',
        sender: 'Flutterwave Technologies',
        senderEmail: 'partners@flutterwave.com',
        recipient: 'You',
        recipientEmail: 'user@venndoor.com',
        content: 'The payment gateway integration is ready for testing.',
        timestamp: '2024-01-15T08:45:00Z',
        status: 'delivered',
        type: 'text'
      },
      {
        id: '2',
        sender: 'You',
        senderEmail: 'user@venndoor.com',
        recipient: 'Flutterwave Technologies',
        recipientEmail: 'partners@flutterwave.com',
        content: 'Great, send sandbox keys. We\'ll run UAT today.',
        timestamp: '2024-01-15T08:49:00Z',
        status: 'sent',
        type: 'text'
      }
    ],
    '4': [
      {
        id: '1',
        sender: 'Access Bank Plc',
        senderEmail: 'suppliers@accessbankplc.com',
        recipient: 'You',
        recipientEmail: 'user@venndoor.com',
        content: 'Document attached: Compliance Certificate.pdf',
        timestamp: '2024-01-14T16:20:00Z',
        status: 'delivered',
        type: 'file',
        attachments: [{ name: 'Compliance Certificate.pdf', type: 'application/pdf', size: '228 KB' }]
      }
    ],
    '5': [
      {
        id: '1',
        sender: 'Safaricom Kenya Limited',
        senderEmail: 'business@safaricom.co.ke',
        recipient: 'You',
        recipientEmail: 'user@venndoor.com',
        content: 'Meeting scheduled for tomorrow at 2 PM.',
        timestamp: '2024-01-14T14:30:00Z',
        status: 'delivered',
        type: 'text'
      },
      {
        id: '2',
        sender: 'You',
        senderEmail: 'user@venndoor.com',
        recipient: 'Safaricom Kenya Limited',
        recipientEmail: 'business@safaricom.co.ke',
        content: 'Acknowledged. Agenda: rollout plan + SLAs.',
        timestamp: '2024-01-14T14:35:00Z',
        status: 'sent',
        type: 'text'
      }
    ]
  });

  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Clock className="h-3 w-3 text-gray-400" />;
      case 'delivered': return <CheckCircle className="h-3 w-3 text-blue-500" />;
      case 'read': return <CheckCircle className="h-3 w-3 text-green-500" />;
      default: return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);
  const currentMessages = messagesByConv[selectedConversation] ?? [];

  // Clear unread when opening and seed empty threads once
  useEffect(() => {
    setConversations(prev => prev.map(c => c.id === selectedConversation ? { ...c, unreadCount: 0 } : c));
    if (!messagesByConv[selectedConversation]) {
      setMessagesByConv(prev => ({
        ...prev,
        [selectedConversation]: [
          {
            id: Math.random().toString(36).slice(2),
            sender: currentConversation?.vendor ?? 'Vendor',
            senderEmail: currentConversation?.vendorEmail ?? 'vendor@example.com',
            recipient: 'You',
            recipientEmail: 'user@venndoor.com',
            content: 'Hello! This is a new conversation thread. How can we assist today?',
            timestamp: new Date().toISOString(),
            status: 'delivered',
            type: 'text'
          }
        ]
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation]);

  const sendMessage = (content: string) => {
    const msg: Message = {
      id: Math.random().toString(36).slice(2),
      sender: 'You',
      senderEmail: 'user@venndoor.com',
      recipient: currentConversation?.vendor ?? 'Vendor',
      recipientEmail: currentConversation?.vendorEmail ?? 'vendor@example.com',
      content,
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: 'text'
    };
    setMessagesByConv(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] ?? []), msg]
    }));
    setConversations(prev => prev.map(c => c.id === selectedConversation ? {
      ...c,
      lastMessage: content,
      timestamp: new Date().toISOString()
    } : c));
    notify('Message sent', `To ${currentConversation?.vendor}`);
    // simulate delivery and read
    setTimeout(() => {
      setMessagesByConv(prev => ({
        ...prev,
        [selectedConversation]: (prev[selectedConversation] ?? []).map(m => m.id === msg.id ? { ...m, status: 'delivered' } : m)
      }));
    }, 800);
    setTimeout(() => {
      setMessagesByConv(prev => ({
        ...prev,
        [selectedConversation]: (prev[selectedConversation] ?? []).map(m => m.id === msg.id ? { ...m, status: 'read' } : m)
      }));
    }, 1800);
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
              <div className="flex items-center space-x-2 text-sm text-emerald-600">
                <Shield className="h-4 w-4" />
                <span>End-to-End Encrypted</span>
              </div>
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
              <a href="/dashboard/analytics" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <BarChart3 className="mr-3 h-5 w-5" />
                Analytics
              </a>
              <a href="/dashboard/messages" className="flex items-center px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg">
                <MessageCircle className="mr-3 h-5 w-5" />
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
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Conversations List */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Search className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Filter className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-emerald-600">
                  <Lock className="h-4 w-4" />
                  <span>Signal Protocol Protected</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-emerald-50 border-emerald-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 font-bold">{conversation.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.status)}`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{conversation.vendor}</p>
                          <p className="text-xs text-gray-500">{new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        {conversation.unreadCount > 0 && (
                          <div className="flex justify-end mt-1">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              {conversation.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {currentConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-emerald-600 font-bold">{currentConversation.avatar}</span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(currentConversation.status)}`}></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{currentConversation.vendor}</h3>
                          <p className="text-sm text-gray-500">{currentConversation.vendorEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Phone className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Video className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'You'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className={`flex items-center justify-between mt-1 text-xs ${
                            message.sender === 'You' ? 'text-emerald-100' : 'text-gray-500'
                          }`}>
                            <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            {message.sender === 'You' && (
                              <div className="ml-2">
                                {getMessageStatusIcon(message.status)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && newMessage.trim()) {
                              sendMessage(newMessage.trim());
                              setNewMessage('');
                            }
                          }}
                        />
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Smile className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => {
                          if (newMessage.trim()) {
                            sendMessage(newMessage.trim());
                            setNewMessage('');
                          }
                        }}
                        className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>Messages are encrypted with Signal Protocol</span>
                      <span>Press Enter to send</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose a vendor to start communicating securely</p>
                  </div>
                </div>
              )}
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



