import { motion } from 'framer-motion'
import { ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

const stages = [
  { name: 'Lead', value: 1245, color: 'bg-blue-500' },
  { name: 'Contacted', value: 876, color: 'bg-purple-500' },
  { name: 'Qualified', value: 543, color: 'bg-primary' },
  { name: 'Proposal', value: 321, color: 'bg-yellow-500' },
  { name: 'Closed Won', value: 198, color: 'bg-green-500' },
]

const deals = [
  { id: 1, name: 'Acme Corp Expansion', value: '$12,450', stage: 'Proposal', contact: 'Sarah Johnson', expectedClose: 'Jul 30, 2023' },
  { id: 2, name: 'Globex Platform', value: '$8,720', stage: 'Qualified', contact: 'Michael Brown', expectedClose: 'Aug 15, 2023' },
  { id: 3, name: 'Initech Integration', value: '$5,340', stage: 'Contacted', contact: 'Emily Davis', expectedClose: 'Aug 30, 2023' },
  { id: 4, name: 'Umbrella Security', value: '$15,600', stage: 'Lead', contact: 'David Wilson', expectedClose: 'Sep 10, 2023' },
]

const Pipeline = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Sales Pipeline</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
          New Deal
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="font-medium text-gray-800 mb-4">Pipeline Stages</h3>
        <div className="flex items-end h-32 mb-8 space-x-2">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.name}
              initial={{ height: 0 }}
              animate={{ height: `${(stage.value / 1500) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`flex-1 ${stage.color} relative group rounded-t`}
            >
              <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500">
                {stage.name}
              </div>
              <div className="absolute -top-8 left-0 right-0 text-center text-xs font-medium">
                {stage.value.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-primary" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Pipeline Value</p>
                <p className="text-xl font-semibold">$42,150</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Win Rate</p>
                <p className="text-xl font-semibold">32%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-gray-800">Recent Deals</h3>
          <div className="flex space-x-2">
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Stages</option>
              {stages.map(stage => (
                <option key={stage.name}>{stage.name}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Search deals..." 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Close</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.map((deal) => (
                <tr key={deal.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{deal.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{deal.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      deal.stage === 'Lead' ? 'bg-blue-100 text-blue-800' :
                      deal.stage === 'Contacted' ? 'bg-purple-100 text-purple-800' :
                      deal.stage === 'Qualified' ? 'bg-primary/10 text-primary' :
                      deal.stage === 'Proposal' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{deal.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{deal.expectedClose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primaryDark mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-800">Edit</button>
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

export default Pipeline