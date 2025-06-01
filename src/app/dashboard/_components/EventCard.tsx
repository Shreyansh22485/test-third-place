import Link from "next/link";
import Image from "next/image";
import { Event } from "../events";

export default function EventCard({ evt }: { evt: Event }) {
  return (
    <Link href={`/events/${evt.slug}`} className="block group">
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <Image
          src={evt.cover_photo_link}
          alt={evt.event_name}
          width={600}
          height={400}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />

        {/* date badge */}
        <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {new Date(evt.event_date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold">{evt.event_name}</h3>
      <p className="text-sm text-gray-600">{evt.event_location}</p>
    </Link>
  );
}
