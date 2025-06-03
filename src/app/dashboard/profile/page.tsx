import React, { JSX } from "react";
import Link from "next/link";

/* ───────────────────────────────── ICONS ─────────────────────────────── */

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="7"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.11A19.5 19.5 0 0 1 3.2 10.8 19.79 19.79 0 0 1 .09 2.18 2 2 0 0 1 2.09 0h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.28 8.73a16 16 0 0 0 6 6l2.09-1.09a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2v4M21 10H3v7a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5v-7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="7.5" cy="14" r="1.5" fill="currentColor" />
    <circle cx="16.5" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

const WhatsappIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 3.999a9.994 9.994 0 0 0-17 7.28 9.86 9.86 0 0 0 1.42 5.14L3 21l4.71-1.47a10 10 0 0 0 12.29-15.54Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="m16.79 13.24-.01.01c-.33-.17-1.94-.95-2.24-1.06-.3-.11-.52-.17-.74.18-.22.35-.85 1.06-1.04 1.27-.19.22-.38.24-.72.08-.33-.17-1.38-.51-2.63-1.63-.97-.87-1.63-1.94-1.83-2.27-.19-.33-.02-.51.14-.67.14-.14.33-.38.49-.57.16-.19.22-.32.33-.54.11-.22.06-.41-.02-.57-.08-.17-.74-1.78-1.02-2.44-.26-.62-.53-.53-.73-.54l-.63-.01c-.22 0-.57.08-.87.41-.30.33-1.15 1.13-1.15 2.74 0 1.60 1.18 3.15 1.34 3.36.16.22 2.32 3.55 5.63 4.97 3.31 1.42 3.31.95 3.91.89.60-.05 1.94-.78 2.22-1.55.27-.78.27-1.44.19-1.55-.08-.11-.30-.18-.63-.35Z"
      fill="currentColor"
    />
  </svg>
);

const InstaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="12"
      cy="12"
      r="3.5"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="m22 6-10 7L2 6"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5A8.5 8.5 0 0 1 21 11v.5Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

/* ───────────────────────────── NEW ICONS FOR ABOUT/MANAGE ───────────────────────────── */

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 8v4M12 16h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const DocIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M14 2v6h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 17l5-5-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12H9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ────────────────────────────── BADGE ──────────────────────────────── */

const StatusBadge = ({ completed }: { completed: boolean }) => (
  <span
    className={`inline-block text-[10px] tracking-wider uppercase font-semibold px-2 py-[3px] rounded-full ${
      completed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
    }`}
  >
    {completed ? "Completed" : "Complete now"}
  </span>
);

/* ────────────────────────────── ROW COMPONENT ─────────────────────── */

interface RowProps {
  icon: JSX.Element;
  title: string;
  right?: string;
  sub?: string;
  arrow?: boolean;
}

const Row = ({ icon, title, right, sub, arrow = false }: RowProps) => (
  <div
    className="flex items-center justify-between py-3 px-2 sm:px-4 
               border-b last:border-b-0 border-gray-200"
  >
    <div className="flex items-start gap-3">
      <div className="mt-[2px] text-gray-600">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-800">{title}</p>
        {sub && (
          <p className="text-[12px] text-gray-500 leading-tight mt-1">{sub}</p>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {right && <p className="text-sm text-gray-700">{right}</p>}
      {arrow && (
        <div className="text-gray-400">
          <ChevronRight />
        </div>
      )}
    </div>
  </div>
);

/* ────────────────────────────── PAGE ──────────────────────────────── */

function ProfilePage() {
  // Flip this to false to toggle the badge color/text:
  const isPersonalityDone = true;

  return (
    <div className="min-h-screen bg-gray-50 pb-10 md:pb-16">
      {/* ───────────────────── HEADER ───────────────────── */}
      <header className="h-12 border-b border-gray-200 bg-white flex items-center justify-center italic font-semibold text-gray-700">
        <span className="text-lg">PROFILE</span>
      </header>

      <section className="mx-auto mt-6 w-full max-w-md md:max-w-md">
        {/* ───────────────── BASIC INFO ───────────────── */}
        <h3 className="text-xs font-semibold text-gray-500 tracking-wider mb-1 px-2 sm:px-0">
          BASIC INFO
        </h3>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <Row icon={<UserIcon />} title="Name" right="Abhishek kumar" />
          <Row icon={<PhoneIcon />} title="Phone number" right="+91 7991100164" />
        </div>

        {/* ───────────── CURATION PROFILE ───────────── */}
        <div className="flex items-center justify-between mb-1 px-2 sm:px-0">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wider">
            CURATION PROFILE
          </h3>
          <StatusBadge completed={isPersonalityDone} />
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <Row
            icon={<BotIcon />}
            title="Take the personality test"
            sub="Share more about yourself to refine your curation."
            arrow
          />
        </div>

        {/* ──────────── JOIN THE COMMUNITY ──────────── */}
        <h3 className="text-xs font-semibold text-gray-500 tracking-wider mb-1 px-2 sm:px-0">
          JOIN THE COMMUNITY
        </h3>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <Row icon={<WhatsappIcon />} title="WhatsApp" right="early access 💌" arrow />
          <Row icon={<InstaIcon />} title="Instagram" right="catch the vibe 📸" arrow />
        </div>

        {/* ─────────────── SUPPORT ─────────────── */}
        <h3 className="text-xs font-semibold text-gray-500 tracking-wider mb-1 px-2 sm:px-0">
          SUPPORT
        </h3>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <Row icon={<ChatIcon />} title="Text us" right="+91-6364124613" arrow />
          <Row icon={<MailIcon />} title="Email us" right="hello@yourthirdplace.in" arrow />
        </div>

        {/* ─────────────── ABOUT ─────────────── */}
        <h3 className="text-xs font-semibold text-gray-500 tracking-wider mb-1 px-2 sm:px-0">
          ABOUT
        </h3>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <Link href="/how-it-works">
            <Row icon={<InfoIcon />} title="How Third Place works?" arrow />
          </Link>
          <Link href="/privacy-policy">
            <Row icon={<DocIcon />} title="Privacy policy" arrow />
          </Link>
          <Link href="/terms-of-service">
            <Row icon={<DocIcon />} title="Terms of service" arrow />
          </Link>
          <Link href="/cancellation-refund-policy">
            <Row icon={<DocIcon />} title="Cancellations & refunds" arrow />
          </Link>
        </div>

        {/* ─────────────── MANAGE ─────────────── */}
        <h3 className="text-xs font-semibold text-gray-500 tracking-wider mb-1 px-2 sm:px-0">
          MANAGE
        </h3>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <Row icon={<LogoutIcon />} title="Logout" arrow />
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
