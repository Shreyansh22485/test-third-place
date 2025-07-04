"use client";

import React, { JSX, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import { usePersonalityTestReturn } from "@/hooks/usePersonalityTestReturn";
import { ProfileSkeleton } from "@/components/ui/skeleton";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import { LucidePhone } from "lucide-react";

/* ───────────────────────── ICONS ───────────────────────── */

const ChevronRight = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon        = () => <Image src="/User.svg" alt="User" width={20} height={20} className="object-contain" />;
const PhoneIcon       = () => <LucidePhone size={20} className="text-black" />;
const PersonalityIcon = () => <Image src="/question_5156781.svg" alt="Test" width={30} height={30} className="object-contain" />;
const ChatIcon        = () => <Image src="/007-writing 1.svg" alt="Text" width={20} height={20} className="object-contain" />;
const MailIcon        = () => <Image src="/ic-email-message 1.svg" alt="Mail" width={20} height={20} className="object-contain" />;

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DocIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" />
    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ───────────────────────── BADGE ───────────────────────── */

const StatusBadge = ({ completed }: { completed: boolean }) => (
  <div className="flex items-center justify-center h-[50px]">
    <span className={`inline-flex items-center justify-center text-[16px] tracking-wider uppercase italic w-[106px] h-[27px] font-[400] rounded-2xl ${
      completed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
    }`}>
      {completed ? "Completed" : "Pending"}
    </span>
  </div>
);

/* ───────────────────────── ROW ───────────────────────── */

interface RowProps {
  icon: JSX.Element;
  title: string;
  right?: string;
  sub?: string;
  arrow?: boolean;
  arrowSize?: number;
  onClick?: () => void;
}

const Row = ({
  icon,
  title,
  right,
  sub,
  arrow = false,
  arrowSize = 22,
  onClick,
}: RowProps) => (
  <div
    className={`flex items-center justify-between py-3 px-2 sm:px-4
                ${onClick ? "cursor-pointer hover:bg-gray-50" : ""}`}
    onClick={onClick}
  >
    <div className="flex items-start pl-1 gap-3">
      <div className="mt-[4px] text-gray-600">{icon}</div>
      <div>
        <p className="text-[18px] font-medium text-gray-800">{title}</p>
        {sub && <p className="text-[13px] text-[#8E8E93] leading-tight mt-1">{sub}</p>}
      </div>
    </div>
    <div className="flex items-center  gap-1 pr-1">
      {right && <p className="text-[18px]  text-[#8E8E93]">{right}</p>}
      {arrow && <div className="text-gray-400"><ChevronRight size={arrowSize} /></div>}
    </div>
  </div>
);

/* ───────────────────────── PAGE CONTENT ───────────────────────── */

function ProfilePageContent() {
  const { user, loading, error, logout } = useUser();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  usePersonalityTestReturn();

  if (loading) return <ProfileSkeleton />;
  if (error)   return <ErrorState error={error} />;
  if (!user)   return <NoUser />;

  const handlePersonalityTest = () => {
    const returnTo = encodeURIComponent("/dashboard/profile");
    router.push(`/personality-test?returnTo=${returnTo}&retake=true`);
  };

  return (
    <div className="min-h-screen pl-1 bg-[#FAFAFA] pr-1 pb-10  md:pb-16">
      <header className="h-[58px] border-b border-[#E5E5EA] bg-[#FAFAFA] flex items-center justify-center italic font-[500] text-black">
        <span className="text-2xl">PROFILE</span>
      </header>

      <section className="mx-auto mt-3 w-full max-w-md px-4 sm:px-0">
        {/* BASIC INFO */}
        <SectionTitle>BASIC INFO</SectionTitle>

        <div className="rounded-2xl border border-[#E5E5EA] divide-y divide-[#E5E5EA] overflow-hidden mb-5 bg-white">
          <Row icon={<UserIcon />} title="Name" right={`${user.firstName}`}  />
          <Row icon={<PhoneIcon />} title="Phone number" right={user.phoneNumber}  />
        </div>

        {/* CURATION PROFILE */}
        <div className="flex items-center justify-between -mb-1.25 sm:px-0">
          <SectionTitle noMargin>CURATION PROFILE</SectionTitle>
          <StatusBadge completed={user.personalityTestCompleted} />
        </div>
        <div className="rounded-2xl border border-[#E5E5EA] divide-y divide-[#E5E5EA] overflow-hidden mb-5 bg-white">
          <Row
            icon={<PersonalityIcon />}
            title={user.personalityTestCompleted ? "Retake personality test" : "Take the personality test"}
            sub={user.personalityTestCompleted ? "Update your preferences and refine your curation." : "Share more about yourself to refine your curation."}
            arrow
            onClick={handlePersonalityTest}
          />
        </div>

        {/* JOIN THE COMMUNITY */}
        <SectionTitle className="pl-3">JOIN THE COMMUNITY</SectionTitle>
        <div className="rounded-2xl border border-[#E5E5EA] divide-y divide-[#E5E5EA] overflow-hidden mb-5 bg-white">
          <Link href="https://chat.whatsapp.com/FvtR65ZwPn0IV1Pe8ftJcW" target="_blank" rel="noopener noreferrer" className="block">
            <Row icon={<FaWhatsapp size={20} />} title="WhatsApp"   right="early access 💌" arrow />
          </Link>
          <Link href="https://www.instagram.com/yourthird_place" target="_blank" rel="noopener noreferrer" className="block">
            <Row icon={<FaInstagram size={20} />} title="Instagram" right="catch the vibe 📸" arrow />
          </Link>
        </div>

        {/* SUPPORT */}
        <SectionTitle>SUPPORT</SectionTitle>
        <div className="bg-white rounded-2xl border border-[#E5E5EA] divide-y divide-[#E5E5EA] overflow-hidden mb-6">
          <a href="tel:+916364124613" className="block">
            <Row icon={<ChatIcon />} title="Text us" right="+91-6364124613" arrow />
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@yourthirdplace.in" target="_blank" rel="noopener noreferrer" className="block">
            <Row icon={<MailIcon />} title="Email us" right="hello@yourthirdplace.in" arrow />
          </a>
        </div>

     {/* ABOUT */}
<SectionTitle>ABOUT</SectionTitle>
<div className="bg-white border border-[#E5E5EA] divide-y divide-[#E5E5EA] rounded-2xl overflow-hidden mb-5">
  <Link href="/how-it-works"             className="block">
    <Row icon={<InfoIcon />} title="How Third Place works?" arrow />
  </Link>
  <Link href="/privacy-policy"           className="block">
    <Row icon={<DocIcon />} title="Privacy policy" arrow />
  </Link>
  <Link href="/terms-conditions"         className="block">
    <Row icon={<DocIcon />} title="Terms of service" arrow />
  </Link>
  <Link href="/cancellation-refund-policy" className="block">
    <Row icon={<DocIcon />} title="Cancellations & refunds" arrow />
  </Link>
</div>

        {/* MANAGE */}
        <SectionTitle>MANAGE</SectionTitle>
        <div className="bg-white rounded-2xl border border-[#E5E5EA] overflow-hidden mb-5">
          <Row icon={<LogoutIcon />} title="Logout" arrow onClick={() => setShowLogoutModal(true)} />
        </div>
      </section>

      {/* Logout modal */}
      <ConfirmationModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => { setShowLogoutModal(false); logout(); }}
        title="Logout"
        message="Are you sure you want to logout? You'll need to sign in again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 text-white hover:bg-red-700"
      />
    </div>
  );
}

/* ───────────────────────── HELPERS ───────────────────────── */

const ErrorState = ({ error }: { error: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <p className="text-red-600 mb-4">{error}</p>
      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Retry
      </button>
    </div>
  </div>
);

const NoUser = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <p className="text-gray-600 mb-4">No user profile found</p>
      <Link href="/auth" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign In</Link>
    </div>
  </div>
);

const SectionTitle = ({ children, className = "", noMargin = false }: { children: React.ReactNode; className?: string; noMargin?: boolean }) => (
  <h3 className={`text-[22px] italic font-[400px] text-[#8E8E93] tracking-wider ${noMargin ? "mb-0" : "mb-1"} px-2 sm:px-0 ${className}`}>
    {children}
  </h3>
);

function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageContent />
    </Suspense>
  );
}

export default ProfilePage;
