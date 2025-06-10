// app/dashboard/events/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Gift,
  Calendar,
  TicketPlus,
  Info,
  X as XIcon,
} from "lucide-react";

import { events } from "@/app/dashboard/events";

type PageProps = { params: any };

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const evt = events.find((e) => e.slug === slug);
  if (!evt) return notFound();

  // itinerary text
  const itinerary =
    "This experience will start with dinner with your closest matches and continue with going to a nearby bar for a holiday party with a live band.";

  // pricing
  const curationFee     = 499;
  const baseFee         = +(curationFee / 6).toFixed(2);
  const gstOnCuration   = +(curationFee * 0.18).toFixed(2);
  const originalCuration = baseFee + gstOnCuration;
  const discountAmt     = originalCuration - curationFee;
  const grandTotal      = evt.event_price + curationFee;

  // date & time
  const dateObj   = new Date(evt.event_date);
  const dateLabel = dateObj.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const timeLabel = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-[#FAFAFA]">
      {/* Sticky footer CTA */}
      <footer className="fixed inset-x-0 bottom-0 z-10 border-t border-gray-300 bg-[#FAFAFA] px-4 py-3 backdrop-blur md:px-0">
        <div className="mx-auto w-full md:max-w-lg">
          <button className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition">
            Continue
          </button>
        </div>
      </footer>

      {/* Main article */}
      <article className="mx-auto w-full max-w-md px-5 pb-32 pt-4 md:max-w-lg md:px-0">
        {/* Header */}
        <header className="-mx-5 mb-4 flex min-w-screen items-center justify-between border-b border-[#E5E5EA] px-0">
          <Link href="/dashboard" className="p-1 text-black">
            <ArrowLeft className="mx-5 h-5 w-5" />
          </Link>
          <h2 className="flex-1 -ml-10 mb-3 text-center text-[24px] font-[500] italic tracking-wide text-black">
            YOUR INVITATION
          </h2>
          <span className="h-5 w-5" />
        </header>

        {/* Cover photo */}
        <div className="overflow-hidden rounded-xl border border-gray-300">
          <Image
            src={evt.cover_photo_link}
            alt={evt.event_name}
            width={348}
            height={436}
            priority
            className="h-[436px] w-full object-cover"
          />
        </div>

        {/* Event title */}
        <h1 className="mt-6 text-center text-lg font-semibold text-black">
          {evt.event_name}
        </h1>

        {/* Time + Location */}
        <div className="mt-3 overflow-hidden rounded-md border bg-white text-sm text-black divide-y divide-gray-300 border-gray-300">
          <div className="flex items-center gap-2 px-4 py-2">
            <Calendar className="h-4 w-4 text-black" />
            <span>
              {dateLabel} | {timeLabel}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2">
            <MapPin className="h-4 w-4 text-black" />
            <span>{evt.event_location}</span>
          </div>
        </div>

        {/* Itinerary */}
        <section className="mt-6 overflow-hidden rounded-md border bg-white border-gray-300">
          <Header label="ITINERARY" />
          <p className="px-4 py-3 text-sm leading-relaxed text-black">
            {itinerary}
          </p>
        </section>

        {/* Bring a Friend */}
        <section className="mt-6 overflow-hidden rounded-md border bg-white border-gray-300">
          <div className="flex items-center justify-between px-4 py-2">
            <h3 className="text-[16px] font-semibold italic tracking-wide text-black">
              BRING A FRIEND
            </h3>
            <button className="flex items-center gap-1 rounded-md bg-gray-900 px-3 py-[3px] text-[14px] font-medium text-white">
              <TicketPlus className="h-4 w-4" /> Invite a friend
            </button>
          </div>
          <hr className="border-gray-300" />
          <div className="m-3 flex gap-3 rounded-3xl bg-[#FFF3CD] px-4 py-3 text-[13px] text-black">
            <Gift className="h-12 w-12 text-gray-800" />
            <p className="leading-snug">
              Friends attend in your group. <br />
              Your friend stays in your group throughout the experience.
            </p>
          </div>
        </section>

{/* PAYMENT SUMMARY */}
<section className="mt-6 overflow-visible rounded-md border bg-white border-gray-300 relative">
  <Header label="PAYMENT SUMMARY" />

  <div className="space-y-1 px-4 py-3 text-[13px] text-black">
    {/* 1️⃣ Ticket */}
    <Line label="Experience Ticket" value={evt.event_price} />

    {/* 2️⃣ Curation fee (overlay + collapse) */}
    <details className="group">
      <summary className="flex cursor-pointer list-none items-start justify-between">
        {/* LEFT: text + icon + overlay */}
        <div className="relative flex items-center gap-1">
          <span className="">
            Curation fee
          </span>

          {/* hidden checkbox to drive overlay */}
          <input
            type="checkbox"
            id="curation-info"
            className="peer sr-only"
          />

          {/* only this icon toggles overlay */}
          <label
            htmlFor="curation-info"
            className="cursor-pointer"
          >
            <Info className="h-[14px] w-[14px] text-gray-500" />
          </label>

          <span className="text-gray-500">(inc. of GST)</span>

      {/* small overlay box */}
<div
  className="peer-checked:block hidden absolute top-full left-0 z-20 mt-2
             w-[280px] 
             max-h-[60vh] overflow-y-auto   instead of h-[90px] 
             rounded-md bg-[#FAFAFA] p-4 text-sm text-black shadow-lg"
>
  <div className="flex justify-between">
    <p className="whitespace-pre-line">
      This enables us to create a unique experience and
      match you with people you&apos;re most likely to vibe with.
    </p>

    <label htmlFor="curation-info" className="cursor-pointer pl-2">
      <XIcon className="h-4 w-4 text-gray-500" />
    </label>
  </div>
</div>


          {/* caret, pushed right so it never overlaps */}
      <svg
  width="18"
  height="18"
  viewBox="0 0 16 16"
  fill="none"
  className=" inline-block transition-transform group-open:rotate-180"
>
  <path
    d="M4 6l4 4 4-4"
    stroke="#222"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
        </div>

        {/* RIGHT: discount badge + prices */}
        <div className="text-right leading-[1.1]">
          <span className="inline-block rounded-md bg-green-100 px-[6px] py-[1px] text-[11px] font-medium text-green-600">
            50% off
          </span>
          <span className="block text-xs text-gray-400 line-through">
            ₹{originalCuration.toLocaleString()}
          </span>
          <span className="block font-medium">
            ₹{curationFee.toLocaleString()}
          </span>
        </div>
      </summary>

      {/* breakdown rows */}
      <div className="pl-19  space-y-0.5">
        <Line label="Base curation fee" value={baseFee} small />
        <Line
          label="Discount(- 50%)"
          value={`- ${discountAmt.toLocaleString()}`}
          small
          extraClass="text-green-600 italic"
        />
        <Line label="GST on base fee" value={gstOnCuration} small />
      </div>
    </details>

    <hr className="my-1 border-gray-300" />

    {/* 3️⃣ Grand Total */}
    <Line label="Grand Total" value={grandTotal} bold large />
  </div>
</section>


        {/* Info Boxes */}
        <section className="mt-6 overflow-hidden rounded-md border bg-white border-gray-300 text-[13px] text-black">
          <Box
            heading="YOU'RE ON THE LIST — ALMOST"
            text="You'll be notified if you're selected on the day of the experience. If not, you'll get a full refund – no questions asked."
          />
          <hr className="border-t border-gray-300 my-2" />
          <Box
            heading="EACH MEMBER CAN BRING A FRIEND"
            text="Simply add them above, before the cutoff time."
          />
        </section>
      </article>
    </div>
  );
}

