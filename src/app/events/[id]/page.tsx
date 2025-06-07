"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  Tag,
} from 'lucide-react';

import { eventService, type BackendEvent } from '@/services/events.service';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function EventPage({ params }: PageProps) {
  const [event, setEvent] = useState<BackendEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [eventId, setEventId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const { id } = await params;
      setEventId(id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const fetchedEvent = await eventService.getEventById(eventId);
        setEvent(fetchedEvent);
      } catch (error) {
        console.error('Failed to fetch event:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-md px-4 pt-4 md:max-w-lg md:px-0">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return notFound();
  }  const curationFee = 499;
  const gstOnCuration = +(curationFee * 0.18).toFixed(2);
  const experiencePrice = event.experienceTicketPrice || 0;
  const discountedPrice = event.discountedPrice || null;
  const finalExperiencePrice = discountedPrice ? Math.min(discountedPrice, experiencePrice) : experiencePrice;
  const grandTotal = finalExperiencePrice + curationFee;

  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  
  const dateLabel = startDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const timeLabel = `${startDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })} - ${endDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  return (
    <>
      {/* Sticky footer CTA */}
      <footer className="fixed inset-x-0 bottom-0 z-10 border-t border-gray-300 bg-white/90 px-4 py-3 backdrop-blur md:px-0">
        <div className="mx-auto w-full md:max-w-lg">
          <button
            type="button"
            className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </footer>

      {/* Main content */}
      <article className="mx-auto w-full max-w-md px-4 pb-32 pt-4 md:max-w-lg md:px-0">
        {/* Header */}
        <header className="mb-4 flex items-center gap-3">
          <Link href="/dashboard" className="p-1 text-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="flex-1 text-center text-4xl font-semibold italic tracking-wide text-black">
            YOUR INVITATION
          </h2>
          <span className="h-5 w-5" />
        </header>        {/* Cover photo */}
        <div className="overflow-hidden rounded-xl border border-gray-300">
          <Image
            src={(event.imageUrls && event.imageUrls.length > 0 ? event.imageUrls[0] : '/1.png')}
            alt={event.title || 'Event'}
            width={348}
            height={436}
            priority
            className="h-[436px] w-full object-cover"
          />
        </div>        {/* Event title */}
        <h1 className="mt-6 text-center text-lg font-semibold text-black">
          {event.title || 'Event Title'}
        </h1>

        {/* Event category */}
        {event.category && (
          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              <Tag className="h-3 w-3" />
              {event.category}
              {event.subCategory && ` • ${event.subCategory}`}
            </span>
          </div>
        )}

        {/* Time + location card */}
        <div className="mt-4 overflow-hidden rounded-md border border-gray-300 text-sm text-black divide-y divide-gray-300">
          <div className="flex items-center gap-2 px-4 py-3">
            <Calendar className="h-4 w-4 flex-shrink-0 text-black" />
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3">
            <Clock className="h-4 w-4 flex-shrink-0 text-black" />
            <span>{timeLabel}</span>
          </div>          <div className="flex items-center gap-2 px-4 py-3">
            <MapPin className="h-4 w-4 flex-shrink-0 text-black" />
            <div>
              <div className="font-medium">{event.eventLocation?.venueName || 'Venue TBD'}</div>
              <div className="text-gray-600 text-xs">{event.eventLocation?.address || 'Address will be provided'}</div>
            </div>
          </div>          <div className="flex items-center gap-2 px-4 py-3">
            <Users className="h-4 w-4 flex-shrink-0 text-black" />
            <span>{event.attendeeCount || 0} / {event.capacity || 0} attending</span>
          </div>
        </div>        {/* Description */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-black mb-2">About this experience</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {event.description || 'Event description will be provided soon.'}
          </p>
        </div>

        {/* Matching tags */}
        {event.matchingTags && event.matchingTags.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-black mb-2">Perfect for</h3>
            <div className="flex flex-wrap gap-2">
              {event.matchingTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block rounded-full bg-black text-white px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Safety info */}
        {event.safetyInfo && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-black mb-2">Safety Information</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {event.safetyInfo}
            </p>
          </div>
        )}        {/* Pricing breakdown */}
        <div className="mt-8 rounded-lg border border-gray-300 p-4">
          <h3 className="text-lg font-semibold text-black mb-3">Pricing breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span>Experience ticket</span>
              <div className="text-right">
                {discountedPrice && discountedPrice < experiencePrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 line-through text-xs">₹{experiencePrice}</span>
                    <span className="text-green-600 font-medium">₹{finalExperiencePrice}</span>
                  </div>
                ) : (
                  <span>₹{finalExperiencePrice}</span>
                )}
              </div>
            </div>
            {discountedPrice && discountedPrice < experiencePrice && (
              <div className="flex justify-between text-xs text-green-600">
                <span>You save</span>
                <span>₹{experiencePrice - finalExperiencePrice}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Curation fee</span>
              <span>₹{curationFee}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>GST on curation fee</span>
              <span>₹{gstOnCuration}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Cancellation policy */}
        {event.cancellationPolicy && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-black mb-2">Cancellation Policy</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {event.cancellationPolicy}
            </p>
          </div>
        )}

        {/* RSVP deadline */}
        {event.rsvpDeadline && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>RSVP by:</strong> {new Date(event.rsvpDeadline).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        )}
      </article>
    </>
  );
}
