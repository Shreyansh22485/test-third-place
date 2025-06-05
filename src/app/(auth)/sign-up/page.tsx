'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { ConfirmationResult } from 'firebase/auth';

interface FormData {
  phoneNumber: string;
  countryCode: string;
  otp: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;  address: {
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
}

export default function SignUpPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    countryCode: '+91',
    otp: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: '',    address: {
      city: '',
      state: '',
      country: 'India',
      pincode: ''
    }
  });

  const totalSteps = 3;

  // Initialize reCAPTCHA when component mounts
  useEffect(() => {
    authService.initializeRecaptcha();
    
    return () => {
      authService.cleanup();
    };
  }, []);  const handleInputChange = (field: keyof FormData | string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({ 
        ...prev, 
        address: { ...prev.address, [addressField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field as keyof FormData]: value }));
    }
    if (error) setError(''); // Clear error when user types
  };

  // Validation helper functions
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSendOTP = async () => {
    if (!formData.phoneNumber || !validatePhoneNumber(formData.phoneNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;
      const result = await authService.sendOTP(fullPhoneNumber);
      setConfirmationResult(result);
      setCurrentStep(2);
    } catch (error: any) {
      setError(error.message);
    }
    
    setLoading(false);
  };
  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    if (!confirmationResult) {
      setError('Please request OTP first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.verifyOTP(confirmationResult, formData.otp);
      setCurrentStep(3);
    } catch (error: any) {
      setError(error.message);
    }
    
    setLoading(false);
  };  const handleSignUp = async () => {
    setLoading(true);
    setError('');

    try {      const userData = {
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        address: {
          city: formData.address.city.trim(),
          state: formData.address.state.trim(),
          country: formData.address.country,
          pincode: formData.address.pincode.trim()
        }
      };

      await authService.registerUser(userData);
      
      // Registration successful, redirect to dashboard
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
    
    setLoading(false);
  };const handleNext = () => {
    if (currentStep === 1) {
      handleSendOTP();
    } else if (currentStep === 2) {
      handleVerifyOTP();
    } else if (currentStep === 3) {
      handleBasicInfoNext();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-1 mb-8">
      <div 
        className="bg-black h-1 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );  const renderPhoneStep = () => (
    <div className="space-y-6">
      <div className="text-left space-y-2">
        <h1 className="text-xl font-medium text-gray-900 font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 500 }}>
          Welcome to third place.
        </h1>
        <p className="text-xl font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
          <span className="font-medium" style={{ fontWeight: 500 }}>Third Place</span> helps you meet <span className="font-medium" style={{ fontWeight: 500 }}>new people</span>, discover your <span className="font-medium" style={{ fontWeight: 500 }}>city</span>, & deepen your <span className="font-medium" style={{ fontWeight: 500 }}>relationships</span>.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700 text-xl font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
          Enter your phone number to get started
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        <div className="flex space-x-2">
          <div className="relative">
            <select 
              value={formData.countryCode}
              onChange={(e) => handleInputChange('countryCode', e.target.value)}
              disabled={loading}
              className="appearance-none border border-gray-300 rounded-lg px-3 py-3 pr-8 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)] disabled:bg-gray-100" style={{ fontWeight: 300 }}
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        
          <input
            type="tel"
            placeholder="1234567890"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            disabled={loading}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)] disabled:bg-gray-100" style={{ fontWeight: 300 }}
          />
        </div>    
        
        <button
          onClick={handleNext}
          disabled={!formData.phoneNumber || loading}
          className="w-full bg-black text-white py-3 rounded-lg text-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 500 }}
        >
          {loading ? 'Sending OTP...' : 'Continue'}
        </button>

        <div className="text-left">
          <p className="font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300, fontSize: '12px', lineHeight: '18px' }}>
            By clicking Continue I agree to Third Place&apos;s{' '}
            <Link href="/terms-of-service" className="underline " style={{ fontWeight: 500 }}>
              Terms & Conditions
            </Link>{' '}
            &{' '}
            <Link href="/privacy-policy" className="underline" style={{ fontWeight: 500 }}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );  const renderOtpStep = () => (
    <div className="space-y-6">
      <div className="text-left space-y-2">
        <h1 className="text-xl font-medium text-gray-900 font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 500 }}>
          Verify your number
        </h1>
        <p className="text-xl font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
          We've sent a 6-digit code to {formData.countryCode} {formData.phoneNumber}
        </p>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        <input
          type="tel"
          placeholder="Enter 6-digit OTP"
          value={formData.otp}
          onChange={(e) => handleInputChange('otp', e.target.value)}
          disabled={loading}
          maxLength={6}
          className="w-full border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)] disabled:bg-gray-100" style={{ fontWeight: 300 }}
        />

        <button
          onClick={handleNext}
          disabled={!formData.otp || formData.otp.length !== 6 || loading}
          className="w-full bg-black text-white py-3 rounded-lg text-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 500 }}
        >
          {loading ? 'Verifying...' : 'Continue'}
        </button>
          <div className="text-left">
          <p className="font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300, fontSize: '12px', lineHeight: '18px' }}>
            Didn&apos;t receive the OTP?{' '}
            <button 
              onClick={handleSendOTP}
              disabled={loading}
              className="text-black underline font-medium disabled:text-gray-400" style={{ fontWeight: 500 }}
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <div className="text-left">
        <h1 className="text-xl font-medium text-gray-900 font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 500 }}>
          BASIC INFO
        </h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xl text-gray-700 mb-1 font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
            First name*
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
          />
        </div>

        <div>
          <label className="block text-xl text-gray-700 mb-1 font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
            Last name*
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
          />
        </div>

        <div>
          <label className="block text-xl text-gray-700 mb-1 font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
            Email*
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xl text-gray-700 mb-1 font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
              Gender*
            </label>
            <div className="relative">
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-3 pr-8 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block text-xl text-gray-700 mb-1 font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
              Date of birth*
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
            />
          </div>        </div>

        <div>
          <label className="block text-xl text-gray-700 mb-1 font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
            City*
          </label>
          <input
            type="text"
            placeholder="Enter your city"
            value={formData.address.city}
            onChange={(e) => handleInputChange('address.city', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
          />
        </div>

        <div>
          <label className="block text-xl text-gray-700 mb-1 font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
            State*
          </label>
          <input
            type="text"
            placeholder="Enter your state"
            value={formData.address.state}
            onChange={(e) => handleInputChange('address.state', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
          />
        </div>

        <div>
          <label className="block text-xl text-gray-700 mb-1 font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
            Pincode*
          </label>
          <input
            type="text"
            placeholder="Enter your pincode"
            value={formData.address.pincode}
            onChange={(e) => handleInputChange('address.pincode', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
          />
        </div>

        <button
          onClick={handleNext}
          disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.gender || !formData.dateOfBirth || !formData.address.city || !formData.address.state || !formData.address.pincode || loading}
          className="w-full bg-black text-white py-3 rounded-lg text-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 500 }}
        >
          {loading ? 'Creating Account...' : 'Sign up'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );  const handleBasicInfoNext = () => {
    // Validation for basic info
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return;
    }
    if (!formData.email || !validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.gender) {
      setError('Please select your gender');
      return;
    }
    if (!formData.dateOfBirth) {
      setError('Please select your date of birth');
      return;
    }

    // Check age (must be at least 18)
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      setError('You must be at least 18 years old to sign up');
      return;
    }

    // Validation for address
    if (!formData.address.city.trim()) {
      setError('City is required');
      return;
    }
    if (!formData.address.state.trim()) {
      setError('State is required');
      return;
    }
    if (!formData.address.pincode.trim()) {
      setError('Pincode is required');
      return;
    }
    if (!/^\d{6}$/.test(formData.address.pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    // All validation passed, now directly call the signup process
    handleSignUp();
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button 
          onClick={currentStep > 1 ? handleBack : () => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <div className="flex-shrink-0">
          <Image
            src="/Logo_001-01.png"
            alt="Third Place Logo"
            width={100}
            height={30}
            className="object-contain"
            priority
          />
        </div>
        
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-md mx-auto">
        {renderProgressBar()}
        
        {currentStep === 1 && renderPhoneStep()}
        {currentStep === 2 && renderOtpStep()}
        {currentStep === 3 && renderBasicInfoStep()}
        
        {/* reCAPTCHA container (invisible) */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}