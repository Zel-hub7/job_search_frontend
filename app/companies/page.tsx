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
};

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null); // Track which company is being deleted
  const [showModal, setShowModal] = useState(false); // Toggle for modal
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null); // Company to delete

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Handle company deletion
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
        setCompanies((prev) => prev.filter((company) => company.id !== selectedCompany.id)); // Remove deleted company
        alert("Company deleted successfully!");
        setShowModal(false); // Close the modal
        setSelectedCompany(null); // Clear selected company
      } else {
        const errorData = await response.json();
        console.error("Delete error:", errorData);
        setError(errorData.message || "Failed to delete the company.");
      }
    } catch (err) {
      console.error("Error while deleting the company:", err);
      setError("An error occurred while deleting the company. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  // Open modal and set the selected company
  const openModal = (company: Company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  // Pagination logic
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalPages = Math.ceil(companies.length / companiesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex">
        <Sidebar />
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">List of Companies</h1>
      {loading ? (
        <p>Loading companies...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
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
                    {/* Edit Button */}
                    <Link href={`/companies/${company.id}/edit`}>
                      <button className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
                    </Link>
                    {/* Delete Button */}
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

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700">
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
                className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${
                  deleting === selectedCompany.id ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={deleting === selectedCompany.id}
              >
                {deleting === selectedCompany.id ? "Deleting..." : "Delete"}
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
