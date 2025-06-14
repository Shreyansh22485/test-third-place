"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Ticket,  UserRound } from "lucide-react";
import React from "react";

const menu = [
  { name: "Home", icon: Home, path: "/dashboard" },
  { name: "Invites", icon: Ticket, path: "/dashboard/invites" },
  { name: "Profile", icon: UserRound, path: "/dashboard/profile" }, 
];

function Sidebar() {
  const path = usePathname();

  /*  Helper to decide styling  */
  const itemClass = (isActive: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
     ${
       isActive
         ? "bg-teal-600 text-white"
         : "text-teal-100 hover:bg-teal-500/40 hover:text-white"
     }`;

  return (
    <>
      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="hidden md:flex h-screen w-56 flex-col bg-gradient-to-b from-[#0b5d46] to-[#09553f] shadow-lg">

        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Image
            src="/Logo_001-01.png"
            alt="Third Place Logo"
            width={120}
            height={35}
            className="brightness-0 invert"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col  gap-2">
          {menu.map(({ name, icon: Icon, path: p }) => (
            <Link key={p} href={p} className={itemClass(path === p)}>
             <span className=""> <Icon size={20} /> </span>
              <span className="text-sm font-medium">{name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* ========== MOBILE BOTTOM BAR ========== */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-black/10 shadow-[0_-1px_4px_rgba(0,0,0,0.04)]">
        <ul className="flex justify-between">
          {menu.map(({ name, icon: Icon, path: p }) => {
            const active = path === p;
            return (
              <li key={p} className="w-full">
                <Link
                  href={p}
                  className="flex flex-col  items-center py-2"
                >
                  <Icon
                    size={24}
                    strokeWidth={2}
                    className={active ? "black" : "stroke-gray-500"}
                  />
                  <span
                    className={`text-xs font-medium ${
                      active ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
