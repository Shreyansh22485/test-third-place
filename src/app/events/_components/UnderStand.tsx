import React from "react";
import { X } from "lucide-react";

interface UnderstandProps {
  /**
   * Callback that hides the component (e.g. toggles state in the parent)
   */
  onClose: () => void;
}

/**
 * A lightweight modal that shows Third Place’s “Before you pay” notice.
 *
 * This component is **client‑side** only – keep it out of any RSC layer. Simply
 * render it conditionally when the user presses the **Continue** CTA.
 */
const Understand: React.FC<UnderstandProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur">
      {/* Card */}
      <div className="relative m-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-lg md:max-w-md">
        {/* X dismiss */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-gray-500 transition hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Heading */}
        <h2 className="mb-4 text-center text-xl font-semibold">Before you pay</h2>

        {/* Bullet list */}
        <ul className="list-disc space-y-2 pl-4 text-[13px] leading-snug text-gray-900">
          <li>
            By continuing, you acknowledge that refunds will <span className="font-semibold">not</span> be issued after
            you’ve been selected for an experience.
          </li>
          <li>
            Completing this payment will give you the chance to be selected for a curated Third Place experience. If
            you’re not selected, you’ll receive a full <span className="font-semibold">REFUND</span> — no questions asked.
          </li>
          <li>
            This payment does <span className="font-semibold">NOT</span> include the cost of food or drinks for this
            experience.
          </li>
          <li>
            Once confirmed, your spot is final. Third Place does not tolerate last‑minute cancellations, no‑shows, or
            ghosting. It impacts the whole group.
          </li>
          <li>
            Please do <span className="font-semibold">NOT</span> pay if you can’t make it <span className="font-semibold">EXACTLY
            ON TIME.</span> Our experiences are sacred and authentic — treat them as such.
          </li>
          <li>
            You may add a +1 till 12:00 PM on Tuesday — just make sure they’re someone you value showing up, too.
          </li>
          <li>
            Each member is <span className="font-semibold">ONLY</span> permitted a <span className="font-semibold">SINGLE +1.</span> If
            your +1 doesn’t receive a confirmation text, they haven’t been processed yet. They’ll receive event details
            separately &amp; <span className="font-semibold">WILL HAVE TO PAY THE FEE</span> for this experience.
          </li>
        </ul>

        {/* CTA */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full cursor-pointer rounded-full bg-black py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          I UNDERSTAND
        </button>
      </div>
    </div>
  );
};

export default Understand;
