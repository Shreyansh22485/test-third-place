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
import { events, type Event } from "../../events";
import { Carousel, Card as AppleCard } from "@/components/ui/apple-cards-carousel";
import MobileEventCard from "../../_components/MobileEventCard";
import { Progress } from "@/components/ui/progress";

export default function InvitesGallery() {
  const [scrollPct, setScrollPct] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // For this example, showing all events as invites
  // You can filter this based on actual invite data
  const visibleEvents: Event[] = events;

  const appleCards = visibleEvents.map((evt, index) => (
    <div
      key={evt.slug}
      onClick={() => router.push(`/events/${evt.slug}`)}
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
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto">
              {evt.event_description ?? "Tap to learn more"}
            </p>
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
    return Math.min(idx, visibleEvents.length - 1);
  };
  const activeIndex = getActiveIndex();
  const progressValue = visibleEvents.length
    ? ((activeIndex + 1) / visibleEvents.length) * 100
    : 0;

  return (
    <div className="space-y-5 pl-1 md:space-y-0">
      {/* YOUR INVITES HEADER + PROGRESS */}
      <div className="inline-block pl-1 rounded-xl p-3  justify-centre md:p-2 min-w-full">
        <p className="text-[18px] -mt-1 text-center">
          A few special evenings are waiting -</p>
          <p className="text-[18px] -mt-1 text-center">
           curated just for you.
        </p>
        <div className="md:hidden mt-2 -mb-5">
          <Progress
            value={progressValue}
            className="h-px w-[348px] bg-[#BDBDBD] [&>div]:bg-[#000000]"
          /> 
        </div>
      </div>

      {/* MOBILE: horizontal scroll cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="md:hidden flex space-x-5 overflow-x-auto px-4.5 -mx-4 pb-16
                   snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {visibleEvents.map((evt) => (
          <div
            key={evt.slug}
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
    </div>
  );
}