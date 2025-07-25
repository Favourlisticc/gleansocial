import { motion } from 'framer-motion'
import { LeadCard } from '../cards/LeadCard'

const leads = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1234567890', source: 'Website', status: 'New', lastContact: '2 hours ago', score: 85 },
  { id: 2, name: 'Michael Brown', email: 'michael@example.com', phone: '+1987654321', source: 'WhatsApp', status: 'Contacted', lastContact: '1 day ago', score: 72 },
  { id: 3, name: 'Emily Davis', email: 'emily@example.com', phone: '+1122334455', source: 'Email', status: 'Qualified', lastContact: '3 days ago', score: 93 },
  { id: 4, name: 'David Wilson', email: 'david@example.com', phone: '+1567890123', source: 'Social Media', status: 'New', lastContact: '5 hours ago', score: 68 },
  { id: 5, name: 'Jessica Lee', email: 'jessica@example.com', phone: '+1345678901', source: 'Website', status: 'Contacted', lastContact: '2 days ago', score: 79 },
]

export const Leads = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Leads Management</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition-colors">
          Add New Lead
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-4 rounded-lg shadow"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Sources</option>
              <option>Website</option>
              <option>WhatsApp</option>
              <option>Email</option>
              <option>Social Media</option>
            </select>
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Statuses</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
            </select>
          </div>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
            Export
          </button>
        </div>

        <div className="space-y-4">
          {leads.map((lead) => (
            <LeadCard key={lead.id} {...lead} detailed />
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">Showing 1 to 5 of 15 entries</div>
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

export default Leads;