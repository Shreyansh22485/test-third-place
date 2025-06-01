import { notFound } from "next/navigation";
import Image from "next/image";
import { events } from "@/app/dashboard/events";

type PageProps = {
  params: { slug: string };
};

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const evt = events.find((e) => e.slug === slug);
  if (!evt) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Image
        src={evt.cover_photo_link}
        alt={evt.event_name}
        width={800}
        height={500}
        className="h-72 w-full rounded-xl object-cover"
        priority
      />
      <h1 className="mt-6 text-3xl font-bold">{evt.event_name}</h1>
      <p className="mt-1 text-gray-600">{evt.event_location}</p>
      <p className="text-sm text-gray-500">
        {new Date(evt.event_date).toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p className="mt-6 leading-relaxed">{evt.event_description}</p>
      <p className="mt-8 text-xl font-semibold">
        Price: ₹{evt.event_price.toLocaleString()}
      </p>
    </article>
  );
}
