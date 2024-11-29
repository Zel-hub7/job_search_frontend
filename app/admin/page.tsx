"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalJobs, setTotalJobs] = useState(0); // State to hold total job count
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    // Check if the user is authenticated by looking for the token
    const token = localStorage.getItem("token");

    if (token !== "mockToken") {
      // Redirect unauthorized users to the login page
      router.push("/login");
    }

    // Fetch jobs
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://jobs-backend-22vj.onrender.com/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();

        // Sort jobs by most recent (assume `postedAt` field is available)
        const sortedJobs = data.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        setJobs(sortedJobs);

        // Set total jobs count
        setTotalJobs(data.length);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  // Calculate pagination
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const displayedJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="min-h-screen w-full bg-gray-100 p-8">
        {/* Welcome Message */}
        <div className="text-xl font-semibold mb-4">Hello, Admin</div>
        <p className="text-gray-500 mb-8">Here is your daily activities and applications</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center space-x-4 p-6 bg-blue-50">
              <span className="text-3xl text-blue-600">💼</span> {/* Placeholder icon */}
              <div>
                <CardTitle className="text-2xl font-bold">{loading ? "Loading..." : totalJobs}</CardTitle>
                <CardDescription>Open Jobs</CardDescription>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-6 bg-yellow-50">
              <span className="text-3xl text-yellow-600">🔖</span> {/* Placeholder icon */}
              <div>
                <CardTitle className="text-2xl font-bold">2,517</CardTitle>
                <CardDescription>Saved Candidates</CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recently Posted Jobs Table */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recently Posted Jobs</h2>
            <Button variant="link" className="text-blue-600">
              View all
            </Button>
          </div>
          <Card>
            {loading ? (
              <p className="p-4 text-gray-500">Loading jobs...</p>
            ) : error ? (
              <p className="p-4 text-red-500">{error}</p>
            ) : jobs.length === 0 ? (
              <p className="p-4 text-gray-500">No jobs found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jobs</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>{job.title}</div>
                        <div className="text-gray-500 text-sm">
                          {job.type} • {job.remainingDays} days remaining
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={job.isActive ? "text-green-600" : "text-gray-600"}>
                          {job.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-500">👥</span> {job.applicationsCount} Applications
                      </TableCell>
                      <TableCell>
                        <Button variant="outline">View Applications</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="ml-2">
                              ⋮
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Promote Job</DropdownMenuItem>
                            <DropdownMenuItem>View Detail</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Expired</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "solid" : "outline"}
                  className="mx-1"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
