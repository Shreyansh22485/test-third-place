"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface TakeTestProps {
  onClose: () => void;
}

export default function TakeTest({ onClose }: TakeTestProps) {
  const { user } = useUser();
  const router = useRouter();

  const handleStartTest = () => {
    if (!user) return;

    // Get current URL for return redirect
    const currentUrl = window.location.pathname;    // Navigate to personality test page with return URL
    router.push(`/personality-test?returnTo=${encodeURIComponent(currentUrl)}`);
  };

return (
    <div 
      className="fixed left-0 right-0 bg-[#F5F5DC] z-40"
      style={{
        borderRadius: '24px 24px 0 0',
        bottom: window.innerWidth < 768 ? '73px' : '0px', // Above mobile nav on mobile, at bottom on desktop
      }}
    >
      {/* Close button with background circle */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors shadow-sm z-10"
        aria-label="Close"
      >
        <X size={16} />
      </button>

      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">        {/* Content layout - horizontal alignment */}
        <div className="flex items-center justify-between gap-2">
          {/* Left side - Icon and text */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-700"
                >
                  <path
                    d="M19 11H5C3.89543 11 3 11.8954 3 13V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13C21 11.8954 20.1046 11 19 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 min-w-0 pr-2">
              {/* Title */}
              <h3 
                className="text-gray-900 mb-1 truncate"
                style={{
                  fontFamily: 'Crimson Pro, serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                }}
              >
                Unlock real connections
              </h3>

              {/* Description */}
              <p 
                className="text-black truncate"
                style={{
                  fontFamily: 'Crimson Pro, serif',
                  fontWeight: 300,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                }}
              >
                Take a short test to find your people.
              </p>
            </div>
          </div>

          {/* Right side - Button */}
          <div className="flex-shrink-0">
            <button
              onClick={handleStartTest}
              className="px-4 sm:px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity active:scale-95 transform duration-150 whitespace-nowrap text-sm sm:text-base"
              style={{
                fontFamily: 'Crimson Pro, serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '28px',
                letterSpacing: '0%',
                textAlign: 'center',
                backgroundColor: '#B56E33',
              }}
            >
              Start the test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
