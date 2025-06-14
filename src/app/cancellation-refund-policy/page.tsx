"use client";

import Link from "next/link";

/**
 * Route suggestion: app/cancellation-refund/page.tsx
 * Matches the minimalist pattern you’re using:
 *   • Back arrow → “/”
 *   • Title 20 px / 500, thin divider
 *   • Body copy wrapped in ml-2 mr-2 padding
 *   • All wording is 100 % unchanged
 */

export default function CancellationRefundPage() {
  return (
    <div className="bg-white min-h-screen text-black flex justify-center px-2">
      <div className="max-w-xl w-full pt-4 pb-10 space-y-8">
        {/* ───────── Header row ───────── */}
        <div className="flex items-center justify-between pb-2 border-b border-black/20">
          {/* Back arrow */}
          <Link href="/dashboard/profile" aria-label="Back" className="w-10 flex justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              className="w-6 h-6 text-black hover:text-pink-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>

          {/* Page title */}
          <div className="flex-1 flex justify-center">
            <span className="font-medium uppercase text-[19px]">
              Cancellation & Refund Policy
            </span>
          </div>

          {/* Spacer for symmetry */}
          <div className="w-10" />
        </div>

        {/* ───────── Body copy ───────── */}
        <section className="space-y-6 ml-2 mr-2  leading-relaxed">
          <p>
            By proceeding with your payment, you acknowledge and agree to the
            following terms:
          </p>

          {/* 1. Selection & Refunds */}
          <div className="space-y-1">
            <div className="flex gap-2 text-[18px] items-baseline">
              <span className="font-[500]">1.</span>
              <span className="font-[500]">Selection & Refunds</span>
            </div>
            <p>
              Completing the payment grants you a chance to be selected for a
              curated Third Place experience.
            </p>
            <p>If you are not selected, you will receive a full refund — no questions asked.</p>
            <p>
              If you are selected, the payment becomes non-refundable, even in
              cases of cancellation or no-show.
            </p>
          </div>

          {/* 2. Finality of Confirmation */}
          <div className="space-y-1">
            <div className="flex gap-2 text-[18px] items-baseline">
              <span className="font-[500]">2.</span>
              <span className="font-[500]">Finality of Confirmation</span>
            </div>
            <p>
              Once your participation is confirmed, your spot is final.
            </p>
            <p>
              Third Place does not accommodate last-minute cancellations,
              rescheduling, or refunds after selection.
            </p>
            <p>
              No-shows and ghosting disrupt the collective experience and are
              not tolerated.
            </p>
          </div>

          {/* 3. Attendance Commitment */}
          <div className="space-y-1">
            <div className="flex gap-2 text-[18px] items-baseline">
              <span className="font-[500]">3.</span>
              <span className="font-[500]">Attendance Commitment</span>
            </div>
            <p>Please do not register if you are uncertain about your ability to attend on time.</p>
            <p>
              Our experiences are sacred, intentional, and community-driven —
              punctuality and commitment are essential.
            </p>
          </div>

          {/* 4. +1 Policy */}
          <div className="space-y-1">
            <div className="flex gap-2 text-[18px] items-baseline">
              <span className="font-[500]">4.</span>
              <span className="font-[500]">+1 Policy</span>
            </div>
            <p>You may invite one (1) +1 guest until 12:00 PM on the day before the experience.</p>
            <p>
              +1s must embody the same commitment to showing up, respecting
              time, and contributing to the group experience.
            </p>
            <p>+1s will be separately confirmed and must complete their own payment to attend.</p>
            <p>
              If a +1 does not receive a confirmation message, their attendance
              is not yet guaranteed.
            </p>
          </div>

          {/* 5. Additional Costs */}
          <div className="space-y-1">
            <div className="flex gap-2 text-[18px] items-baseline">
              <span className="font-[500]">5.</span>
              <span className="font-[500]">Additional Costs</span>
            </div>
            <p>
              This payment does not cover the cost of food, drinks, or any
              personal expenses during the experience.
            </p>
            <p>Food and drink costs are payable individually at the venue.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
