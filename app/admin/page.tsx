import Sidebar from '@/components/Sidebar';
import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function AdminDashboard() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="min-h-screen w-full bg-gray-100 p-8">
        {/* Welcome Message */}
        <div className="text-xl font-semibold mb-4">Hello, Instagram</div>
        <p className="text-gray-500 mb-8">Here is your daily activities and applications</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center space-x-4 p-6 bg-blue-50">
              <span className="text-3xl text-blue-600">💼</span> {/* Placeholder icon */}
              <div>
                <CardTitle className="text-2xl font-bold">589</CardTitle>
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
            <Button variant="link" className="text-blue-600">View all</Button>
          </div>
          <Card>
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
                {/* Example Row */}
                <TableRow>
                  <TableCell>
                    <div>UI/UX Designer</div>
                    <div className="text-gray-500 text-sm">Full Time • 27 days remaining</div>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600">Active</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-500">👥</span> 798 Applications
                  </TableCell>
                  <TableCell>
                    <Button variant="outline">View Applications</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="ml-2">⋮</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Promote Job</DropdownMenuItem>
                        <DropdownMenuItem>View Detail</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Expired</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
