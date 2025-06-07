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
        "
      >
        <Image
          src={evt.imageUrls[0] || '/1.png'}
          alt={evt.title}
          fill
          className="object-cover transition-transform duration-200 hover:scale-105"
          priority
        />
        <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
          {new Date(evt.startTime).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })}
        </span>
      </div>

      {/* ---------- TEXT ---------- */}
      <div className="grow px-3 py-2 flex flex-col justify-between">
        <div>
          <h3 className="text-base text-[24px] font-semibold leading-snug">{evt.title}</h3>
          <p className=" text-[16px]  text-black">{evt.eventLocation.venueName}</p>
        </div>
      </div>
    </div>
  );
}
