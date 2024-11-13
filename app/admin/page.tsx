import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function AdminDashboard() {
  return (

    <div className='flex'>
        <Sidebar />
    <div className="min-h-screen w-full bg-gray-100 p-8">
      {/* Welcome Message */}
      <div className="text-xl font-semibold mb-4">Hello, Instagram</div>
      <p className="text-gray-500 mb-8">Here is your daily activities and applications</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg flex items-center space-x-4">
          <span className="text-3xl text-blue-600">💼</span> {/* Placeholder icon */}
          <div>
            <div className="text-2xl font-bold">589</div>
            <div className="text-gray-500">Open Jobs</div>
          </div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg flex items-center space-x-4">
          <span className="text-3xl text-yellow-600">🔖</span> {/* Placeholder icon */}
          <div>
            <div className="text-2xl font-bold">2,517</div>
            <div className="text-gray-500">Saved Candidates</div>
          </div>
        </div>
      </div>

      {/* Recently Posted Jobs Table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recently Posted Jobs</h2>
          <a href="#" className="text-blue-600 hover:underline">View all</a>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="px-6 py-3 text-gray-500">Jobs</th>
                <th className="px-6 py-3 text-gray-500">Status</th>
                <th className="px-6 py-3 text-gray-500">Applications</th>
                <th className="px-6 py-3 text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Job 1 */}
              <tr>
                <td className="px-6 py-4">
                  <div>UI/UX Designer</div>
                  <div className="text-gray-500 text-sm">Full Time • 27 days remaining</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-green-600">Active</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-500">👥</span> 798 Applications
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 font-medium">View Applications</button>
                </td>
              </tr>
              {/* Job 2 */}
              <tr>
                <td className="px-6 py-4">
                  <div>Senior UX Designer</div>
                  <div className="text-gray-500 text-sm">Internship • 8 days remaining</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-green-600">Active</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-500">👥</span> 185 Applications
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 font-medium">View Applications</button>
                </td>
              </tr>
              {/* Job 3 */}
              <tr>
                <td className="px-6 py-4">
                  <div>Technical Support Specialist</div>
                  <div className="text-gray-500 text-sm">Part Time • 4 days remaining</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-green-600">Active</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-500">👥</span> 556 Applications
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 font-medium">View Applications</button>
                </td>
              </tr>
              {/* Job 4 */}
              <tr>
                <td className="px-6 py-4">
                  <div>Junior Graphic Designer</div>
                  <div className="text-gray-500 text-sm">Full Time • 24 days remaining</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-green-600">Active</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-500">👥</span> 583 Applications
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 font-medium">View Applications</button>
                </td>
              </tr>
              {/* Job 5 */}
              <tr>
                <td className="px-6 py-4">
                  <div>Front End Developer</div>
                  <div className="text-gray-500 text-sm">Full Time • Dec 7, 2019</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-red-600">Expired</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-500">👥</span> 740 Applications
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 font-medium">View Applications</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
 </div>
  );
}
