import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  return (
    <div className="w-full bg-gray-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 text-2xl">💼</span>
          <span className="text-xl font-semibold text-gray-800">MyJob</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Button variant="link" className="text-blue-600 border-b-2 border-blue-600 font-medium">
            Home
          </Button>
          <Button variant="link" className="text-gray-600 hover:text-blue-600">Find Job</Button>
          <Button variant="link" className="text-gray-600 hover:text-blue-600">Employers</Button>
          <Button variant="link" className="text-gray-600 hover:text-blue-600">Candidates</Button>
          <Button variant="link" className="text-gray-600 hover:text-blue-600">Pricing Plans</Button>
          <Button variant="link" className="text-gray-600 hover:text-blue-600">Customer Supports</Button>
        </div>

        {/* Contact Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="phone" className="text-gray-600">📞</span>
            <span className="text-gray-600">+1-202-555-0178</span>
          </div>
          
          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 text-gray-600">
                <span role="img" aria-label="flag">🇺🇸</span>
                <span>English</span>
                <span>▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Spanish</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
