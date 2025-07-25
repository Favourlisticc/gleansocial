import { motion } from 'framer-motion'
import { UserGroupIcon, ChartBarIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

const segments = [
  { id: 1, name: 'High Value Customers', criteria: 'LTV > $1000', size: 245, lastUsed: 'Jul 20, 2023' },
  { id: 2, name: 'Inactive Users', criteria: 'No purchase in 90 days', size: 876, lastUsed: 'Jul 18, 2023' },
  { id: 3, name: 'New Signups', criteria: 'Created in last 7 days', size: 153, lastUsed: 'Jul 15, 2023' },
  { id: 4, name: 'Abandoned Cart', criteria: 'Added to cart but not purchased', size: 432, lastUsed: 'Jul 10, 2023' },
]

const Segments = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Customer Segments</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
            Analyze
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
            New Segment
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <input 
            type="text" 
            placeholder="Search segments..." 
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center">
              <UserGroupIcon className="h-6 w-6 text-primary" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Segments</p>
                <p className="text-xl font-semibold">12</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg. Segment Size</p>
                <p className="text-xl font-semibold">426</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center">
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Active in Campaigns</p>
                <p className="text-xl font-semibold">8</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <p className="text-xl font-semibold">18%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criteria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {segments.map((segment) => (
                <tr key={segment.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{segment.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{segment.criteria}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{segment.size.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{segment.lastUsed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primaryDark mr-3">Use</button>
                    <button className="text-gray-600 hover:text-gray-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">Showing 1 to 4 of 12 entries</div>
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

export default Segments