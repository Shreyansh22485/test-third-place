"use client";

import {
  useState,
  useMemo,
  useRef,
  useEffect,
  UIEvent,
} from "react";
import Link from "next/link";
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
  eventDate: string;
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
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-[400] text-gray-600">Event name :</span>
            <span className="ml-2">{eventName}</span>
          </div>
          <div>
            <span className="font-[400]  text-gray-600 upp">Event date &amp; time :</span>
            <span className="ml-2  uppercase">{eventDate}</span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Venue location :</span>
            <span className="ml-2 px-2 py-[2px] rounded-lg bg-black text-white border text-xs font-[500">
              Koramangala
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Booking status :</span>
            <span className="ml-2 px-2 py-[2px] italic rounded-md bg-[#F7E9C0] text-[#8E713B] text-xs font-semibold">
              WAITLISTED
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Payment status :</span>
            <span className="ml-2 px-2 py-[2px] italic rounded-md bg-[#D3F1D5] text-[#296143] text-xs font-[500]">
              SUCCESS
            </span>
          </div>
          <div>
            <span className="font-[400] text-gray-600">Amount paid :</span>
            <span className="ml-2">₹12</span>
          </div>
          <div className="flex items-center">
            <span className="font-[400] text-gray-600">Transaction id :</span>
            <span className="ml-2 truncate max-w-[110px]">pay_QRkYtEdG0b...</span>
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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({ name: "", date: "" });

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

  const openDialog = (evt: { event_name: string; event_date: Date | string }) => {
    setSelectedEvent({
      name: evt.event_name,
      date: new Date(evt.event_date).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    });
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-black"></div>
          <p className="mt-2 text-gray-600">Loading your invites...</p>
        </div>
      </div>
    );
  }

  /* desktop carousel items */
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

  /* mobile cards inlined — identical to MobileEventCard UI */
  const mobileCards = displayEvents.map((evt) => (
    <div
      key={evt._id}
      className="snap-center shrink-0 w-[92vw] max-w-[340px] mx-auto h-[52vh] cursor-pointer"
      onClick={() => openDialog(evt)}
    >
      <div
        className="flex flex-col rounded-xl bg-white"
        style={{ maxHeight: "100vh" }}
      >
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
          <h3 className="text-[22px] font-[500] leading-snug">
            {evt.event_name}
          </h3>
          <p className="-mt-2 text-[16px] font-[300] text-black">
            {evt.event_location}
          </p>
        </div>
      </div>
    </div>
  ));

  const activeIdx = (() => {
    if (!scrollRef.current) return 0;
    const el = scrollRef.current;
    const card = el.querySelector("div > div");
    const w = card?.clientWidth || 1;
    return Math.min(Math.round(el.scrollLeft / (w + 20)), displayEvents.length - 1);
  })();
  const progressVal = displayEvents.length
    ? ((activeIdx + 1) / displayEvents.length) * 100
    : 0;

  return (
    <div className="space-y-5 pl-1 md:space-y-0">
      {/* header + progress */}
      <div className="inline-block min-w-full rounded-xl p-3 pl-1 md:p-2">
        <p className="text-center text-[18px] -mt-1">
          {displayEvents.length
            ? `You have ${displayEvents.length} confirmed booking${
                displayEvents.length > 1 ? "s" : ""
              } –`
            : "No confirmed bookings yet –"}
        </p>
        <p className="text-center text-[18px] -mt-1">
          {displayEvents.length
            ? "ready for amazing experiences!"
            : "curated experiences await you."}
        </p>
        {displayEvents.length > 1 && ( // only show slider when 2+ events
          <div className="md:hidden mt-2 -mb-5">
            <Progress
              value={progressVal}
              className="h-px w-[348px] bg-[#BDBDBD] [&>div]:bg-[#000]"
            />
          </div>
        )}
      </div>

      {displayEvents.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-500">No confirmed bookings yet</p>
          <Link
            href="/dashboard"
            className="inline-block rounded-full bg-black px-6 py-2 text-white transition hover:bg-gray-800"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <>
          {/* mobile: conditional slider vs single */}
          {displayEvents.length > 1 ? (
            <div
              ref={scrollRef}
              className="md:hidden flex space-x-5 overflow-x-auto px-4.5 -mx-4 pb-16 snap-x snap-mandatory scroll-smooth scrollbar-hide"
            >
              {mobileCards}
            </div>
          ) : (
            <div className="md:hidden">{mobileCards[0]}</div>
          )}

          {/* desktop carousel */}
          <div className="hidden w-full -mt-12 md:block">
            <Carousel items={appleCards} />
          </div>
        </>
      )}

      <BookingDetailsDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eventName={selectedEvent.name}
        eventDate={selectedEvent.date}
      />
    </div>
  );
}
