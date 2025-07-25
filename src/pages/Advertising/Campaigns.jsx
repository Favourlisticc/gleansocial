import { motion } from 'framer-motion'
import { CampaignCard } from '../cards/CampaignCard'

const campaigns = [
  { 
    id: 1, 
    name: 'Summer Sale 2023', 
    channel: 'Email', 
    status: 'Active', 
    progress: 75, 
    startDate: 'Jun 1, 2023', 
    endDate: 'Jul 31, 2023',
    audience: 'All Customers',
    goal: 'Increase Sales',
    sent: '12,345',
    opened: '8,234 (67%)',
    clicked: '3,456 (28%)'
  },
  { 
    id: 2, 
    name: 'New Product Launch', 
    channel: 'WhatsApp', 
    status: 'Pending', 
    progress: 30, 
    startDate: 'Jul 15, 2023', 
    endDate: 'Aug 15, 2023',
    audience: 'Premium Users',
    goal: 'Product Awareness',
    sent: '-',
    opened: '-',
    clicked: '-'
  },
  { 
    id: 3, 
    name: 'Customer Retention', 
    channel: 'SMS', 
    status: 'Completed', 
    progress: 100, 
    startDate: 'May 1, 2023', 
    endDate: 'May 31, 2023',
    audience: 'Inactive Users',
    goal: 'Re-engagement',
    sent: '5,678',
    opened: '4,123 (73%)',
    clicked: '1,234 (22%)'
  },
]

const Campaigns = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Marketing Campaigns</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition-colors">
          Create Campaign
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Channels</option>
              <option>Email</option>
              <option>WhatsApp</option>
              <option>SMS</option>
            </select>
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...campaign} detailed />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Campaigns