/* -------------------- Helpers -------------------- */
const Header = ({ label }: { label: string }) => (
  <>
    <div className="px-4 py-2">
      <h3 className="text-[16px] font-semibold italic tracking-wide text-black">
        {label}
      </h3>
    </div>
    <hr className="border-gray-300" />
    </>
);

interface LineProps {
  label: string;
  value: number | string;
  bold?: boolean;
  large?: boolean;
  small?: boolean;
  extraClass?: string;
}
const Line = ({
  label,
  value,
  bold,
  large,
  small,
  extraClass = "",
}: LineProps) => (
  <div className="flex items-center justify-between">
    <span
      className={`${small ? "text-[12px]" : ""} ${
        bold ? "font-medium" : ""
      } ${extraClass}`}
    >
      {label}
    </span>
    <span
      className={`${small ? "text-[12px]" : large ? "text-[15px]" : "text-[13px]"} ${
        bold || large ? "font-semibold" : ""
      } ${extraClass}`}
    >
      {typeof value === "number" ? `₹${value.toLocaleString()}` : value}
    </span>
  </div>
);

const Box = ({ heading, text }: { heading: string; text: string }) => (
  <div className="px-4 py-3">
    <h4 className="text-[16px] font-semibold italic tracking-wide text-black">
      {heading}
    </h4>
    <p className="mt-1 text-sm leading-snug text-black">{text}</p>
  </div>
);
