'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface SignInFormData {
  phoneNumber: string;
  countryCode: string;
  otp: string;
}

export default function SignInPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignInFormData>({
    phoneNumber: '',
    countryCode: '+91',
    otp: ''
  });

  const totalSteps = 2;

  const handleInputChange = (field: keyof SignInFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
        <p className="text-gray-600 text-xl font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
          <span className="font-medium" style={{ fontWeight: 500 }}>Third Place</span> helps you meet <span className="font-medium" style={{ fontWeight: 500 }}>new people</span>, discover your <span className="font-medium" style={{ fontWeight: 500 }}>city</span>, & deepen your <span className="font-medium" style={{ fontWeight: 500 }}>relationships</span>.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700 text-xl font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
          Enter your phone number to get started
        </p>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select 
              value={formData.countryCode}            onChange={(e) => handleInputChange('countryCode', e.target.value)}
            className="appearance-none border border-gray-300 rounded-lg px-3 py-3 pr-8 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
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
          className="flex-1 border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
        />
      </div>

      <button
        onClick={handleNext}
        disabled={!formData.phoneNumber}
        className="w-full bg-black text-white py-3 rounded-lg text-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 500 }}
      >
        Continue
      </button>      <div className="text-left">
        <p className="font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300, fontSize: '12px', lineHeight: '18px' }}>
          By clicking Continue I agree to Third Place&apos;s{' '}
          <Link href="/terms-of-service" className="underline">
            Terms & Conditions
          </Link>{' '}
          &{' '}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </div>

      <div className="text-left">
        <p className="text-xl text-gray-600 font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-black underline font-medium" style={{ fontWeight: 500 }}>
            Sign up
          </Link>
        </p>
      </div>
      </div>
    </div>
  );  const renderOtpStep = () => (
    <div className="space-y-6">
      <div className="text-left space-y-2">
        <h1 className="text-xl font-medium text-gray-900 font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 500 }}>
          Welcome to third place.
        </h1>
        <p className="text-gray-600 text-xl font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
          <span className="font-medium" style={{ fontWeight: 500 }}>Third Place</span> helps you meet <span className="font-medium" style={{ fontWeight: 500 }}>new people</span>, discover your <span className="font-medium" style={{ fontWeight: 500 }}>city</span>, & deepen your <span className="font-medium" style={{ fontWeight: 500 }}>relationships</span>.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700 text-xl font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
          Enter the OTP sent to {formData.countryCode} {formData.phoneNumber}
        </p>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select 
              value={formData.countryCode}            disabled
            className="appearance-none border border-gray-300 rounded-lg px-3 py-3 pr-8 text-xl font-light bg-gray-100 font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
          >
            <option value={formData.countryCode}>{formData.countryCode}</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        
        <input
          type="tel"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={(e) => handleInputChange('otp', e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-3 text-xl font-light focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}
        />
      </div>

      <button
        onClick={() => {
          // Handle sign in completion
          console.log('Sign in completed:', formData);
        }}
        disabled={!formData.otp}
        className="w-full bg-black text-white py-3 rounded-lg text-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 500 }}
      >
        Sign in
      </button>      <div className="text-left">
        <p className="font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300, fontSize: '12px', lineHeight: '18px' }}>
          By clicking Continue I agree to Third Place&apos;s{' '}
          <Link href="/terms-of-service" className="underline">
            Terms & Conditions
          </Link>{' '}
          &{' '}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </div>

      <div className="text-left">
        <p className="text-xl text-gray-600 font-light font-[family-name:var(--font-crimson-pro)]" style={{ fontWeight: 300 }}>
          Didn&apos;t receive the OTP?{' '}
          <button className="text-black underline font-medium" style={{ fontWeight: 500 }}>
            Resend OTP
          </button>
        </p>
      </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">      {/* Header */}
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
      </div>
    </div>
  );
}