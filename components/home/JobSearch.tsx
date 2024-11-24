'use client';

import React from 'react';
import Image from 'next/image';

const JobSearch: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-10 bg-gray-100">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Find a job that suits your interest & skills.
          </h1>
          <p className="mt-4 text-gray-600">
            iCogJobs is your one-stop center for thousands of jobs.
          </p>
          <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Job title, Keyword..."
              aria-label="Job title or keywords"
              className="w-full md:w-auto border rounded p-3 shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Your Location"
              aria-label="Location"
              className="w-full md:w-auto border rounded p-3 shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="button"
              className="w-full md:w-auto bg-blue-500 text-white p-3 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring"
            >
              Find Job
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <Image
            src="/img/Illustration.png"
            alt="Job search illustration"
            width={400}
            height={400}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
