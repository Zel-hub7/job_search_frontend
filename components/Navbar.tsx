'use client'

import { FC } from 'react';
import { useState } from 'react';

const NavBar: FC = () => {

  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignInOut = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <a href="/" className='font-extrabold'>iCogJobs</a>
      </div>
      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <button onClick={handleSignInOut} className="text-blue-600 font-medium">
            Sign Out
          </button>
        ) : (
          <a href="/sign-in">
            <button className="text-blue-600 font-medium">
              Sign In
            </button>
          </a>
        )}
        <a href="/post-a-job">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Post A Job
          </button>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
