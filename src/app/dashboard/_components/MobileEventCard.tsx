"use client";

import Image from "next/image";
import { type BackendEvent } from "@/services/events.service";
import { useRouter } from "next/navigation";

export default function MobileEventCard({ evt }: { evt: BackendEvent }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/events/${evt._id}`)}
      className="flex flex-col  rounded-xl bg-white cursor-pointer max-w-[340px] mx-auto"
      style={{
        maxHeight: "100vh", // Prevents vertical scroll on mobile
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
      >
        <Image
          src={evt.imageUrls?.[0] || evt.cover_photo_link || "/1.png"}
          alt={evt.title || evt.event_name || "Event"}
          fill
          className="object-cover rounded-xl transition-transform duration-200 hover:scale-105"
          priority
        />
        <span className="absolute bottom-3 right-3 mb-0.5 mr-0.5 italic rounded-md bg-black/70 px-2 py-1 text-[14px] font-[400] uppercase text-white backdrop-blur text-right">
          {evt.startTime ? (
            <>
              {new Date(evt.startTime).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })}
              {" | "}
              {new Date(evt.startTime).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </>
          ) : (
            "TBD"
          )}
        </span>
      </div>

      {/* ---------- TEXT ---------- */}
      <div className="grow flex mt-1 flex-col justify-between">
        <div>
          <h3 className="text-base text-[22px] font-[500] leading-snug">
            {evt.title || evt.event_name || "Event Title"}
          </h3>
          <p className="text-[16px] font-[300] -mt-2 text-black">
            {evt.eventLocation?.venueName || evt.location || "Location TBD"}
          </p>
        </div>
      </div>
    </div>
  );
}