'use client'

import React, { useState } from 'react';
import JobCard from "@/components/home/JobCard";
import JobSearch from '@/components/home/JobSearch';
 

const jobs = [
  { title: 'Software Engineer', postedDate: '2024-11-14', category: 'Engineering', location: 'Remote', description: 'Develop and maintain software applications.', requirements: 'Experience with JavaScript and React.', salary: '100K' },
  { title: 'Frontend Developer', postedDate: '2024-11-10', category: 'Development', location: 'New York', description: 'Build beautiful web interfaces.', requirements: 'Experience with React, HTML, and CSS.', salary: '80K' },
  { title: 'Backend Developer', postedDate: '2024-11-09', category: 'Development', location: 'London', description: 'Build the backend of the applications.', requirements: 'Experience with Spring boot, PSQL and Docker.', salary: '80K' }
];

const Home: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    const filteredJobs = jobs.filter(job =>
      job.title.toLowerCase().includes(jobTitle.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
    );
    return filteredJobs;
  };

  return (
    <div>
      <JobSearch jobTitle={jobTitle} setJobTitle={setJobTitle} location={location} setLocation={setLocation} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8">
        {handleSearch().map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Home;
