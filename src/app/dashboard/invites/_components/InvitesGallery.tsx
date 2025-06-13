"use client";

import {
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import Image from "next/image";
import { bookingService, type BookedEvent } from "@/services/booking.service";
import { paymentService } from "@/services/payment.service";
import {
  Carousel,
  Card as AppleCard,
} from "@/components/ui/apple-cards-carousel";
import { Progress } from "@/components/ui/progress";

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

  // Fetch payment details when dialog opens
  useEffect(() => {
    if (open && booking) {
      setLoadingPayment(true);
      paymentService.getPaymentByBookingId(booking._id)
        .then(setPaymentDetails)
        .catch(error => {
          console.error('Error fetching payment details:', error);
          setPaymentDetails(null);
        })
        .finally(() => setLoadingPayment(false));
    }
  }, [open, booking]);

  if (!open || !booking) return null;

  // Format booking status for display
  const getBookingStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending_payment':
        return { text: 'PENDING PAYMENT', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' };
      case 'confirmed':
        return { text: 'CONFIRMED', bgColor: 'bg-green-100', textColor: 'text-green-700' };
      case 'cancelled':
        return { text: 'CANCELLED', bgColor: 'bg-red-100', textColor: 'text-red-700' };
      case 'completed':
        return { text: 'COMPLETED', bgColor: 'bg-blue-100', textColor: 'text-blue-700' };
      default:
        return { text: 'WAITLISTED', bgColor: 'bg-[#F7E9C0]', textColor: 'text-black' };
    }
  };
  // Format payment status for display
  const getPaymentStatusDisplay = (bookingStatus: string, paymentData: any) => {
    // If we have payment data, use the actual payment status
    if (paymentData) {
      switch (paymentData.status) {
        case 'paid':
          return { text: 'SUCCESS', bgColor: 'bg-[#D3F1D5]', textColor: 'text-black' };
        case 'failed':
          return { text: 'FAILED', bgColor: 'bg-red-100', textColor: 'text-red-700' };
        case 'refunded':
          return { text: 'REFUNDED', bgColor: 'bg-red-100', textColor: 'text-red-700' };
        case 'created':
        case 'pending':
        default:
          return { text: 'PENDING', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' };
      }
    }

    // Fallback to booking status if no payment data
    switch (bookingStatus) {
      case 'pending_payment':
        return { text: 'PENDING', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' };
      case 'confirmed':
      case 'completed':
        return { text: 'SUCCESS', bgColor: 'bg-[#D3F1D5]', textColor: 'text-black' };
      case 'cancelled':
        return { text: 'REFUNDED', bgColor: 'bg-red-100', textColor: 'text-red-700' };
      default:
        return { text: 'PENDING', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' };
    }
  };

  const bookingStatusDisplay = getBookingStatusDisplay(booking.bookingStatus);
  const paymentStatusDisplay = getPaymentStatusDisplay(booking.bookingStatus, paymentDetails);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-xs rounded-2xl bg-white p-5 shadow-xl border border-gray-200 font-serif">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-black/70 hover:text-black"
        >
          ×
        </button>
        <h2 className="mb-2 text-[18px] font-[500]">Booking details</h2>

        {loadingPayment && (
          <div className="flex items-center justify-center py-4">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-black"></div>
            <span className="ml-2 text-sm text-gray-600">Loading payment details...</span>
          </div>
        )}

        {/* all ml-2 spans got font-medium text-black for cleaner numerals */}        <div className="space-y-1 text-sm">
          <div>
            <span className="font-[400] text-gray-600">Event name :</span>
            <span className="ml-2 font-medium text-black">{booking.eventId.title}</span>
          </div>
          <div>
            <span className="font-[400] text-gray-600">Event date &amp; time :</span>
            <span className="ml-2 font-medium text-black uppercase">
              {new Date(booking.eventId.startTime).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}{" "}
              |{" "}
              {new Date(booking.eventId.startTime).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Venue location :</span>
            <span className="ml-2 font-medium text-white px-2 py-[2px] rounded-lg bg-black text-xs">
              {booking.eventId.eventLocation?.venueName || "Location TBD"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Number of seats :</span>
            <span className="ml-2 font-medium text-black">
              {booking.numberOfSeats}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Booking status :</span>
            <span className={`ml-2 font-medium px-2 py-[2px] italic rounded-md text-xs ${bookingStatusDisplay.bgColor} ${bookingStatusDisplay.textColor}`}>
              {bookingStatusDisplay.text}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Payment status :</span>
            <span className={`ml-2 font-medium px-2 py-[2px] italic rounded-md text-xs ${paymentStatusDisplay.bgColor} ${paymentStatusDisplay.textColor}`}>
              {paymentStatusDisplay.text}
            </span>
          </div>          <div>
            <span className="font-[400] text-gray-600">Amount paid :</span>
            <span className="ml-2 font-medium text-black">₹{booking.totalAmount}</span>
          </div>
          {paymentDetails && paymentDetails.razorpayPaymentId ? (
            <div className="flex items-center">
              <span className="font-[400] text-gray-600">Transaction ID :</span>
              <span className="ml-2 font-medium text-black truncate max-w-[110px]" title={paymentDetails.razorpayPaymentId}>
                {paymentDetails.razorpayPaymentId.slice(0, 12)}...
              </span>
            </div>
          ) : paymentDetails && paymentDetails.razorpayOrderId ? (
            <div className="flex items-center">
              <span className="font-[400] text-gray-600">Order ID :</span>
              <span className="ml-2 font-medium text-black truncate max-w-[110px]" title={paymentDetails.razorpayOrderId}>
                {paymentDetails.razorpayOrderId.slice(0, 12)}...
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="font-[400] text-gray-600">Transaction ID :</span>
              <span className="ml-2 font-medium text-gray-500 text-xs">
                N/A
              </span>
            </div>
          )}
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Booking ID :</span>
            <span className="ml-2 font-medium text-black truncate max-w-[110px]" title={booking._id}>
              {booking._id.slice(-8)}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-black py-2 text-sm font-medium text-white shadow hover:bg-neutral-900 transition"
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

  /* Fetch bookings */
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

  /* Normalised events */
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

  /* Update progress bar on scroll */
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
    onScroll(); // initial
    return () => el.removeEventListener("scroll", onScroll);
  }, [displayEvents.length]);
  /* Open dialog */
  const openDialog = (evt: any) => {
    setSelectedBooking(evt.booking);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-black" />
          <p className="mt-2 text-gray-600">Loading your invites...</p>
        </div>
      </div>
    );
  }

  /* Desktop cards */
  const appleCards = displayEvents.map((evt, idx) => (
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
              <div className="text-sm font-medium text-green-600">
                ✓ Booking Confirmed – {evt.booking.numberOfSeats} seat(s)
              </div>
            </div>
          ),
        }}
      />
    </div>
  ));

  /* Mobile cards */
  const mobileCards = displayEvents.map((evt) => (
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
        </div>
        <div className="mt-1 flex grow flex-col justify-between px-4 pb-4">
          <h3 className="text-[22px] font-[500] leading-snug">{evt.event_name}</h3>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center rounded-xl p-3 md:p-2">
        <p className="font-[500] text-[18px]" >A few special evenings are waiting –</p>
        <p className="font-[500] text-[18px]">curated just for you</p>
        {displayEvents.length > 1 && (
          <div className="md:hidden mt-2 -mb-2">
            <Progress
              value={progressVal}
              className="h-px w-[348px] bg-[#BDBDBD] [&>div]:bg-[#000]"
            />
          </div>
        )}
      </div>

      {/* Mobile slider */}
      <div
        ref={scrollRef}
        className="md:hidden flex space-x-5 overflow-x-auto px-4.5 -mx-4 pb-16 snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {mobileCards}
      </div>

      {/* Desktop carousel */}
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
