import { motion } from 'framer-motion'
import { StatsCard } from './cards/StatsCard'
import { LineChart } from './charts/LineChart'
import { BarChart } from './charts/BarChart'
import { LeadCard } from './cards/LeadCard'
import { CampaignCard } from './cards/CampaignCard'

const stats = [
  { title: 'Total Leads', value: '1,234', change: '+12%', trend: 'up' },
  { title: 'Active Campaigns', value: '8', change: '+2', trend: 'up' },
  { title: 'Conversion Rate', value: '3.2%', change: '-0.5%', trend: 'down' },
  { title: 'Revenue', value: '$24,567', change: '+18%', trend: 'up' },
]

const leads = [
  { name: 'Sarah Johnson', email: 'sarah@example.com', source: 'Website', status: 'New', lastContact: '2 hours ago' },
  { name: 'Michael Brown', email: 'michael@example.com', source: 'WhatsApp', status: 'Contacted', lastContact: '1 day ago' },
  { name: 'Emily Davis', email: 'emily@example.com', source: 'Email', status: 'Qualified', lastContact: '3 days ago' },
  { name: 'David Wilson', email: 'david@example.com', source: 'Social Media', status: 'New', lastContact: '5 hours ago' },
]

const campaigns = [
  { name: 'Summer Sale', channel: 'Email', status: 'Active', progress: 75, startDate: 'Jun 1, 2023', endDate: 'Jul 31, 2023' },
  { name: 'New Product Launch', channel: 'WhatsApp', status: 'Pending', progress: 30, startDate: 'Jul 15, 2023', endDate: 'Aug 15, 2023' },
  { name: 'Customer Retention', channel: 'SMS', status: 'Completed', progress: 100, startDate: 'May 1, 2023', endDate: 'May 31, 2023' },
]

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-800"
      >
        Dashboard Overview
      </motion.h1>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="font-medium text-gray-800 mb-4">Lead Acquisition</h3>
          <LineChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="font-medium text-gray-800 mb-4">Campaign Performance</h3>
          <BarChart />
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Recent Leads</h3>
            <button className="text-sm text-primary hover:text-primaryDark">View All</button>
          </div>
          <div className="space-y-4">
            {leads.map((lead, index) => (
              <LeadCard key={index} {...lead} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Active Campaigns</h3>
            <button className="text-sm text-primary hover:text-primaryDark">Create New</button>
          </div>
          <div className="space-y-4">
            {campaigns.map((campaign, index) => (
              <CampaignCard key={index} {...campaign} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard