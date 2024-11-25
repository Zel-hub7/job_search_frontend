import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white min-h-screen p-6 border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
        <span className="text-blue-600 text-3xl">💼</span> {/* Placeholder icon */}
        <span className="text-2xl font-semibold text-gray-800">MyJob</span>
      </div>

      {/* Dashboard Title */}
      <div className="mb-6">
        <span className="text-gray-500 text-sm">EMPLOYERS</span>
        <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold ml-2 px-2 py-0.5 rounded">
          DASHBOARD
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-4">
        {/* Post a Job */}
        <Link href="/jobs/create" passHref>
          <Button
            variant="ghost"
            className="w-full flex justify-start items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
          >
            <span className="text-lg">➕</span>
            <span>Post a Job</span>
          </Button>
        </Link>

        {/* Create New Company */}
        <Link href="/companies/create" passHref>
          <Button
            variant="ghost"
            className="w-full flex justify-start items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
          >
            <span className="text-lg">🏢</span>
            <span>Create New Company</span>
          </Button>
        </Link>

        {/* View List of Companies */}
        <Link href="/companies" passHref>
          <Button
            variant="ghost"
            className="w-full flex justify-start items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
          >
            <span className="text-lg">📂</span>
            <span>View List of Companies</span>
          </Button>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="mt-10">
        <Link href="/logout" passHref>
          <Button
            variant="ghost"
            className="w-full flex justify-start items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg"
          >
            <span className="text-lg">🚪</span> {/* Placeholder icon */}
            <span>Log-out</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
