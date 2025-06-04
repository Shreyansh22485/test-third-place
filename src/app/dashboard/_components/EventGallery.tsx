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

  return (
    <div className="space-y-5 md:space-y-0">
      {/* FILTER BAR */}
      <div className="inline-block rounded-4xl border border-gray-200 p-3 md:p-2 min-w-full">
        <p className="mb-2 text-xl font-semibold italic tracking-wide">
          CURATE MY NIGHT ✨
        </p>
        <div className="relative w-full">
          <Listbox value={selectedSlug} onChange={setSelectedSlug}>
            <div className="relative">
              <Listbox.Button className="w-60 mb-2 pr-8 rounded-2xl bg-gray-100 border border-gray-300
                px-3 py-2 text-sm outline-none min-w-full appearance-none
                focus:ring-2 focus:ring-gray-300 focus:border-gray-300
                transition flex justify-between items-center">
                {selectedEvent ? selectedEvent.event_name : 'Choose your "vibe"'}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-2">
                  <path d="M4 6l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-auto">
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
      <div className="inline-block rounded-xl p-3 md:p-2 min-w-full sm:mt-3 -mt-5">
        <p className="text-[22px] font-semibold italic tracking-wide">
          YOU'RE INVITED IN&nbsp;•&nbsp;
          <span className="text-gray-400">{visibleEvents.length}</span>
        </p>
        <p className="text-[16px] text-black">
          A few special evenings are curated just for you.
        </p>
        <div className="md:hidden mt-3">
          <Progress
            value={scrollPct}
            className="h-px w-full bg-[#BDBDBD] [&>div]:bg-[#000000]"
          />
        </div>
      </div>

      {/* MOBILE: horizontal scroll cards */}
    <div
  ref={scrollRef}
  onScroll={handleScroll}
  className="md:hidden flex space-x-5 overflow-x-auto px-4 -mx-4 pb-16
             snap-x snap-mandatory scroll-smooth scrollbar-hide"
>

        {visibleEvents.map((evt) => (
          <div
            key={evt.slug}
            className="
              snap-center shrink-0
              w-[92vw] max-w-[310px]
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
