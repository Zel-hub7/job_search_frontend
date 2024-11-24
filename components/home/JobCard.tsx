"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: {
    name: string;
    industry: string;
    website: string;
    headquarters: string;
  };
  postedAt: string;
  experienceLevel: string;
  type: string;
  workMode: string;
  description: string;
}

const JobCard: React.FC<{ job: Job; loading: boolean }> = ({ job, loading }) => {
  return (
    <div
      className={`border border-gray-300 p-4 rounded-md shadow hover:shadow-lg transition flex flex-col h-full ${
        loading ? "backdrop-blur-sm opacity-50 animate-pulse" : ""
      }`}
    >
      <h2 className="text-blue-500 font-semibold">{job.title}</h2>
      <p className="text-sm text-gray-600 mt-2">Posted: {new Date(job.postedAt).toLocaleDateString()}</p>
      <p className="text-sm text-gray-600 mt-1">Company: {job.company.name}</p>
      <p className="text-sm text-gray-600 mt-1">
        Type: {job.type} | Mode: {job.workMode}
      </p>
      <p className="mt-2 text-gray-800 flex-grow">{job.description}</p>
      <Link href={`/jobs/${job.id}/apply`}>
        <button className="bg-blue-500 text-white mt-2 p-2 rounded w-full">Apply</button>
      </Link>
    </div>
  );
};

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://jobs-backend-22vj.onrender.com/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data: Job[] = await response.json();
        const uniqueJobs = (jobs: Job[]) => {
          const jobMap = new Map();
          jobs.forEach((job) => jobMap.set(job.id, job));
          return Array.from(jobMap.values());
        };
        setJobs(uniqueJobs(data));
      } catch (err) {
        setError("Unable to fetch jobs. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-md shadow flex flex-col h-full backdrop-blur-sm opacity-50 animate-pulse"
            >
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
              <div className="bg-blue-300 rounded h-10 w-full"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 mt-6">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} loading={loading} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
