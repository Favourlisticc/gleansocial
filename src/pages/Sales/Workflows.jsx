import { motion } from 'framer-motion'
import { ArrowsRightLeftIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const workflows = [
  { id: 1, name: 'Abandoned Cart', trigger: 'Cart abandoned', actions: ['Email reminder', 'SMS follow-up'], status: 'Active', conversions: 245 },
  { id: 2, name: 'Welcome Series', trigger: 'New customer', actions: ['Welcome email', 'Discount offer'], status: 'Active', conversions: 187 },
  { id: 3, name: 'Re-engagement', trigger: 'No activity 30 days', actions: ['Special offer', 'Feedback request'], status: 'Paused', conversions: 92 },
  { id: 4, name: 'Upsell', trigger: 'Purchase completed', actions: ['Related products', 'Premium offer'], status: 'Draft', conversions: 0 },
]

const Workflows = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Automation Workflows</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
          New Workflow
        </button>
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
            placeholder="Search workflows..." 
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Draft</option>
          </select>
        </div>

        <div className="space-y-4">
          {workflows.map((workflow) => (
            <motion.div
              key={workflow.id}
              whileHover={{ scale: 1.01 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{workflow.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="mr-3">Trigger: {workflow.trigger}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      workflow.status === 'Active' ? 'bg-green-100 text-green-800' :
                      workflow.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {workflow.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {workflow.conversions.toLocaleString()} conversions
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Actions:</h4>
                <div className="flex flex-wrap gap-2">
                  {workflow.actions.map((action, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      {action}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-3">
                <button className="px-3 py-1 border rounded-md text-sm font-medium hover:bg-gray-50">
                  {workflow.status === 'Active' ? 'Pause' : 'Activate'}
                </button>
                <button className="px-3 py-1 bg-primary text-white rounded-md text-sm font-medium hover:bg-primaryDark">
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">Showing 1 to 4 of 8 entries</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Workflows;