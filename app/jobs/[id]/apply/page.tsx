"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const ApplyPage = () => {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id;

  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    applicantAddress: "",
    applicantBirthDate: "",
    applicantGender: "MALE",
    applicantEducationLevel: "HIGH_SCHOOL",
    applicantExperienceLevel: "INTERNSHIP",
    coverLetter: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      applicantName: formData.applicantName,
      applicantEmail: formData.applicantEmail,
      applicantPhone: formData.applicantPhone,
      applicantAddress: formData.applicantAddress,
      applicantBirthDate: formData.applicantBirthDate,
      applicantGender: formData.applicantGender,
      applicantEducationLevel: formData.applicantEducationLevel,
      applicantExperienceLevel: formData.applicantExperienceLevel,
      coverLetter: formData.coverLetter,
    };

    console.log("Payload being sent to API:", payload);

    const endpoint = `https://jobs-backend-22vj.onrender.com/api/jobs/${jobId}/apply`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      if (response.ok) {
        alert("Application submitted successfully!");
        router.push("/");
      } else {
        setError(responseData.error || "Failed to submit the application.");
        console.error("Server error:", responseData);
      }
    } catch (err) {
      console.error("Error while submitting the application:", err);
      setError("An error occurred while submitting the application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Apply for Job #{jobId}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="applicantEmail"
            name="applicantEmail"
            value={formData.applicantEmail}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="applicantPhone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="applicantPhone"
            name="applicantPhone"
            value={formData.applicantPhone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="applicantAddress" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="applicantAddress"
            name="applicantAddress"
            value={formData.applicantAddress}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your address"
          />
        </div>

        <div>
          <label htmlFor="applicantBirthDate" className="block text-sm font-medium text-gray-700">
            Birth Date
          </label>
          <input
            type="date"
            id="applicantBirthDate"
            name="applicantBirthDate"
            value={formData.applicantBirthDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="applicantGender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="applicantGender"
            name="applicantGender"
            value={formData.applicantGender}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="applicantEducationLevel" className="block text-sm font-medium text-gray-700">
            Education Level
          </label>
          <select
            id="applicantEducationLevel"
            name="applicantEducationLevel"
            value={formData.applicantEducationLevel}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="HIGH_SCHOOL">High School</option>
            <option value="BACHELOR">Bachelor's</option>
            <option value="MASTER">Master's</option>
            <option value="DOCTORATE">Doctorate</option>
          </select>
        </div>

        <div>
          <label htmlFor="applicantExperienceLevel" className="block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select
            id="applicantExperienceLevel"
            name="applicantExperienceLevel"
            value={formData.applicantExperienceLevel}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="INTERNSHIP">Internship</option>
            <option value="JUNIOR">Junior</option>
            <option value="MID">Mid</option>
            <option value="SENIOR">Senior</option>
          </select>
        </div>

        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Write your cover letter here..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 focus:outline-none"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;
