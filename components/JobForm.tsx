"use client";

import { useState, useEffect } from "react";

type Company = {
  id: number;
  name: string;
  industry: string;
  website: string;
  headquarters: string;
};

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    companyId: "",
    experienceLevel: "INTERNSHIP",
    type: "FULL_TIME",
    workMode: "REMOTE",
    description: "",
  });

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [error, setError] = useState("");

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoadingCompanies(true);
      setError("");
      try {
        const response = await fetch("https://jobs-backend-22vj.onrender.com/api/companies");
        if (!response.ok) throw new Error("Failed to fetch companies");
        const data: Company[] = await response.json();
        setCompanies(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load companies. Please try again.");
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure companyId is a number
    const payload = {
      ...formData,
      companyId: Number(formData.companyId),
    };

    console.log("Payload being sent:", payload); // Debugging

    // Validate required fields
    if (!payload.title || !payload.companyId || !payload.description) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("https://jobs-backend-22vj.onrender.com/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      if (response.ok) {
        alert("Job posted successfully!");
        setFormData({
          title: "",
          companyId: "",
          experienceLevel: "INTERNSHIP",
          type: "FULL_TIME",
          workMode: "REMOTE",
          description: "",
        });
      } else {
        console.error("Server error:", responseData);
        alert(`Failed to post job: ${responseData.message || "An error occurred."}`);
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred while posting the job. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold mb-4">Post a Job</h1>

      {/* Job Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Company Selection */}
      <div className="mb-4">
        <label htmlFor="companyId" className="block text-sm font-medium text-gray-700">Company</label>
        {loadingCompanies ? (
          <p>Loading companies...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <select
            id="companyId"
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Experience Level */}
      <div className="mb-4">
        <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">Experience Level</label>
        <select
          id="experienceLevel"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="INTERNSHIP">Internship</option>
          <option value="ASSOCIATE">Associate</option>
          <option value="DIRECTOR">Director</option>
          <option value="ENTRY_LEVEL">Entry Level</option>
          <option value="MID_SENIOR_LEVEL">Mid-Senior Level</option>
          <option value="SENIOR_LEVEL">Senior Level</option>
          <option value="EXECUTIVE_LEVEL">Executive Level</option>
        </select>
      </div>

      {/* Job Type */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="FULL_TIME">Full-time</option>
          <option value="PART_TIME">Part-time</option>
          <option value="CONTRACTUAL">Contractual</option>
        </select>
      </div>

      {/* Work Mode */}
      <div className="mb-4">
        <label htmlFor="workMode" className="block text-sm font-medium text-gray-700">Work Mode</label>
        <select
          id="workMode"
          name="workMode"
          value={formData.workMode}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="REMOTE">Remote</option>
          <option value="ON_SITE">ON SITE</option>
          <option value="HYBRID">Hybrid</option>
        </select>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:ring focus:ring-blue-300"
      >
        Post Job
      </button>
    </form>
  );
};

export default JobForm;
