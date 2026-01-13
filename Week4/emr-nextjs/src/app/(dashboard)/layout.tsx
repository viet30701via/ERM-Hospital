"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathName = usePathname();

  const menuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      href: "/patients",
      label: "Patients",
      icon: "👥",
    },
    {
      href: "/doctors",
      label: "Doctors",
      icon: "👨‍⚕️",
    },
    {
      href: "/appointments",
      label: "Appointments",
      icon: "📅",
    },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Top Header - Thay thế Root Layout Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg z-50">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
              <span className="text-xl">🏥</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">VIA Hospital</h1>
              <p className="text-xs text-blue-100">
                Electronic Medical Records
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm hover:text-blue-200 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-blue-200 transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm hover:text-blue-200 transition"
            >
              Contact
            </Link>

            {/* User Profile */}
            <div className="flex items-center gap-2 ml-4">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">A</span>
              </div>
              <button
                onClick={() => {
                  // Delete cookie
                  document.cookie = "auth-token=; path=/; max-age=0";
                  // Redirect to login
                  window.location.href = "/login";
                }}
                className="ml-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition"
              >
                🚪 Logout
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-56" : "w-16"
          } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
        >
          {/* Sidebar Toggle */}
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            {sidebarOpen && (
              <span className="font-bold text-gray-800 text-sm">Menu</span>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle sidebar"
            >
              <svg
                className={`w-4 h-4 transition-transform ${
                  sidebarOpen ? "" : "rotate-180"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathName === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  title={item.label}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="font-medium text-sm truncate">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            {sidebarOpen ? (
              <div className="text-center">
                <p className="text-xs text-gray-500">© 2026 VIA Hospital</p>
              </div>
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xs">©</span>
              </div>
            )}
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page Title Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {menuItems.find((item) => item.href === pathName)?.label ||
                  "Dashboard"}
              </h2>
              <p className="text-xs text-gray-500">
                {pathName === "/dashboard" && "Welcome to your dashboard"}
                {pathName === "/patients" && "Manage patient records"}
                {pathName === "/doctors" && "Manage medical staff"}
                {pathName === "/appointments" && "Schedule and appointments"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Main Content - Scrollable */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <Breadcrumbs />
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 px-6 py-3">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <div className="flex gap-4">
                <Link href="/patients" className="hover:text-gray-700">
                  Patients
                </Link>
                <Link href="/doctors" className="hover:text-gray-700">
                  Doctors
                </Link>
              </div>
              <div className="flex gap-4">
                <span>Email: viet307@emrhospital.com</span>
                <span>Phone: +84 988 398 236</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
