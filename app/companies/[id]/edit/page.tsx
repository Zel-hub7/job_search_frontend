"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const EditCompany = () => {
  const { id } = useParams(); // Extract the company ID from the route
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    industry: "TECHNOLOGY",
    website: "",
    headquarters: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch the company details to pre-fill the form
  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`https://jobs-backend-22vj.onrender.com/api/companies/${id}`);
        if (!response.ok) throw new Error("Failed to fetch company details");

        const companyData = await response.json();
        setFormData({
          name: companyData.name,
          industry: companyData.industry,
          website: companyData.website,
          headquarters: companyData.headquarters,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load company details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://jobs-backend-22vj.onrender.com/api/companies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Company information updated successfully!");
        router.push("/companies"); // Redirect back to the list of companies
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update the company.");
        console.error("Server error:", errorData);
      }
    } catch (err) {
      console.error("Error while updating the company:", err);
      setError("An error occurred while updating the company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
        <Sidebar />
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Edit Company</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="TECHNOLOGY">Technology</option>
              <option value="FINANCE">Finance</option>
              <option value="DESIGN">Design</option>
              <option value="HEALTHCARE">Healthcare</option>
              <option value="EDUCATION">Education</option>
            </select>
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter website URL"
            />
          </div>

          <div>
            <label htmlFor="headquarters" className="block text-sm font-medium text-gray-700">
              Headquarters
            </label>
            <input
              type="text"
              id="headquarters"
              name="headquarters"
              value={formData.headquarters}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter headquarters location"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Company"}
          </button>
        </form>
      )}
    </div>
    </div>
  );
};

export default EditCompany;
