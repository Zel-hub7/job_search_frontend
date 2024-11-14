import { useRouter } from 'next/router';

const JobDetails: React.FC = () => {
  const { query } = useRouter();
  const { id } = query;

  // Fetch the job details based on the id, or mock it for now
  const job = { 
    title: 'Software Engineer', 
    postedDate: '2024-11-14', 
    category: 'Engineering', 
    location: 'Remote', 
    description: 'Develop and maintain software applications.',
    requirements: 'Experience with JavaScript and React.',
    salary: '100K'
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold">{job.title}</h1>
      <p className="text-lg text-gray-600">{job.postedDate}</p>
      <p className="mt-2">{job.category} | {job.location}</p>
      <p className="mt-4">{job.description}</p>
      <p className="mt-4"><strong>Requirements:</strong> {job.requirements}</p>
      <p className="mt-4"><strong>Salary:</strong> {job.salary}</p>
      <button className="mt-6 bg-blue-500 text-white p-2 rounded">Apply Now</button>
    </div>
  );
};

export default JobDetails;
