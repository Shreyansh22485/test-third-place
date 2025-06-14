"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { bookingService, type BookedEvent } from "@/services/booking.service";
import { paymentService } from "@/services/payment.service";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Carousel,
  Card as AppleCard,
} from "@/components/ui/apple-cards-carousel";
import { Progress } from "@/components/ui/progress";
import { MapPin, Copy as CopyIcon, CornerUpRight } from "lucide-react";

/* ─── Helper functions ─── */
// booking status display
const getBookingStatusDisplay = (status: string) => {
  switch (status) {
    case "pending_payment":
      return { text: "PENDING PAYMENT", bgColor: "bg-yellow-100", textColor: "text-yellow-700", indicator: "🕐" };
    case "confirmed":
      return { text: "CONFIRMED", bgColor: "bg-green-100", textColor: "text-green-700", indicator: "✅" };
    case "cancelled":
      return { text: "CANCELLED", bgColor: "bg-red-100", textColor: "text-red-700", indicator: "❌" };
    case "completed":
      return { text: "COMPLETED", bgColor: "bg-blue-100", textColor: "text-blue-700", indicator: "🎉" };
    default:
      return { text: "WAITLISTED", bgColor: "bg-orange-100", textColor: "text-orange-700", indicator: "⏳" };
  }
};

// payment status display
const getPaymentStatusDisplay = (bookingStatus: string, pd: any) => {
  if (pd) {
    switch (pd.status) {
      case "paid":
        return { text: "SUCCESS", bgColor: "bg-green-100", textColor: "text-green-700" };
      case "failed":
        return { text: "FAILED", bgColor: "bg-red-100", textColor: "text-red-700" };
      case "refunded":
        return { text: "REFUNDED", bgColor: "bg-red-100", textColor: "text-red-700" };
      default:
        return { text: "PENDING", bgColor: "bg-yellow-100", textColor: "text-yellow-700" };
    }
  }
  // fallback based on booking status
  switch (bookingStatus) {
    case "pending_payment":
      return { text: "PENDING", bgColor: "bg-yellow-100", textColor: "text-yellow-700" };
    case "confirmed":
    case "waitlist":
      return { text: "SUCCESS", bgColor: "bg-green-100", textColor: "text-green-700" };
    case "cancelled":
      return { text: "CANCELLED", bgColor: "bg-red-100", textColor: "text-red-700" };
    default:
      return { text: "PENDING", bgColor: "bg-yellow-100", textColor: "text-yellow-700" };
  }
};

