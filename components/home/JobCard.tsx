import Link from 'next/link';

interface Job {
  title: string;
  postedDate: string;
  category: string;
  location: string;
  description: string;
  requirements: string;
  salary: string;
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md shadow hover:shadow-lg transition">
      <h2 className="text-blue-500 font-semibold">{job.title}</h2>
      <p>{job.postedDate}</p>
      <p>{job.category} | {job.location}</p>
      <p>{job.description}</p>
      <p>Requirements: {job.requirements}</p>
      <p>Salary: {job.salary}</p>
      <button className="bg-blue-500 text-white mt-2 p-2 rounded">Apply</button>
    </div>
  );
};

export default JobCard;
