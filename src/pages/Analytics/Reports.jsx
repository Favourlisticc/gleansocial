import { motion } from 'framer-motion'
import { DocumentTextIcon, ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline'

const reports = [
  { id: 1, name: 'Monthly Sales Report', type: 'Sales', date: 'Jul 1, 2023', downloads: 45 },
  { id: 2, name: 'Campaign Performance Q2', type: 'Marketing', date: 'Jun 30, 2023', downloads: 32 },
  { id: 3, name: 'Customer Acquisition', type: 'CRM', date: 'Jun 15, 2023', downloads: 28 },
  { id: 4, name: 'Website Traffic Analysis', type: 'Web', date: 'Jun 10, 2023', downloads: 19 },
]

const Reports = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Analytics Reports</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
          Generate Report
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Types</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>CRM</option>
              <option>Web</option>
            </select>
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-primary" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Reports</p>
                <p className="text-xl font-semibold">24</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg. Downloads</p>
                <p className="text-xl font-semibold">31</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center">
              <CalendarIcon className="h-6 w-6 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Last Generated</p>
                <p className="text-xl font-semibold">Jul 1, 2023</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Most Popular</p>
                <p className="text-xl font-semibold">Monthly Sales</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{report.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{report.downloads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primaryDark mr-3">Download</button>
                    <button className="text-gray-600 hover:text-gray-800">Share</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">Showing 1 to 4 of 24 entries</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Reports;