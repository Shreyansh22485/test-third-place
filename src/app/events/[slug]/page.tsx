
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Gift,
  Plus,
} from 'lucide-react';

import { events } from '@/app/dashboard/events';

type PageProps = {
  // In Next.js 15, `params` is delivered as an async value (Promise).
  // Using `any` here avoids TS complaints when we `await` it.
  params: any;
};

// ------------------------------------------------------------------
// EventPage Component
// ------------------------------------------------------------------
export default async function EventPage({ params }: PageProps) {
  // Unwrap the async params per Next 15 requirement
  const { slug } = await params;

  const evt = events.find((e) => e.slug === slug);
  if (!evt) return notFound();

  const itinerary =
    'This experience will start with dinner with your closest matches and continue with going to a nearby bar for a holiday party with a live band.';

  const curationFee = 499;
  const baseFee = +(curationFee / 6).toFixed(2);
  const gstOnCuration = +(curationFee * 0.18).toFixed(2);
  const grandTotal = evt.event_price + curationFee;

  const dateObj = new Date(evt.event_date);
  const dateLabel = dateObj.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const timeLabel = dateObj.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      {/* ---------- Sticky footer CTA -------------------------------- */}
      <footer className="fixed inset-x-0 bottom-0 z-10 border-t border-gray-300 bg-white/90 px-4 py-3 backdrop-blur md:px-0">
        <div className="mx-auto w-full  md:max-w-lg">
          <button
            type="button"
            className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </footer>

      {/* ---------- Main article ------------------------------------ */}
      <article className="mx-auto w-full max-w-md px-4 pb-32 pt-4 md:max-w-lg md:px-0">
        {/* header row */}
        <header className="mb-4 flex items-center gap-3">
          <Link href="/dashboard" className="p-1 text-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="flex-1 text-center text-4Xl font-semibold italic tracking-wide text-black">
            YOUR INVITATION
          </h2>
          <span className="h-5 w-5" /> {/* spacer to balance flex row */}
        </header>

        {/* cover photo */}
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

        {/* event title */}
        <h1 className="mt-6 text-center text-lg font-semibold text-black">
          {evt.event_name}
        </h1>

        {/* time + location card */}
        <div className="mt-3 overflow-hidden rounded-md border -10 border-gray-300 text-sm text-black divide-y divide-gray-300">
          <div className="px-4 py-2 pl-10">
            {dateLabel} | {timeLabel}
          </div>
          <div className="flex items-center gap-2 px-4 py-2">
            <MapPin className="h-4 w-4 flex-shrink-0 text-black" />
            {evt.event_location}
          </div>
        </div>

        {/* itinerary card */}
        <section className="mt-6 overflow-hidden rounded-md border border-gray-300">
          <Header label="ITINERARY" />
          <p className="px-4 py-3 text-sm leading-relaxed text-black">
            {itinerary}
          </p>
        </section>

        {/* bring-a-plus-one card */}
        <section className="mt-6 overflow-hidden rounded-md border border-gray-300">
          <div className="flex items-center justify-between px-4 py-2">
            <h3 className="text-[16px] font-semibold italic tracking-wide text-black">
              BRING A +1
            </h3>
            <button
              type="button"
              className="flex items-center gap-1 rounded-md bg-gray-900 px-3 py-[3px] text-[11px] font-medium text-white"
            >
              <Plus className="h-3 w-3 text-white" /> Invite a +1
            </button>
          </div>
          <hr className="border-gray-300" />
<div
  className="flex gap-3 px-4 py-3 rounded-3xl text-[13px] text-black m-3"
  style={{ backgroundColor: '#FFF3CD' }}
>
  <Gift className="h-12 w-12 text-gray-800" />
  <p className="leading-snug">
    <span className="font-semibold">1+</span> attend in your group. <br />
    Your +1 will be in your group and stay with you throughout the experience.
  </p>
</div>

        </section>

        {/* payment summary card */}
        <section className="mt-6 overflow-hidden rounded-md border border-gray-300">
          <Header label="PAYMENT SUMMARY" />
          <div className="space-y-1 px-4 py-3 text-[13px] text-black">
            <Line label="Experience Ticket" value={evt.event_price} />
            <Line label="Curation fee (inc. of GST)" value={curationFee} bold />
            <div className="pl-4">
              <Line label="Base fee" value={baseFee} small />
              <Line label="GST on curation fee" value={gstOnCuration} small />
            </div>
            <hr className="my-1 border-gray-300" />
            <Line label="Grand Total" value={grandTotal} bold large />
          </div>
        </section>

{/* info boxes */}
<section className="mt-6 overflow-hidden rounded-md border border-gray-300 text-[13px] text-black">
  <Box
    heading="YOU'RE ON THE LIST — ALMOST"
    text="You'll be notified if you're selected on the day of the experience. If not, you'll get a full refund – no questions asked."
  />

  {/* 👇 Border between the two boxes */}
  <hr className="border-t border-gray-300 my-2" />

  <Box
    heading="EACH MEMBER CAN BRING A +1"
    text="Simply add them above, before the cutoff time."
  />
</section>

      </article>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
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
}

const Line = ({ label, value, bold, large, small }: LineProps) => (
  <div className="flex items-center justify-between">
    <span
      className={`${small ? 'text-[12px]' : ''} ${
        bold ? 'font-medium' : ''
      } text-black`}
    >
      {label}
    </span>
    <span
      className={`${small ? 'text-[12px]' : large ? 'text-[15px]' : 'text-[13px]'} ${
        bold || large ? 'font-semibold' : ''
      } text-black`}
    >
      {typeof value === 'number' ? `₹${value.toLocaleString()}` : value}
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
