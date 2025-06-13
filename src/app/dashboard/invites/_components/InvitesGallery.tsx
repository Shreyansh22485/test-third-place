"use client";

import {
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import Image from "next/image";
import { bookingService, type BookedEvent } from "@/services/booking.service";
import {
  Carousel,
  Card as AppleCard,
} from "@/components/ui/apple-cards-carousel";
import { Progress } from "@/components/ui/progress";

/* ─── Booking-details dialog ─── */
function BookingDetailsDialog({
  open,
  onClose,
  eventName,
  eventDate,
}: {
  open: boolean;
  onClose: () => void;
  eventName: string;
  eventDate: any;
}) {
  if (!open) return null;
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

        {/* all ml-2 spans got font-medium text-black for cleaner numerals */}
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-[400] text-gray-600">Event name :</span>
            <span className="ml-2 font-medium text-black">{eventName}</span>
          </div>
          <div>
            <span className="font-[400] text-gray-600">Event date &amp; time :</span>
            <span className="ml-2 font-medium  text-black uppercase"> {new Date(eventDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}{" "}
            |{" "}
            {new Date(eventDate).toLocaleTimeString("en-IN", {
              
              hour: "2-digit",
              minute: "2-digit",
            })}</span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Venue location :</span>
            <span className="ml-2 font-medium text-white px-2 py-[2px] rounded-lg bg-black text-xs">
              Koramangala
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Booking status :</span>
            <span className="ml-2 font-medium text-black px-2 py-[2px] italic rounded-md bg-[#F7E9C0] text-xs">
              WAITLISTED
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Payment status :</span>
            <span className="ml-2 font-medium text-black px-2 py-[2px] italic rounded-md bg-[#D3F1D5]  text-xs">
              SUCCESS
            </span>
          </div>
          <div>
            <span className="font-[400] text-gray-600">Amount paid :</span>
            <span className="ml-2 font-medium text-black">₹12</span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Transaction id :</span>
            <span className="ml-2 font-medium text-black truncate max-w-[110px]">
              pay_QRkYtEdG0b...
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
  const [selectedEvent, setSelectedEvent] = useState({ name: "", date: "" });

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
  const openDialog = (evt: { event_name: string; event_date: any }) => {
    setSelectedEvent({
      name: evt.event_name,
      date: evt.event_date,
    });
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
              <p className="mb-2">{evt.event_description}</p>
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
      </div>

      <BookingDetailsDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eventName={selectedEvent.name}
        eventDate={selectedEvent.date}
      />
    </div>
  );
}
