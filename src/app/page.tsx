'use client';

import { useState, useCallback } from 'react';
import { 
  CreditCard, 
  Shield, 
  Globe, 
  TrendingUp, 
  Users, 
  MessageCircle,
  BarChart3,
  Lock,
  ArrowRight,
  Menu,
  X,
  CheckCircle,
  Star,
  Play,
  Award,
  Zap,
  Clock,
  DollarSign,
  Target,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight,
  Download,
  BookOpen,
  Headphones,
  FileText,
  Calendar,
  UserCheck,
  Building2,
  Truck,
  Smartphone,
  Database,
  Cpu,
  Network
} from 'lucide-react';
import InsuranceOptIn from '../components/InsuranceOptIn';
import { APP_VERSION, FEATURE_FLAGS } from '../config/app';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="h-full w-full bg-white overflow-y-auto">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Venndoor</h1>
              <span className="ml-3 hidden sm:inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-100">{APP_VERSION}</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                Features
              </a>
              <a href="#solutions" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                Solutions
              </a>
              <a href="#pricing" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                Pricing
              </a>
              <a 
                href="/login"
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Get Started
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-900"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-50">
            <div className="px-6 py-4 space-y-3">
              <a href="#features" className="text-gray-500 hover:text-gray-900 block text-sm font-medium">
                Features
              </a>
              <a href="#solutions" className="text-gray-500 hover:text-gray-900 block text-sm font-medium">
                Solutions
              </a>
              <a href="#pricing" className="text-gray-500 hover:text-gray-900 block text-sm font-medium">
                Pricing
              </a>
              <a
                href="/login"
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-4 block text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), 
            url('/vendooo.jpg')`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
              Streamline
              <span className="font-medium text-emerald-400 block">B2B Operations</span>
            </h1>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
              Effortless payments, vendor management, and logistics across Nigeria and Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/login"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2" size={16} />
              </a>
              <a 
                href="/login"
                className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Everything you need
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Streamlined tools for modern B2B operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* TradeShield at a glance (from JSON brief) */}
            <div className="bg-white rounded-xl border border-emerald-100 p-6">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-emerald-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">TradeShield Integration</h3>
              </div>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>AI risk assessment on card issuance</li>
                <li>Dynamic premium 0.2–0.5% of amount</li>
                <li>Delay claim payout automation</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Virtual Cards</h3>
              <p className="text-gray-500 text-sm">
                Instant card issuance for seamless payments
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Multi-Currency</h3>
              <p className="text-gray-500 text-sm">
                Support for NGN, USD, and African currencies
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Invoice Tracking</h3>
              <p className="text-gray-500 text-sm">
                Real-time tracking from issuance to payment
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Vendor Management</h3>
              <p className="text-gray-500 text-sm">
                Centralized directory with performance scoring
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Chat</h3>
              <p className="text-gray-500 text-sm">
                End-to-end encrypted communication
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-500 text-sm">
                Comprehensive reporting and insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TradeShield demo moved to dashboard */}

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-light text-emerald-600 mb-1">₦150B+</div>
              <div className="text-sm text-gray-500">Transaction Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-emerald-600 mb-1">5,000+</div>
              <div className="text-sm text-gray-500">Active Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-emerald-600 mb-1">15</div>
              <div className="text-sm text-gray-500">African Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-emerald-600 mb-1">99.9%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Simple steps to streamline your operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UserCheck className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">1. Onboard</h3>
              <p className="text-gray-500 text-sm">
                Add vendors with automated compliance checks
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2. Pay</h3>
              <p className="text-gray-500 text-sm">
                Issue virtual cards for instant payments
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3. Track</h3>
              <p className="text-gray-500 text-sm">
                Monitor transactions and performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Simple pricing
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Starter</h3>
                <div className="text-3xl font-light text-gray-900 mb-1">₦50,000</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
              <ul className="space-y-3 mb-6 text-sm text-gray-600">
                <li>Up to 50 vendors</li>
                <li>Basic virtual cards</li>
                <li>NGN & USD wallets</li>
                <li>Email support</li>
              </ul>
              <a 
                href="/login"
                className="w-full bg-gray-900 text-white py-2 rounded-lg text-center block hover:bg-gray-800 transition-colors text-sm"
              >
                Get Started
              </a>
            </div>

            {/* Professional Plan */}
            <div className="border border-emerald-500 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Professional</h3>
                <div className="text-3xl font-light text-emerald-600 mb-1">₦150,000</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
              <ul className="space-y-3 mb-6 text-sm text-gray-600">
                <li>Up to 500 vendors</li>
                <li>Advanced virtual cards</li>
                <li>Multi-currency wallets</li>
                <li>Analytics & reporting</li>
                <li>Priority support</li>
              </ul>
              <a 
                href="/login"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg text-center block hover:bg-emerald-700 transition-colors text-sm"
              >
                Start Free Trial
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Enterprise</h3>
                <div className="text-3xl font-light text-gray-900 mb-1">Custom</div>
                <div className="text-sm text-gray-500">contact sales</div>
              </div>
              <ul className="space-y-3 mb-6 text-sm text-gray-600">
                <li>Unlimited vendors</li>
                <li>Custom integrations</li>
                <li>Dedicated support</li>
                <li>Advanced security</li>
                <li>Custom training</li>
              </ul>
              <a 
                href="/login"
                className="w-full bg-gray-900 text-white py-2 rounded-lg text-center block hover:bg-gray-800 transition-colors text-sm"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section - What Venndoor Does */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              What is <span className="font-medium text-emerald-600">Venndoor</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Venndoor is a comprehensive B2B operations platform that revolutionizes how businesses manage payments, vendors, and logistics across Nigeria, Africa, and globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Virtual Card Payments */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <CreditCard className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Virtual Card Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                Effortless bill settlements using secure virtual cards across Nigeria, Africa, and globally. 
                Streamline payments with instant card generation and real-time transaction monitoring.
              </p>
            </div>

            {/* Vendor Management */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Centralized Vendor Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Centralize all vendor relationships, contracts, and communications in one intuitive platform. 
                Track vendor performance, manage contracts, and streamline procurement processes.
              </p>
            </div>

            {/* Logistics & Operations */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <Truck className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Integrated Logistics</h3>
              <p className="text-gray-600 leading-relaxed">
                Manage end-to-end logistics operations with real-time tracking, inventory management, 
                and automated delivery coordination across multiple locations.
              </p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Why Choose Venndoor?</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of businesses that have transformed their B2B operations with our comprehensive platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Bank-Grade Security</h4>
                <p className="text-sm text-gray-600">Enterprise-level security with end-to-end encryption</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Global Reach</h4>
                <p className="text-sm text-gray-600">Operate seamlessly across Nigeria, Africa, and worldwide</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Real-Time Analytics</h4>
                <p className="text-sm text-gray-600">Comprehensive insights and reporting for better decisions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Lightning Fast</h4>
                <p className="text-sm text-gray-600">Instant transactions and real-time processing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-medium text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Join thousands of businesses streamlining their operations
          </p>
          <a 
            href="/login"
            className="bg-white text-emerald-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Start Free Trial
          </a>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-emerald-600 mb-4">Venndoor</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-md">
                Streamlining B2B operations across Nigeria and Africa with virtual card solutions and vendor management.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Victoria Island, Lagos, Nigeria</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>+234 901 234 5678</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>hello@venndoor.com</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#features" className="hover:text-gray-900">Features</a></li>
                <li><a href="#pricing" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">API</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; 2024 Venndoor. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-900">Privacy</a>
                <a href="#" className="hover:text-gray-900">Terms</a>
                <a href="#" className="hover:text-gray-900">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CardGenerationDemo() {
  const [amount, setAmount] = useState(250000);
  const [summary, setSummary] = useState<{ optedIn: boolean; premium: number } | null>(null);
  const handleInsuranceChange = useCallback((optedIn: boolean, premium: number) => {
    setSummary({ optedIn, premium });
  }, []);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Transaction amount (₦)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2"
            min={0}
          />
        </div>
        <div className="md:col-span-1">
          <InsuranceOptIn
            amount={amount}
            onChange={handleInsuranceChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
        <div className="text-sm text-gray-700">Estimated total</div>
        <div className="text-sm font-medium text-gray-900">
          ₦{(amount + (summary?.optedIn ? summary?.premium ?? 0 : 0)).toLocaleString()}
        </div>
      </div>
      <div className="text-right">
        <button className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm">
          <CreditCard className="mr-2" size={16} /> Generate virtual card (demo)
        </button>
      </div>
    </div>
  );
}
