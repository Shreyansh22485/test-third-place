"use client";

import Image from "next/image";
import { type BackendEvent } from "@/services/events.service";
import { useRouter } from "next/navigation";

export default function MobileEventCard({ evt }: { evt: BackendEvent }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/events/${evt._id}`)}
      className="flex flex-col overflow-hidden rounded-xl  bg-white cursor-pointer max-w-[340px] mx-auto"
      style={{
        maxHeight: '100vh', // Prevents vertical scroll on mobile
      }}
    >
      {/* ---------- HERO IMAGE ---------- */}
      <div
        className="
          relative flex-shrink-0
          w-[322px] h-[362px] mx-auto
          md:w-full md:h-56
          overflow-hidden rounded-xl
        "
      >        <Image
          src={evt.imageUrls?.[0] || evt.cover_photo_link || '/1.png'}
          alt={evt.title || evt.event_name || 'Event'}
          fill
          className="object-cover rounded-3xl transition-transform duration-200 hover:scale-105"
          priority
        />
        <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
          {evt.startTime ? new Date(evt.startTime).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          }) : 'TBD'}
        </span>
      </div>

      {/* ---------- TEXT ---------- */}
      <div className="grow flex flex-col justify-between">
        <div>
          <h3 className="text-base text-[22px] font-[500] leading-snug">{evt.title || evt.event_name || 'Event Title'}</h3>
          <p className="text-[16px] font-[300] -mt-2 text-black">{evt.eventLocation?.venueName || evt.location || 'Location TBD'}</p>
        </div>
      </div>
    </div>
  );
}
