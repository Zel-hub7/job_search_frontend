'use client'

import React, { useState } from 'react';
import Image from 'next/image';
interface JobSearchProps {
  jobTitle: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}


const JobSearch: React.FC<JobSearchProps> = ({ jobTitle, setJobTitle, location, setLocation }) => {


  const handleSearch = () => {

  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 py-10 bg-gray-100">
      <div className="md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Find a job that suits your interest & skills.
        </h1>
        <p className="mt-4 text-gray-600">
          iCogJobs is one-stop-center for a thousands of jobs.
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Job title, Keyword..."
            className="w-full md:w-auto border rounded p-3 shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Location"
            className="w-full md:w-auto border rounded p-3 shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="w-full md:w-auto bg-primary text-white p-3 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring"
            onClick={handleSearch}
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
        />
      </div>
    </div>
  );
};

export default JobSearch;