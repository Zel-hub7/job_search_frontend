"use client";

import { useState } from "react";

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    companyId: "",
    experienceLevel: "INTERNSHIP",
    type: "FULL_TIME",
    workMode: "REMOTE",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert companyId to number
    const payload = {
      ...formData,
      companyId: Number(formData.companyId), // Ensure companyId is sent as a number
    };

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

      if (response.ok) {
        alert("Job posted successfully!");
        // Reset form data
        setFormData({
          title: "",
          companyId: "",
          experienceLevel: "INTERNSHIP",
          type: "FULL_TIME",
          workMode: "REMOTE",
          description: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(`Failed to post job: ${errorData.message || "An error occurred."}`);
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred while posting the job. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold mb-4">Post a Job</h1>

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

      <div className="mb-4">
        <label htmlFor="companyId" className="block text-sm font-medium text-gray-700">Company ID</label>
        <input
          type="number" // Change input type to number for better UX
          id="companyId"
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

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
          <option value="JUNIOR">Junior</option>
          <option value="MID">Mid</option>
          <option value="SENIOR">Senior</option>
        </select>
      </div>

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
          <option value="CONTRACT">Contract</option>
        </select>
      </div>

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
          <option value="ONSITE">Onsite</option>
        </select>
      </div>

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
