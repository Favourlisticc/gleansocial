import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  ArrowPathIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'
import { StatsCard } from './cards/StatsCard'
import { LineChart } from './charts/LineChart'
import { BarChart } from './charts/BarChart'
import { LeadCard } from './cards/LeadCard'
import { CampaignCard } from './cards/CampaignCard'

// Sample data generators
const generateStats = () => [
  { 
    title: 'Total Leads', 
    value: Math.floor(Math.random() * 5000) + 1000, 
    change: `${Math.floor(Math.random() * 20) - 5}%`,
    trend: Math.random() > 0.5 ? 'up' : 'down' 
  },
  { 
    title: 'Active Campaigns', 
    value: Math.floor(Math.random() * 10) + 1, 
    change: `${Math.floor(Math.random() * 5) - 2}`,
    trend: Math.random() > 0.5 ? 'up' : 'down' 
  },
  { 
    title: 'Conversion Rate', 
    value: (Math.random() * 5 + 1).toFixed(1) + '%', 
    change: `${(Math.random() * 2 - 1).toFixed(1)}%`,
    trend: Math.random() > 0.5 ? 'up' : 'down' 
  },
  { 
    title: 'Revenue', 
    value: `$${(Math.random() * 50000 + 10000).toLocaleString(undefined, {maximumFractionDigits: 0})}`, 
    change: `${Math.floor(Math.random() * 30) - 5}%`,
    trend: Math.random() > 0.5 ? 'up' : 'down' 
  },
]

const generateLeads = () => [
  { 
    id: 1,
    name: 'Sarah Johnson', 
    email: 'sarah@example.com', 
    source: 'Website', 
    status: 'New', 
    lastContact: '2 hours ago',
    score: Math.floor(Math.random() * 50) + 50
  },
  { 
    id: 2,
    name: 'Michael Brown', 
    email: 'michael@example.com', 
    source: 'WhatsApp', 
    status: 'Contacted', 
    lastContact: '1 day ago',
    score: Math.floor(Math.random() * 50) + 50
  },
  { 
    id: 3,
    name: 'Emily Davis', 
    email: 'emily@example.com', 
    source: 'Email', 
    status: 'Qualified', 
    lastContact: '3 days ago',
    score: Math.floor(Math.random() * 50) + 50
  },
  { 
    id: 4,
    name: 'David Wilson', 
    email: 'david@example.com', 
    source: 'Social Media', 
    status: 'New', 
    lastContact: '5 hours ago',
    score: Math.floor(Math.random() * 50) + 50
  },
]

const generateCampaigns = () => [
  { 
    id: 1,
    name: 'Summer Sale', 
    channel: 'Email', 
    status: 'Active', 
    progress: Math.floor(Math.random() * 50) + 50, 
    startDate: 'Jun 1, 2023', 
    endDate: 'Jul 31, 2023',
    budget: `$${(Math.random() * 10000 + 5000).toLocaleString(undefined, {maximumFractionDigits: 0})}`
  },
  { 
    id: 2,
    name: 'New Product Launch', 
    channel: 'WhatsApp', 
    status: 'Pending', 
    progress: Math.floor(Math.random() * 50), 
    startDate: 'Jul 15, 2023', 
    endDate: 'Aug 15, 2023',
    budget: `$${(Math.random() * 15000 + 10000).toLocaleString(undefined, {maximumFractionDigits: 0})}`
  },
  { 
    id: 3,
    name: 'Customer Retention', 
    channel: 'SMS', 
    status: 'Completed', 
    progress: 100, 
    startDate: 'May 1, 2023', 
    endDate: 'May 31, 2023',
    budget: `$${(Math.random() * 8000 + 3000).toLocaleString(undefined, {maximumFractionDigits: 0})}`
  },
]

const Dashboard = () => {
  const [stats, setStats] = useState(generateStats())
  const [leads, setLeads] = useState(generateLeads())
  const [campaigns, setCampaigns] = useState(generateCampaigns())
  const [refreshing, setRefreshing] = useState(false)
  const [sortConfig, setSortConfig] = useState(null)
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    channel: 'Email',
    startDate: '',
    endDate: '',
    budget: ''
  })

  // Refresh all data
  const refreshData = () => {
    setRefreshing(true)
    setTimeout(() => {
      setStats(generateStats())
      setLeads(generateLeads())
      setCampaigns(generateCampaigns())
      setRefreshing(false)
    }, 1000)
  }

  // Sort leads
  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedLeads = [...leads]
  if (sortConfig !== null) {
    sortedLeads.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }

  // Handle new campaign form
  const handleCampaignInputChange = (e) => {
    const { name, value } = e.target
    setNewCampaign(prev => ({ ...prev, [name]: value }))
  }

  const handleAddCampaign = (e) => {
    e.preventDefault()
    const newId = Math.max(...campaigns.map(c => c.id), 0) + 1
    setCampaigns([...campaigns, {
      id: newId,
      name: newCampaign.name,
      channel: newCampaign.channel,
      status: 'Pending',
      progress: 0,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      budget: `$${parseInt(newCampaign.budget).toLocaleString()}`
    }])
    setNewCampaign({
      name: '',
      channel: 'Email',
      startDate: '',
      endDate: '',
      budget: ''
    })
    setShowNewCampaignModal(false)
  }

  // Simulate data updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData()
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800"
        >
          Dashboard Overview
        </motion.h1>
        <button 
          onClick={refreshData}
          disabled={refreshing}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowPathIcon className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <StatsCard 
            key={index} 
            title={stat.title}
            value={stat.value.toLocaleString()}
            change={stat.change}
            trend={stat.trend}
            delay={index * 0.1}
          />
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Lead Acquisition</h3>
            <select className="text-sm border rounded px-2 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <LineChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Campaign Performance</h3>
            <select className="text-sm border rounded px-2 py-1">
              <option>By Impressions</option>
              <option>By Conversions</option>
              <option>By Revenue</option>
            </select>
          </div>
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('name')}
                  >
                    <div className="flex items-center">
                      Name
                      {sortConfig?.key === 'name' && (
                        sortConfig.direction === 'ascending' ? 
                        <ChevronUpIcon className="ml-1 h-4 w-4" /> : 
                        <ChevronDownIcon className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedLeads.map((lead) => (
                  <LeadCard 
                    key={lead.id}
                    id={lead.id}
                    name={lead.name}
                    email={lead.email}
                    source={lead.source}
                    status={lead.status}
                    lastContact={lead.lastContact}
                    score={lead.score}
                  />
                ))}
              </tbody>
            </table>
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
            <div className="flex space-x-2">
              <select className="text-sm border rounded px-2 py-1">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
              <button 
                onClick={() => setShowNewCampaignModal(true)}
                className="text-sm text-primary hover:text-primaryDark flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Create New
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id}
                id={campaign.id}
                name={campaign.name}
                channel={campaign.channel}
                status={campaign.status}
                progress={campaign.progress}
                startDate={campaign.startDate}
                endDate={campaign.endDate}
                budget={campaign.budget}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Create New Campaign</h2>
            <form onSubmit={handleAddCampaign}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCampaign.name}
                    onChange={handleCampaignInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel</label>
                  <select
                    name="channel"
                    value={newCampaign.channel}
                    onChange={handleCampaignInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newCampaign.startDate}
                      onChange={handleCampaignInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newCampaign.endDate}
                      onChange={handleCampaignInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    name="budget"
                    value={newCampaign.budget}
                    onChange={handleCampaignInputChange}
                    required
                    min="1000"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewCampaignModal(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Dashboard