/* ─── Booking-details dialog ─── */
function BookingDetailsDialog({
  open,
  onClose,
  booking,

}: {
  open: boolean;
  onClose: () => void;
  booking: BookedEvent | null;
}) {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open && booking) {
      setLoadingPayment(true);
      paymentService
        .getPaymentByBookingId(booking._id)
        .then(setPaymentDetails)
        .catch(() => setPaymentDetails(null))
        .finally(() => setLoadingPayment(false));
    }
  }, [open, booking]);

  if (!open || !booking) return null;
  // date/time labels
  const dt = new Date(booking.eventId.startTime);
  const dateLabel = dt.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
  const timeLabel = dt.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const bookingStatusDisplay = getBookingStatusDisplay(booking.bookingStatus);
  const paymentStatusDisplay = getPaymentStatusDisplay(
    booking.bookingStatus,
    paymentDetails
  );

  // transaction id logic
  const txId =
    paymentDetails?.razorpayPaymentId ||
    paymentDetails?.razorpayOrderId ||
    null;
  const txLabel = paymentDetails?.razorpayPaymentId
    ? "Transaction ID"
    : paymentDetails?.razorpayOrderId
    ? "Order ID"
    : "Transaction ID";

  const handleCopy = () => {
    if (txId) {
      navigator.clipboard.writeText(txId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 w-[360px] rounded-2xl bg-white p-5 shadow-xl border border-gray-200">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-2 right-4 text-black/70 text-3xl hover:text-black leading-none"
        >
          ×
        </button>

        <h2 className="mb-2 text-[18px] font-[500]">Booking details</h2>        {loadingPayment && (
          <div className="space-y-3 py-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
          </div>
        )}

        <div className="space-y-1 text-[16px] ">
          <div>
            <span className="font-[400] text-gray-600">Event name :</span>
            <span className="ml-2 font-medium text-black">
              {booking.eventId.title}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-[400] text-gray-600">
              Event date &amp; time :
            </span>
            <span className="ml-2 font-medium text-black uppercase">
              {dateLabel} | {timeLabel}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Venue location :</span>
            <span className="ml-2 inline-flex items-center font-[400] text-white px-2 py-[2px] rounded-lg bg-black text-xs">
              
              {booking.eventId.eventLocation?.venueName || "Location TBD"}
              <CornerUpRight className="h-4 w-4 ml-1" />
            </span>
          </div>

          {/* <div className="flex items-center">
            <span className="font-[400] text-gray-600">Number of seats :</span>
            <span className="ml-2 font-medium text-black">
              {booking.numberOfSeats}
            </span>
          </div> */}

          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Booking status :</span>
            <span
              className={`ml-2 font-medium px-2 py-[2px] italic rounded-md text-xs ${bookingStatusDisplay.bgColor} ${bookingStatusDisplay.textColor}`}
            >
              {bookingStatusDisplay.text}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Payment status :</span>
            <span
              className={`ml-2 font-medium px-2 py-[2px] italic rounded-md text-xs ${paymentStatusDisplay.bgColor} ${paymentStatusDisplay.textColor}`}
            >
              {paymentStatusDisplay.text}
            </span>
          </div>

          <div>
            <span className="font-[400] text-gray-600">Amount paid :</span>
            <span className="ml-2 font-medium text-black">
              ₹{booking.totalAmount}
            </span>
          </div>

          <div className="flex items-center">
            <span className="font-[400] text-gray-600">{txLabel} :</span>
            {txId ? (
              <button
                onClick={handleCopy}
                className="ml-2 inline-flex items-center font-medium text-black hover:text-gray-700"
              >
                <span className="truncate max-w-[90px]" title={txId}>
                  {txId.slice(0, 12)}…
                </span>
                <CopyIcon className="h-4 w-4 ml-1 text-gray-500 hover:text-gray-800" />
                {copied && (
                  <span className="ml-1 text-xs text-green-600">Copied!</span>
                )}
              </button>
            ) : (
              <span className="ml-2 font-medium text-gray-500 text-xs">N/A</span>
            )}
          </div>

          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Booking ID :</span>
            <span
              className="ml-2 font-medium text-black truncate max-w-[110px]"
              title={booking._id}
            >
              {booking._id.slice(-8)}
            </span>
          </div>        </div>

        {/* Waitlist explanation */}
        {booking.bookingStatus === 'waitlist' && (
          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>⏳ You're on the waitlist!</strong> Your payment has been processed successfully. 
              You'll be notified once the organizer confirms your spot.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-3 self-start w-25 rounded-lg bg-black py-2 text-[16px] font-medium text-white shadow hover:bg-neutral-900 transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function InvitesGallery() {
  const [bookedEvents, setBookedEvents] = useState<BookedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [progressVal, setProgressVal] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookedEvent | null>(null);


  useEffect(() => {
    (async () => {
      try {
        const data = await bookingService.getConfirmedBookings();
        setBookedEvents(data);
      } catch {
        setBookedEvents([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const displayEvents = useMemo(
    () =>
      bookedEvents.map((b) => ({
        ...b.eventId,
        event_name: b.eventId.title,
        event_location: b.eventId.eventLocation?.venueName || "Location TBD",
        cover_photo_link: b.eventId.imageUrls?.[0] || "/placeholder-event.jpg",
        event_date: b.eventId.startTime,
        booking: b,
        _id: b.eventId._id,
      })),
    [bookedEvents]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || displayEvents.length <= 1) return;
    const onScroll = () => {
      const card = el.querySelector("div > div");
      const w = card?.clientWidth ?? 1;
      const idx = Math.min(
        Math.round(el.scrollLeft / (w + 20)),
        displayEvents.length - 1
      );
      setProgressVal(((idx + 1) / displayEvents.length) * 100);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [displayEvents.length]);
  /* Open dialog */
  const openDialog = (evt: any) => {
    setSelectedBooking(evt.booking);
    setModalOpen(true);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] px-4 pt-4">
        {/* Mobile skeleton */}
        <div className="md:hidden">
          <div className="snap-center shrink-0 w-[92vw] max-w-[340px] mx-auto h-[52vh]">
            <div className="flex flex-col rounded-xl bg-white shadow-sm">
              <Skeleton className="h-[362px] w-[322px] mx-auto rounded-xl" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 px-4">
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        </div>

        {/* Desktop skeleton */}
        <div className="hidden md:block mt-12">
          <div className="flex gap-6 justify-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative h-96 w-80 rounded-3xl bg-white shadow-lg overflow-hidden">
                <Skeleton className="h-60 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const appleCards = displayEvents.map((evt, idx) => {
    const bookingStatusDisplay = getBookingStatusDisplay(evt.booking.bookingStatus);
    
    return (
      <div
        key={evt._id}
        onClickCapture={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openDialog(evt);
        }}
        className="cursor-pointer"
      >
        <AppleCard
          index={idx}
          enableModal={false}
          card={{
            category: evt.event_location,
            title: evt.event_name,
            src: evt.cover_photo_link,
            content: (
              <div className="mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-xl">
                <p className="mb-2">{evt.description}</p>
                <p className="mb-2">{evt.description}</p>
                <div className={`text-sm font-medium ${bookingStatusDisplay.textColor} flex items-center gap-1`}>
                  <span>{bookingStatusDisplay.indicator}</span>
                  {bookingStatusDisplay.text} – {evt.booking.numberOfSeats} seat(s)
                </div>
              </div>
            ),
          }}
        />
      </div>
    );
  });
  const mobileCards = displayEvents.map((evt) => {
    const bookingStatusDisplay = getBookingStatusDisplay(evt.booking.bookingStatus);
    
    return (
      <div
        key={evt._id}
        className="snap-center shrink-0 w-[92vw] max-w-[340px] mx-auto h-[52vh] cursor-pointer"
        onClick={() => openDialog(evt)}
      >
        <div className="flex flex-col rounded-xl bg-white" style={{ maxHeight: "100vh" }}>
          <div className="relative flex-shrink-0 w-[322px] h-[362px] mx-auto overflow-hidden rounded-xl">
            <Image
              src={evt.cover_photo_link}
              alt={evt.event_name}
              fill
              className="object-cover rounded-xl transition-transform duration-200 hover:scale-105"
              priority
            />
            {/* Date/Time badge */}
            <span className="absolute bottom-3 right-3 italic rounded-md bg-black/70 px-2 py-1 text-[14px] font-[400] uppercase text-white backdrop-blur">
              {new Date(evt.event_date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })}{" "}
              |{" "}
              {new Date(evt.event_date).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            
            {/* Booking status indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2 py-1 text-[12px] font-medium">
              <span className="text-[14px]">{bookingStatusDisplay.indicator}</span>
              <span className={`${bookingStatusDisplay.textColor}`}>
                {bookingStatusDisplay.text}
              </span>
            </div>
          </div>
          <div className="mt-1 flex grow flex-col justify-between px-4 pb-4">
            <h3 className="text-[22px] font-[500] leading-snug">{evt.event_name}</h3>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="space-y-5">
      <div className="text-center rounded-xl p-3 md:p-2">
        <p className="font-[500] text-[18px]">A few special evenings are waiting –</p>
        <p className="font-[500] text-[18px]">curated just for you</p>
        {displayEvents.length > 1 && (
          <div className="md:hidden mt-2  -mb-2">
            <Progress
              value={progressVal}
              className="h-px w-[348px] bg-[#BDBDBD] [&>div]:bg-[#000]"
            />
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className="md:hidden flex space-x-5  overflow-x-auto px-4.5 -mx-4 pb-16 snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {mobileCards}
      </div>

      <div className="hidden md:block -mt-12">
        <Carousel items={appleCards} />
      </div>      <BookingDetailsDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        booking={selectedBooking}

      />
    </div>
  );
}
