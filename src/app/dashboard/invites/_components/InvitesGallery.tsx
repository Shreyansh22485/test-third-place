"use client";

import {
  useState,
  useMemo,
  useRef,
  useEffect,
  UIEvent,
  Fragment,
} from "react";
import { useRouter } from "next/navigation";
import { bookingService, type BookedEvent } from "@/services/booking.service";
import { Carousel, Card as AppleCard } from "@/components/ui/apple-cards-carousel";
import MobileEventCard from "../../_components/MobileEventCard";
import { Progress } from "@/components/ui/progress";

export default function InvitesGallery() {
  const [bookedEvents, setBookedEvents] = useState<BookedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPct, setScrollPct] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Fetch confirmed bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await bookingService.getConfirmedBookings();
        setBookedEvents(bookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setBookedEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  // Convert BookedEvent to Event-like structure for display
  const displayEvents = useMemo(() => {
    return bookedEvents.map(booking => ({
      ...booking.eventId,
      slug: booking.eventId._id,
      event_name: booking.eventId.title,
      event_description: booking.eventId.description,
      event_location: booking.eventId.eventLocation?.venueName || 'Location TBD',
      cover_photo_link: booking.eventId.imageUrls?.[0] || '/placeholder-event.jpg',
      event_date: booking.eventId.startTime,
      event_price: booking.eventId.price,
      _id: booking.eventId._id,
      booking: booking // Include booking details for additional info
    }));
  }, [bookedEvents]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your invites...</p>
        </div>
      </div>
    );
  }
  const appleCards = displayEvents.map((evt, index) => (
    <div
      key={evt._id}
      onClick={() => router.push(`/events/${evt._id}`)}
      className="cursor-pointer"
    >
      <AppleCard
        index={index}
        enableModal={false}
        card={{
          category: evt.event_location,
          title: evt.event_name,
          src: evt.cover_photo_link,
          content: (
            <div className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto">
              <p className="mb-2">{evt.event_description}</p>
              <div className="text-sm text-green-600 font-medium">
                ✓ Booking Confirmed - {evt.booking.numberOfSeats} seat(s)
              </div>
            </div>
          ),
        }}
      />
    </div>
  ));

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const pct = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
    setScrollPct(pct);
  };
  // --- Progress bar logic for mobile ---
  const getActiveIndex = () => {
    if (!scrollRef.current) return 0;
    const el = scrollRef.current;
    const card = el.querySelector('div > div');
    const cardWidth = card?.clientWidth || 1;
    // 20 is the space-x-5 (1.25rem)
    const idx = Math.round(el.scrollLeft / (cardWidth + 20));
    return Math.min(idx, displayEvents.length - 1);
  };
  const activeIndex = getActiveIndex();
  const progressValue = displayEvents.length
    ? ((activeIndex + 1) / displayEvents.length) * 100
    : 0;

  return (
    <div className="space-y-5 pl-1 md:space-y-0">
      {/* YOUR INVITES HEADER + PROGRESS */}
      <div className="inline-block pl-1 rounded-xl p-3 justify-centre md:p-2 min-w-full">
        <p className="text-[18px] -mt-1 text-center">
          {displayEvents.length > 0 
            ? `You have ${displayEvents.length} confirmed booking${displayEvents.length > 1 ? 's' : ''} -`
            : 'No confirmed bookings yet -'}
        </p>
        <p className="text-[18px] -mt-1 text-center">
          {displayEvents.length > 0 
            ? 'ready for amazing experiences!'
            : 'curated experiences await you.'}
        </p>
        {displayEvents.length > 0 && (
          <div className="md:hidden mt-2 -mb-5">
            <Progress
              value={progressValue}
              className="h-px w-[348px] bg-[#BDBDBD] [&>div]:bg-[#000000]"
            /> 
          </div>
        )}
      </div>

      {displayEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No confirmed bookings yet</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Explore Events
          </button>
        </div>
      ) : (
        <>
          {/* MOBILE: horizontal scroll cards */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="md:hidden flex space-x-5 overflow-x-auto px-4.5 -mx-4 pb-16
                       snap-x snap-mandatory scroll-smooth scrollbar-hide"
          >
            {displayEvents.map((evt) => (
              <div
                key={evt._id}
                className="
                  snap-center shrink-0
                  w-[92vw] max-w-[315px]
                  h-[52vh]
                "
              >
                <MobileEventCard evt={evt} />
              </div>
            ))}
          </div>

          {/* DESKTOP/TABLET: carousel */}
          <div className="hidden md:block w-full -mt-12">
            <Carousel items={appleCards} />
          </div>
        </>
      )}
    </div>
  );
}