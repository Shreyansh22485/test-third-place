/* app/dashboard/_components/MobileEventCard.tsx */
"use client";

import Image from "next/image";
import { type Event } from "../events";
import { useRouter } from "next/navigation";

export default function MobileEventCard({ evt }: { evt: Event }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/events/${evt.slug}`)}
      className="cursor-pointer overflow-hidden rounded-xl shadow-lg"
    >
      {/* image + gradient + date badge */}
      <div className="relative">
        <Image
          src={evt.cover_photo_link}
          alt={evt.event_name}
          width={600}
          height={400}
          className="h-56 w-full object-cover transition-transform duration-200 hover:scale-105"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <span className="absolute bottom-3 right-3 rounded-md bg-white/70 px-2 py-1 text-xs font-semibold text-gray-900 backdrop-blur">
          {new Date(evt.event_date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })}
        </span>
      </div>

      {/* name + location */}
      <div className="bg-white px-4 py-3">
        <h3 className="text-base font-semibold">{evt.event_name}</h3>
        <p className="text-sm text-gray-600">{evt.event_location}</p>
      </div>
    </div>
  );
}
