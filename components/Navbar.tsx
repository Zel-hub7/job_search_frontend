import React from 'react';

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
          <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Find Job</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Employers</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Candidates</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Pricing Plans</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Customer Supports</a>
        </div>

        {/* Contact Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="phone" className="text-gray-600">📞</span>
            <span className="text-gray-600">+1-202-555-0178</span>
          </div>
          <div className="flex items-center space-x-1">
            <span role="img" aria-label="flag" className="text-gray-600">🇺🇸</span>
            <span className="text-gray-600">English</span>
            <span className="text-gray-600">▼</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
