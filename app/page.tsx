'use client';

import React from 'react';
import JobCard from "@/components/home/JobCard";
import JobSearch from '@/components/home/JobSearch';

const Home: React.FC = () => {
  return (
    <div>
      {/* Job Search Section */}
      <JobSearch />

      {/* Job Card Section */}
      <div>
        <JobCard />
      </div>
    </div>
  );
};

export default Home;
