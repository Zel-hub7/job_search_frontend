"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

type Company = {
  id: number;
  name: string;
  industry: string;
  website: string;
  headquarters: string;
  createdAt?: string; // Optional: Add if the creation time is available
};

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [sortedCompanies, setSortedCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;

  const [sortBy, setSortBy] = useState("industry");

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://jobs-backend-22vj.onrender.com/api/companies");
        if (!response.ok) throw new Error("Failed to fetch companies");
        const data: Company[] = await response.json();
        setCompanies(data);
        setSortedCompanies(data);
      } catch (err) {
        setError("Unable to load companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Sorting function
  const handleSort = (criteria: string) => {
    setSortBy(criteria);

    const sorted = [...companies];
    switch (criteria) {
      case "industry":
        sorted.sort((a, b) => a.industry.localeCompare(b.industry));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "headquarters":
        sorted.sort((a, b) => a.headquarters.localeCompare(b.headquarters));
        break;
      case "createdAt":
        sorted.sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
        break;
      default:
        break;
    }
    setSortedCompanies(sorted);
    setCurrentPage(1);
  };

  // Modal management
  const openModal = (company: Company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  const handleDelete = async () => {
    if (!selectedCompany) return;

    setDeleting(selectedCompany.id);
    setError("");

    try {
      const response = await fetch(
        `https://jobs-backend-22vj.onrender.com/api/companies/${selectedCompany.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCompanies((prev) => prev.filter((company) => company.id !== selectedCompany.id));
        setShowModal(false);
        setSelectedCompany(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete the company.");
      }
    } catch (err) {
      setError("An error occurred while deleting the company.");
    } finally {
      setDeleting(null);
    }
  };

  // Pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = sortedCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalPages = Math.ceil(sortedCompanies.length / companiesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex">
        <Sidebar />
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">List of Companies</h1>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading companies...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>
              <label className="font-medium text-gray-700 mr-2">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
              >
                <option value="industry">Industry</option>
                <option value="name">Name</option>
                <option value="headquarters">Headquarters</option>
                <option value="createdAt">Creation Time</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md shadow-lg">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-4 py-2 text-left font-medium text-gray-600">ID</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Industry</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Website</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Headquarters</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCompanies.map((company) => (
                  <tr key={company.id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800">{company.id}</td>
                    <td className="px-4 py-2 text-gray-800">{company.name}</td>
                    <td className="px-4 py-2 text-gray-800">{company.industry}</td>
                    <td className="px-4 py-2 text-blue-600">
                      <a href={company.website} target="_blank" rel="noopener noreferrer">
                        {company.website}
                      </a>
                    </td>
                    <td className="px-4 py-2 text-gray-800">{company.headquarters}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Link href={`/companies/${company.id}/edit`}>
                        <button className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => openModal(company)}
                        className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete <strong>{selectedCompany.name}</strong>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default CompanyList;
