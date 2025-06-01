import React from "react";
import Sidebar from "./_components/Sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
   
    <div className="h-screen flex overflow-hidden">   
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
