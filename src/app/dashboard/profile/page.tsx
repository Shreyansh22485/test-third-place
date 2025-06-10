"use client";

import React, { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";

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
  <Image src="/User.png" alt="User" width={20} height={20} className="object-contain" />
);

const PhoneIcon = () => (
  <Image src="/phone.png" alt="Phone" width={20} height={20} className="object-contain" />
);

const PersonalityIcon = () => (
  <Image
    src="/question_5156781.png"
    alt="Personality Test"
    width={30}
    height={30}
    className="object-contain"
  />
);

const ChatIcon = () => (
  <Image src="/007-writing 1.png" alt="Text Us" width={20} height={20} className="object-contain" />
);

const MailIcon = () => (
  <Image
    src="/ic-email-message 1.png"
    alt="Email"
    width={20}
    height={20}
    className="object-contain"
  />
);

/* ───────────────────────────── NEW ICONS FOR ABOUT/MANAGE ───────────────────────────── */

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
  onClick?: () => void;
}

const Row = ({ icon, title, right, sub, arrow = false, onClick }: RowProps) => (
  <div
    className={`flex items-center justify-between py-3 px-2 sm:px-4
               border-b border-gray-200                     /* keep border on every row */
               ${onClick ? "cursor-pointer hover:bg-gray-50" : ""}`}
    onClick={onClick}
  >
    <div className="flex items-start gap-3">
      <div className="mt-[2px] text-gray-600">{icon}</div>
      <div>
        <p className="text-[16px] font-medium text-gray-800">{title}</p>
        {sub && <p className="text-[14px] text-gray-500 leading-tight mt-1">{sub}</p>}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {right && <p className="text-[15px] text-gray-700">{right}</p>}
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
  const { user, loading, error, logout } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No user profile found</p>
          <Link href="/sign-in" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <div className="min-h-screen pb-10 md:pb-16">
      {/* ───────────────────── HEADER ───────────────────── */}
      <header className="h-12 border-b border-gray-200 bg-white flex items-center justify-center italic font-semibold text-gray-700">
        <span className="text-lg">PROFILE</span>
      </header>

      <section className="mx-auto mt-6 w-full max-w-md px-4 sm:px-0">
        {/* ───────────────── BASIC INFO ───────────────── */}
        <h3 className="text-lg italic font-semibold text-gray-500 tracking-wider mb-1 px-2 sm:px-0">
          BASIC INFO
        </h3>
        <div className="rounded-2xl border border-gray-200 overflow-hidden mb-8 bg-white">
          <Row icon={<UserIcon />} title="Name" right={`${user.firstName} ${user.lastName}`} />
          <Row icon={<PhoneIcon />} title="Phone number" right={user.phoneNumber} />
        </div>

        {/* ───────────── CURATION PROFILE ───────────── */}
        <div className="flex items-center justify-between mb-1 px-2 sm:px-0">
          <h3 className="text-lg italic font-semibold text-gray-500 tracking-wider">
            CURATION PROFILE
          </h3>
          <StatusBadge completed={user.personalityTestCompleted} />
        </div>
        <div className="rounded-2xl border border-gray-200 overflow-hidden mb-8 bg-white">
          <Row
            icon={<PersonalityIcon />}
            title="Take the personality test"
            sub="Share more about yourself to refine your curation."
            arrow
          />
        </div>

        {/* ──────────── JOIN THE COMMUNITY ──────────── */}
        <h3 className="text-lg italic font-semibold text-gray-500 tracking-wider mb-1 px-2 sm:px-0">
          JOIN THE COMMUNITY
        </h3>
        <div className="rounded-2xl border border-gray-200 overflow-hidden mb-8 bg-white">
          <Row icon={<FaWhatsapp size={20} />} title="WhatsApp" right="early access 💌" arrow />
          <Row icon={<FaInstagram size={20} />} title="Instagram" right="catch the vibe 📸" arrow />
        </div>

        {/* ─────────────── SUPPORT ─────────────── */}
        <h3 className="text-lg italic font-semibold text-gray-500 tracking-wider mb-1 px-2 sm:px-0">
          SUPPORT
        </h3>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
          <Row icon={<ChatIcon />} title="Text us" right="+91-6364124613" arrow />
          <Row icon={<MailIcon />} title="Email us" right="hello@yourthirdplace.in" arrow />
        </div>

        {/* ─────────────── ABOUT ─────────────── */}
        <h3 className="text-lg italic font-semibold text-gray-500 tracking-wider mb-1 px-2 sm:px-0">
          ABOUT
        </h3>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-8">
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
        <h3 className="text-lg italic font-semibold text-gray-500 tracking-wider mb-1 px-2 sm:px-0">
          MANAGE
        </h3>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
          <Row icon={<LogoutIcon />} title="Logout" arrow onClick={handleLogout} />
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
