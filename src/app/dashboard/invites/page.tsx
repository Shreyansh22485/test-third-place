'use client';

import React, { useState, useEffect } from 'react';
import NoInvites from './_components/NoInvite';
import InvitesGallery from './_components/InvitesGallery';
import { bookingService } from '@/services/booking.service';
import { InvitesSkeleton } from '@/components/ui/skeleton';

function InvitesPage() {
  const [hasBookings, setHasBookings] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBookings = async () => {
      try {
        const bookings = await bookingService.getConfirmedBookings();
        setHasBookings(bookings.length > 0);
      } catch (error) {
        console.error('Failed to check bookings:', error);
        setHasBookings(false);
      } finally {
        setLoading(false);
      }
    };

    checkBookings();
  }, []);

  if (loading) {
    return <InvitesSkeleton />;
  }

  return (
    <div>
      <header className="flex h-[58px] items-center justify-center font-[500] border-b border-[#E5E5EA] py-4">
        <h1 className="text-2xl italic font-[500] tracking-wide uppercase">Your Invites</h1>
      </header>
      <div>
        {hasBookings ? <InvitesGallery/> : <NoInvites/>}
      </div>
    </div>
  );
}

export default InvitesPage;
