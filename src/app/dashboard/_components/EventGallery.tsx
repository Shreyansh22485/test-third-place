/* app/dashboard/_components/EventGallery.tsx */
"use client";

import { useState, useMemo } from "react";
import { events, type Event } from "../events";
import MobileEventCard from "./MobileEventCard";

export default function EventGallery() {
  const [selectedSlug, setSelectedSlug] = useState<string>("");

  const visibleEvents: Event[] = useMemo(
    () =>
      selectedSlug ? events.filter((e) => e.slug === selectedSlug) : events,
    [selectedSlug]
  );

  return (
    <div className="space-y-6">
      {/* ─── FILTER BAR ───────────────────────────────────────────── */}
      <div className="inline-block rounded-xl border border-gray-200 p-3 min-w-full">
        <p className="mb-2 text-sm font-semibold italic tracking-wide">
          CURATE MY NIGHT ✨
        </p>

        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="w-60 rounded-md bg-gray-200 px-3 py-2 text-sm outline-none min-w-full"
        >
          <option value="">Choose your "vibe"</option>
          {events.map((evt) => (
            <option key={evt.slug} value={evt.slug}>
              {evt.event_name}
            </option>
          ))}
        </select>
      </div>

      {/* ─── CARD GRID ─────────────────────────────────────────────── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleEvents.map((evt) => (
          <MobileEventCard key={evt.slug} evt={evt} />
        ))}
      </div>
    </div>
  );
}
