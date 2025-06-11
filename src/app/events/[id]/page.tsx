"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Gift,
  Calendar,
  TicketPlus,
  Info,
  X as XIcon,
} from "lucide-react";

import { eventService, type BackendEvent } from "@/services/events.service";
import { paymentService } from "@/services/payment.service";
import { personalityTestService } from "@/services/personalityTest.service";
import { useRazorpay } from "@/hooks/useRazorpay";
import PaymentUtils from "@/utils/payment.utils";
import { useUser } from "@/hooks/useUser";

type PageProps = { params: any };

export default function EventPage({ params }: PageProps) {
  const [event, setEvent] = useState<BackendEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const router = useRouter();
  const { openRazorpay } = useRazorpay();
  const { user } = useUser();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { id } = await params;
        const fetchedEvent = await eventService.getEventById(id);
        setEvent(fetchedEvent);
      } catch (error) {
        console.error('Error fetching event:', error);
        return notFound();
      }
    };

    fetchEvent();
  }, [params]);

  if (!event) return <div>Loading...</div>;  const handleContinue = async () => {
    try {
      setIsLoading(true);

      // Log payment initiation
      PaymentUtils.logPaymentActivity('PAYMENT_INITIATED', {
        eventId: event._id,
        eventName: event.title,
        numberOfSeats,
        totalAmount: event.experienceTicketPrice + event.price
      });

      // 1. Check if personality test is completed
      const testStatus = await personalityTestService.getTestStatus();
      
      if (!testStatus.personalityTestCompleted) {
        router.push('/personality-test');
        return;
      }

      // 2. Create payment order
      const orderResponse = await paymentService.createPaymentOrder(event._id, numberOfSeats);
      
      PaymentUtils.logPaymentActivity('ORDER_CREATED', {
        orderId: orderResponse.data.orderId,
        bookingId: orderResponse.data.bookingId,
        amount: orderResponse.data.amount
      });

      // 3. Validate order response
      if (!orderResponse.data.orderId || !orderResponse.data.razorpayKeyId) {
        throw new Error('Invalid order response from server');
      }      // 4. Open Razorpay checkout
      await openRazorpay({
        key: orderResponse.data.razorpayKeyId,
        amount: orderResponse.data.amount * 100, // Backend sends in rupees, Razorpay needs paise
        currency: orderResponse.data.currency || 'INR',
        name: 'The Third Place',
        description: `Booking for ${orderResponse.data.event.name}`,
        order_id: orderResponse.data.orderId,
        handler: async (response: any) => {
          try {
            console.log('Payment success:', response);
            
            // Verify payment
            await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: orderResponse.data.bookingId,
            });

            // Redirect to success page
            router.push(`/booking-success/${orderResponse.data.bookingId}`);
          } catch (error) {
            console.error('Payment verification failed:', error);
            
            // Cancel the booking on verification failure
            await paymentService.cancelBooking(orderResponse.data.bookingId);
            
            alert('Payment verification failed. Your booking has been cancelled. Please try again.');
          }
        },
        prefill: {
          name: user ? `${user.firstName} ${user.lastName}` : '',
          email: user?.email || '',
          contact: user?.phoneNumber || '',
        },
        theme: {
          color: '#000000',
        },
        modal: {
          ondismiss: async () => {
            try {
              console.log('Payment cancelled by user');
              
              // Cancel the booking when payment is dismissed
              await paymentService.cancelBooking(orderResponse.data.bookingId);
              
              // Also call the failure handler
              await paymentService.handlePaymentFailure({
                razorpay_order_id: orderResponse.data.orderId,
                bookingId: orderResponse.data.bookingId,
                error: { code: 'USER_CANCELLED', description: 'Payment cancelled by user' }
              });
              
              console.log('Booking cancelled due to payment dismissal');
            } catch (error) {
              console.error('Error handling payment cancellation:', error);
            }
          },
        },
        retry: {
          enabled: false, // Disable retry to prevent multiple bookings
        },
      });

    } catch (error: any) {
      console.error('Payment process failed:', error);
      
      // Show user-friendly error message
      if (error.message.includes('minimum amount')) {
        alert('The order amount is too low. Please contact support.');
      } else if (error.message.includes('Invalid payment request')) {
        alert('There was an issue with your booking request. Please try again.');
      } else {
        alert(error.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  // itinerary text - use backend description or default
  const itinerary = event.description || 
    "This experience will start with dinner with your closest matches and continue with going to a nearby bar for a holiday party with a live band.";

  // pricing - use backend data
  const curationFee = event.price; // This is the curation fee from backend
  const baseFee = +(curationFee / 6).toFixed(2);
  const gstOnCuration = +(curationFee * 0.18).toFixed(2);
  const originalCuration = baseFee + gstOnCuration;
  const discountAmt = originalCuration - curationFee;
  const grandTotal = event.experienceTicketPrice + curationFee;

  // date & time - use backend startTime
  const dateObj = new Date(event.startTime);
  const dateLabel = dateObj.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const timeLabel = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-[#FAFAFA]">      {/* Sticky footer CTA */}
      <footer className="fixed inset-x-0 bottom-0 z-10 border-t border-gray-300 bg-[#FAFAFA] px-4 py-3 backdrop-blur md:px-0">
        <div className="mx-auto w-full md:max-w-lg">
          <button 
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </footer>

      {/* Main article */}
      <article className="mx-auto w-full max-w-md px-5 pb-32 pt-4 md:max-w-lg md:px-0">        {/* Header */}
        <header className="-mx-5 mb-4 flex min-w-screen items-center justify-between border-b border-[#E5E5EA] px-0">
          <Link href="/dashboard" className="p-1 text-black">
            <ArrowLeft className="mx-5 h-5 w-5" />
          </Link>
          <h2 className="flex-1 -ml-10 mb-3 text-center text-[24px] font-[500] italic tracking-wide text-black">
            YOUR INVITATION
          </h2>
          <span className="h-5 w-5" />
        </header>{/* Cover photo */}
        <div className="overflow-hidden rounded-xl border border-gray-300">
          <Image
            src={event.imageUrls[0] || '/placeholder-event.jpg'}
            alt={event.title}
            width={348}
            height={436}
            priority
            className="h-[436px] w-full object-cover"
          />
        </div>        {/* Event title */}
        <h1 className="mt-6 text-center text-lg font-semibold text-black">
          {event.title}
        </h1>

        {/* Payment Mode Indicator */}
        <div className="mt-2 text-center">
          <span className={`text-xs px-2 py-1 rounded-full ${PaymentUtils.getPaymentModeClass()}`}>
            {PaymentUtils.getPaymentModeText()}
          </span>
        </div>

        {/* Time + Location */}
        <div className="mt-3 overflow-hidden rounded-md border bg-white text-sm text-black divide-y divide-gray-300 border-gray-300">
          <div className="flex items-center gap-2 px-4 py-2">
            <Calendar className="h-4 w-4 text-black" />
            <span>
              {dateLabel} | {timeLabel}
            </span>
          </div>          <div className="flex items-center gap-2 px-4 py-2">
            <MapPin className="h-4 w-4 text-black" />
            <span>{event.eventLocation.venueName}</span>
          </div>
        </div>

        {/* Itinerary */}
        <section className="mt-6 overflow-hidden rounded-md border bg-white border-gray-300">
          <Header label="ITINERARY" />
          <p className="px-4 py-3 text-sm leading-relaxed text-black">
            {itinerary}
          </p>
        </section>

        {/* Bring a Friend */}
        <section className="mt-6 overflow-hidden rounded-md border bg-white border-gray-300">
          <div className="flex items-center justify-between px-4 py-2">
            <h3 className="text-[16px] font-semibold italic tracking-wide text-black">
              BRING A FRIEND
            </h3>
            <button className="flex items-center gap-1 rounded-md bg-gray-900 px-3 py-[3px] text-[14px] font-medium text-white">
              <TicketPlus className="h-4 w-4" /> Invite a friend
            </button>
          </div>
          <hr className="border-gray-300" />
          <div className="m-3 flex gap-3 rounded-3xl bg-[#FFF3CD] px-4 py-3 text-[13px] text-black">
            <Gift className="h-12 w-12 text-gray-800" />
            <p className="leading-snug">
              Friends attend in your group. <br />
              Your friend stays in your group throughout the experience.
            </p>
          </div>
        </section>

{/* PAYMENT SUMMARY */}
<section className="mt-6 overflow-visible rounded-md border bg-white border-gray-300 relative">
  <Header label="PAYMENT SUMMARY" />
  <div className="space-y-1 px-4 py-3 text-[13px] text-black">
    {/* 1️⃣ Ticket */}
    <Line label="Experience Ticket" value={event.experienceTicketPrice} />

    {/* 2️⃣ Curation fee (overlay + collapse) */}
    <details className="group">
      <summary className="flex cursor-pointer list-none items-start justify-between">
        {/* LEFT: text + icon + overlay */}
        <div className="relative flex items-center gap-1">
          <span className="">
            Curation fee
          </span>

          {/* hidden checkbox to drive overlay */}
          <input
            type="checkbox"
            id="curation-info"
            className="peer sr-only"
          />

          {/* only this icon toggles overlay */}
          <label
            htmlFor="curation-info"
            className="cursor-pointer"
          >
            <Info className="h-[14px] w-[14px] text-gray-500" />
          </label>

          <span className="text-gray-500">(inc. of GST)</span>

      {/* small overlay box */}
<div
  className="peer-checked:block hidden absolute top-full left-0 z-20 mt-2
             w-[280px] 
             max-h-[60vh] overflow-y-auto   instead of h-[90px] 
             rounded-md bg-[#FAFAFA] p-4 text-sm text-black shadow-lg"
>
  <div className="flex justify-between">
    <p className="whitespace-pre-line">
      This enables us to create a unique experience and
      match you with people you&apos;re most likely to vibe with.
    </p>

    <label htmlFor="curation-info" className="cursor-pointer pl-2">
      <XIcon className="h-4 w-4 text-gray-500" />
    </label>
  </div>
</div>


          {/* caret, pushed right so it never overlaps */}
      <svg
  width="18"
  height="18"
  viewBox="0 0 16 16"
  fill="none"
  className=" inline-block transition-transform group-open:rotate-180"
>
  <path
    d="M4 6l4 4 4-4"
    stroke="#222"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
        </div>

        {/* RIGHT: discount badge + prices */}
        <div className="text-right leading-[1.1]">
          <span className="inline-block rounded-md bg-green-100 px-[6px] py-[1px] text-[11px] font-medium text-green-600">
            50% off
          </span>
          <span className="block text-xs text-gray-400 line-through">
            ₹{originalCuration.toLocaleString()}
          </span>
          <span className="block font-medium">
            ₹{curationFee.toLocaleString()}
          </span>
        </div>
      </summary>

      {/* breakdown rows */}
      <div className="pl-19  space-y-0.5">
        <Line label="Base curation fee" value={baseFee} small />
        <Line
          label="Discount(- 50%)"
          value={`- ${discountAmt.toLocaleString()}`}
          small
          extraClass="text-green-600 italic"
        />
        <Line label="GST on base fee" value={gstOnCuration} small />
      </div>
    </details>

    <hr className="my-1 border-gray-300" />

    {/* 3️⃣ Grand Total */}
    <Line label="Grand Total" value={grandTotal} bold large />
  </div>
</section>


        {/* Info Boxes */}
        <section className="mt-6 overflow-hidden rounded-md border bg-white border-gray-300 text-[13px] text-black">
          <Box
            heading="YOU'RE ON THE LIST — ALMOST"
            text="You'll be notified if you're selected on the day of the experience. If not, you'll get a full refund – no questions asked."
          />
          <hr className="border-t border-gray-300 my-2" />
          <Box
            heading="EACH MEMBER CAN BRING A FRIEND"
            text="Simply add them above, before the cutoff time."
          />
        </section>
      </article>
    </div>
  );
}

/* -------------------- Helpers -------------------- */
const Header = ({ label }: { label: string }) => (
  <>
    <div className="px-4 py-2">
      <h3 className="text-[16px] font-semibold italic tracking-wide text-black">
        {label}
      </h3>
    </div>
    <hr className="border-gray-300" />
    </>
);

interface LineProps {
  label: string;
  value: number | string;
  bold?: boolean;
  large?: boolean;
  small?: boolean;
  extraClass?: string;
}
const Line = ({
  label,
  value,
  bold,
  large,
  small,
  extraClass = "",
}: LineProps) => (
  <div className="flex items-center justify-between">
    <span
      className={`${small ? "text-[12px]" : ""} ${
        bold ? "font-medium" : ""
      } ${extraClass}`}
    >
      {label}
    </span>
    <span
      className={`${small ? "text-[12px]" : large ? "text-[15px]" : "text-[13px]"} ${
        bold || large ? "font-semibold" : ""
      } ${extraClass}`}
    >
      {typeof value === "number" ? `₹${value.toLocaleString()}` : value}
    </span>
  </div>
);

const Box = ({ heading, text }: { heading: string; text: string }) => (
  <div className="px-4 py-3">
    <h4 className="text-[16px] font-semibold italic tracking-wide text-black">
      {heading}
    </h4>
    <p className="mt-1 text-sm leading-snug text-black">{text}</p>
  </div>
);
