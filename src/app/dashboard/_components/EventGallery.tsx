"use client";

import {
  useState,
  useMemo,
  useRef,
  useEffect,
  UIEvent,
  Fragment,
} from "react";
import { Listbox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { events, type Event } from "../events";
import { Carousel, Card as AppleCard } from "@/components/ui/apple-cards-carousel";
import MobileEventCard from "./MobileEventCard";
import { Progress } from "@/components/ui/progress";

export default function EventGallery() {
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [scrollPct, setScrollPct] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const visibleEvents: Event[] = useMemo(
    () =>
      selectedSlug ? events.filter((e) => e.slug === selectedSlug) : events,
    [selectedSlug]
  );

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
              {evt.short_description ?? "Tap to learn more"}
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      setScrollPct(0);
    }
  }, [selectedSlug]);

  // For Listbox display
  const selectedEvent = selectedSlug
    ? events.find((e) => e.slug === selectedSlug)
    : null;

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
      {/* FILTER BAR */}
      <div className="inline-block rounded-2xl border border-gray-200 p-3 md:p-2 min-w-full md:mb-8">
        <p className="mb-2 text-[22px] -mt-3 font-[500px] italic tracking-wide">
          CURATE MY NIGHT ✨
        </p>
        <div className="relative w-full">
          <Listbox value={selectedSlug} onChange={setSelectedSlug}>
            <div className="relative">
          <Listbox.Button
  /* added `relative` and tweaked right-padding */
  className="relative w-60 -mt-1 pr-10 text-[18px] rounded-2xl bg-gray-100 h-[35px]
             px-3 py-2 text-sm outline-none min-w-full appearance-none
             focus:ring-2 focus:ring-gray-300 focus:border-gray-300
             transition flex items-center"
>
  {selectedEvent ? (
    <span className="truncate">{selectedEvent.event_name}</span>
  ) : (
    <span className="whitespace-nowrap">
      Choose your <span className="italic">"vibe"</span>
    </span>
  )}

  {/* perfectly centred & 4 px from the right */}
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="#222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</Listbox.Button>

              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-auto list-none">
                <Listbox.Option key="" value="" as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`
                        cursor-pointer select-none px-4 py-2
                        ${active ? "bg-gray-300" : ""}
                        ${selected ? "font-semibold" : ""}
                      `}
                    >
                      All Events
                    </li>
                  )}
                </Listbox.Option>
                {events.map((evt) => (
                  <Listbox.Option
                    key={evt.slug}
                    value={evt.slug}
                    as={Fragment}
                  >
                    {({ active, selected }) => (
                      <li
                        className={`
                          cursor-pointer select-none px-4 py-2
                          ${active ? "bg-gray-300" : ""}
                          ${selected ? "font-semibold" : ""}
                        `}
                      >
                        {evt.event_name}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </div>

      {/* INVITE HEADER + PROGRESS */}
      <div className="inline-block pl-1 rounded-xl p-3 md:p-2 min-w-full sm:mt-3 -mt-7">
        <p className="text-[22px]  italic  tracking-wide">
          YOU'RE INVITED IN&nbsp;•&nbsp;
          <span className="text-gray-400">{visibleEvents.length}</span>
        </p>
        <p className="text-[16px] -mt-1 text-black">
          A few special evenings are curated just for you.
        </p>
        <div className="md:hidden mt-2 -mb-5">
          <Progress
            value={progressValue}
            className="h-px  w-[348px] bg-[#BDBDBD] [&>div]:bg-[#000000]"
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
