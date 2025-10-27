'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, Fingerprint, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    biometric: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // Check for demo credentials
      if (formData.email.toLowerCase().includes('dantata') && formData.password === 'password12') {
        localStorage.setItem('venndoor-auth', 'true');
        localStorage.setItem('venndoor-user', JSON.stringify({
          email: formData.email,
          name: 'Dantata User',
          role: 'vendor'
        }));
        setIsLoading(false);
        router.push('/dashboard');
      } else {
        alert('Invalid credentials. Use "dantata" in email and "password12" as password for demo.');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleBiometricAuth = () => {
    setIsLoading(true);
    // Simulate biometric authentication
    setTimeout(() => {
      localStorage.setItem('venndoor-auth', 'true');
      localStorage.setItem('venndoor-user', JSON.stringify({
        email: 'dantata@venndoor.com',
        name: 'Dantata User',
        role: 'vendor'
      }));
      setIsLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Simple Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <div className="max-w-md">
            <h1 className="text-3xl font-medium mb-6 leading-tight">
              Streamline <span className="text-emerald-400">B2B Operations</span>
            </h1>
            <p className="text-gray-200 mb-8 leading-relaxed">
              Join thousands of businesses across Nigeria and Africa
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                <span className="text-gray-200">50% reduction in payment delays</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                <span className="text-gray-200">Bank-grade security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-500 text-sm">
              Sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="your@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Keep me signed in
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-gray-600 hover:text-emerald-600">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>

            {/* Biometric Login */}
            <button
              type="button"
              onClick={handleBiometricAuth}
              disabled={isLoading}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Fingerprint className="h-4 w-4 mr-2" />
              Biometric Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
