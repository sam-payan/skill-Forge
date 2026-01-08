import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 min-h-screen lg:ml-64">
        <div className="lg:hidden p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-sm px-3 py-2 rounded-md bg-muted"
          >
            Menu
          </button>
        </div>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
