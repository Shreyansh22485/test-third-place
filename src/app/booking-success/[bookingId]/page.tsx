'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, XCircle, Clock } from 'lucide-react';
import { bookingService, type BookedEvent } from '@/services/booking.service';
import { paymentService } from '@/services/payment.service';
import { useRazorpay } from '@/hooks/useRazorpay';
import { BookingSuccessSkeleton } from '@/components/ui/skeleton';

interface PageProps {
  params: Promise<{ bookingId: string }>;
}

// Global flag to prevent multiple Razorpay instances
let isRazorpayOpen = false;

export default function BookingSuccessPage({ params }: PageProps) {
  const searchParams = useSearchParams();
  const { openRazorpay } = useRazorpay();
  const [booking, setBooking] = useState<BookedEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const paymentInitializedRef = useRef(false);
  
  // Get payment details from URL params
  const orderId = searchParams.get('orderId');
  const razorpayKey = searchParams.get('razorpayKey');
  const amount = searchParams.get('amount');
  const currency = searchParams.get('currency');
  const eventName = searchParams.get('eventName');
  const eventId = searchParams.get('eventId');
  const userName = searchParams.get('userName');
  const userEmail = searchParams.get('userEmail');
  const userContact = searchParams.get('userContact');

  const handleRazorpayPayment = async (bookingId: string) => {
    try {
      console.log('💳 Starting Razorpay payment for booking:', bookingId);
      
      if (isRazorpayOpen) {
        console.log('⚠️ Razorpay is already open, skipping...');
        return;
      }
      
      // Clean up URL parameters
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
      
      isRazorpayOpen = true;
      
      // Small delay to ensure processing UI is shown
      await new Promise(resolve => setTimeout(resolve, 500));
      
      openRazorpay({
        key: razorpayKey!,
        amount: parseInt(amount!) * 100,
        currency: currency || 'INR',
        name: 'The Third Place',
        description: `Booking for ${eventName}`,
        order_id: orderId!,
        handler: async (response: any) => {
          try {
            console.log('✅ Payment success:', response);
            isRazorpayOpen = false;
            
            await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: bookingId,
            });            // Fetch updated booking with new payment status
            const bookingData = await bookingService.getBookingById(bookingId);
            console.log('📦 Updated booking data after payment:', bookingData);
            console.log('💰 Payment status:', bookingData.paymentStatus);
            setBooking(bookingData);
            
          } catch (error: any) {
            console.error('❌ Payment verification failed:', error);
            isRazorpayOpen = false;
            setPaymentError('Payment verification failed. Please contact support if payment was deducted.');
            
            try {
              await paymentService.cancelBooking(bookingId);
              const bookingData = await bookingService.getBookingById(bookingId);
              setBooking(bookingData);
            } catch (cancelError) {
              console.error('Error cancelling booking:', cancelError);
            }
          }
        },
        prefill: {
          name: userName || '',
          email: userEmail || '',
          contact: userContact || '',
        },
        theme: {
          color: '#000000',
        },
        modal: {
          ondismiss: async () => {
            try {
              console.log('❌ Payment cancelled by user');
              isRazorpayOpen = false;
              
              await paymentService.cancelBooking(bookingId);
              await paymentService.handlePaymentFailure({
                razorpay_order_id: orderId!,
                bookingId: bookingId,
                error: { code: 'USER_CANCELLED', description: 'Payment cancelled by user' }
              });
              
              const bookingData = await bookingService.getBookingById(bookingId);
              setBooking(bookingData);
              
            } catch (error) {
              console.error('Error handling payment cancellation:', error);
            }
          },
        },
      });
      
    } catch (error: any) {
      console.error('❌ Razorpay error:', error);
      isRazorpayOpen = false;
      setPaymentError(error.message || 'Payment failed');
    }
  };

  const retryPayment = async () => {
    const { bookingId } = await params;
    console.log('🔄 Retrying payment...');
    paymentInitializedRef.current = false;
    isRazorpayOpen = false;
    setPaymentError('');
    await handleRazorpayPayment(bookingId);
  };
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const { bookingId } = await params;
        
        // If we have payment details, DON'T fetch booking yet - start payment flow immediately
        if (orderId && razorpayKey && amount && !paymentInitializedRef.current) {
          console.log('🚀 Payment params found, starting payment flow...');
          paymentInitializedRef.current = true;
          setLoading(false);
          
          // Create a temporary booking object to show processing state
          setBooking({ paymentStatus: 'created' } as BookedEvent);
          
          // Start payment flow
          await handleRazorpayPayment(bookingId);
        } else {
          // No payment params, just fetch booking
          console.log('📋 No payment params, fetching existing booking...');
          const bookingData = await bookingService.getBookingById(bookingId);
          setBooking(bookingData);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('❌ Error:', err);
        setError(err.message || 'Failed to load booking');
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [params, orderId, razorpayKey, amount]);

  if (loading) {
    return <BookingSuccessSkeleton />;
  }

  // Determine the current state based on booking's paymentStatus
  const getPaymentState = () => {
    if (!booking) return 'error';
    
    switch (booking.paymentStatus) {
      case 'created':
        return 'processing';
      case 'paid':
        return 'success';
      case 'failed':
        return 'failed';
      default:
        return booking.bookingStatus === 'cancelled' ? 'cancelled' : 'success';
    }
  };

  const renderContent = () => {
    const paymentState = getPaymentState();
    
    switch (paymentState) {
      case 'processing':
        return (
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Processing Payment
            </h2>
            <p className="text-gray-600 mb-6">
              Please complete your payment in the Razorpay window...
            </p>
          </div>
        );

      case 'success':
        if (!booking) return null;
        
        return (
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h2>
            
            <p className="text-gray-600 mb-6">
              Your payment was successful and your booking has been confirmed for{' '}
              <span className="font-semibold">{booking.eventId.title}</span>.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
              <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-medium">{booking._id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Event:</span>
                <span className="font-medium">{booking.eventId.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                {new Date(booking.eventId.startTime).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats:</span>
                <span className="font-medium">{booking.numberOfSeats}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">₹{booking.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium capitalize ${booking.bookingStatus === 'waitlist' ? 'text-yellow-600' : 'text-green-600'}`}>
                {booking.bookingStatus}
                </span>
              </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/dashboard/invites"
                className="block w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition"
              >
                View Your Invites
              </Link>
              <Link
                href="/dashboard"
                className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Failed
            </h1>
            <p className="text-gray-600 mb-6">
              {paymentError || 'Your payment could not be processed. Please try again.'}
            </p>
            <div className="space-y-3">
              {orderId && (
                <button
                  onClick={retryPayment}
                  className="block w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition"
                >
                  Retry Payment
                </button>
              )}
              {eventId && (
                <Link
                  href={`/events/${eventId}`}
                  className="block w-full border border-black text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Go Back to Event
                </Link>
              )}
              <Link
                href="/dashboard"
                className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        );

      case 'cancelled':
        return (
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Cancelled
            </h1>
            <p className="text-gray-600 mb-6">
              You cancelled the payment. Your booking has been cancelled.
            </p>
            <div className="space-y-3">
              <button
                onClick={retryPayment}
                className="block w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Try Again
              </button>
              {eventId && (
                <Link
                  href={`/events/${eventId}`}
                  className="block w-full border border-black text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Go Back to Event
                </Link>
              )}
              <Link
                href="/dashboard"
                className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        );

      case 'error':
      default:
        return (
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              {error || 'Unable to load booking details'}
            </p>
            <Link
              href="/dashboard"
              className="block w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        );
    }
  };

  const getHeaderTitle = () => {
    const paymentState = getPaymentState();
    switch (paymentState) {
      case 'processing': return 'PROCESSING PAYMENT';
      case 'success': return 'BOOKING CONFIRMED';
      default: return 'PAYMENT STATUS';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="flex h-[58px] items-center justify-between border-b border-[#E5E5EA] px-4">
        <Link href="/dashboard" className="p-1 text-black">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold italic tracking-wide">
          {getHeaderTitle()}
        </h1>
        <span className="h-5 w-5" />
      </header>

      <div className="flex items-center justify-center px-4 py-12">
        {renderContent()}
      </div>
    </div>
  );
}
