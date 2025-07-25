import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'

export const CustomerDetails = () => {
  const { id } = useParams()
  
  // In a real app, you would fetch this data based on the ID
  const customer = {
    id: id,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1234567890',
    company: 'Johnson & Co',
    source: 'Website',
    status: 'Active Customer',
    value: '$2,450',
    lastPurchase: 'July 15, 2023',
    nextAction: 'Follow-up call on July 25',
    notes: 'Interested in premium plan. Needs demo of advanced features.',
    interactions: [
      { date: 'Jul 15, 2023', type: 'Purchase', details: 'Purchased Standard Plan' },
      { date: 'Jul 10, 2023', type: 'Email', details: 'Responded to pricing inquiry' },
      { date: 'Jul 5, 2023', type: 'Call', details: 'Initial discovery call' },
      { date: 'Jul 1, 2023', type: 'Website', details: 'Signed up for trial' },
    ]
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{customer.name}</h1>
          <p className="text-gray-600">{customer.company}</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Edit</button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">Log Interaction</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Source</p>
                <p className="font-medium">{customer.source}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{customer.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lifetime Value</p>
                <p className="font-medium">{customer.value}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Purchase</p>
                <p className="font-medium">{customer.lastPurchase}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Interactions</h2>
            <div className="space-y-4">
              {customer.interactions.map((interaction, index) => (
                <div key={index} className="border-l-2 border-primary pl-4 py-2">
                  <div className="flex justify-between">
                    <p className="font-medium">{interaction.type}</p>
                    <p className="text-sm text-gray-500">{interaction.date}</p>
                  </div>
                  <p className="text-gray-600">{interaction.details}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Next Action</h2>
            <p className="text-gray-600 mb-4">{customer.nextAction}</p>
            <button className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
              Mark as Complete
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Notes</h2>
            <p className="text-gray-600 mb-4">{customer.notes}</p>
            <textarea 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-3"
              rows="3"
              placeholder="Add new note..."
            ></textarea>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
              Save Note
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}