import Link from 'next/link';
import React from 'react';
 

export default function NewJob()  {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold mb-2">Your Companies</h2>
      <p className="text-sm mb-4">Select a company to create a job</p>
      <div className="space-y-2">
         Test Company
      </div>
      <div className="mt-4">
        <Link  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition" href="/create-company">        
            Create a new company
            <span className="ml-2">&rarr;</span>          
        </Link>
      </div>
    </div>
  );
};
