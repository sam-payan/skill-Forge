import { ReactNode, useState, useRef } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const openSidebar = () => setMobileMenuOpen(true);
  const closeSidebar = () => setMobileMenuOpen(false);

  const handleNavClick = () => {
    // Only close on mobile
    if (window.innerWidth < 1024) closeSidebar();
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar
        ref={sidebarRef}
        collapsed={false}
        mobileMenuOpen={mobileMenuOpen}
        onNavClick={handleNavClick}
        onClose={closeSidebar}
      />

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <main className="flex-1 min-h-screen lg:ml-64">
        {/* Mobile menu button */}
        <div className="lg:hidden p-4">
          <button
            onClick={openSidebar}
            className="px-3 py-2 text-sm rounded-md bg-muted"
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
