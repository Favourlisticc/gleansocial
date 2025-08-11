import { motion } from 'framer-motion'
import { CampaignCard } from '../cards/CampaignCard'
import { useState } from 'react'

const Campaigns = () => {
  // Initial static data with state management
  const [campaigns, setCampaigns] = useState([
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
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [channelFilter, setChannelFilter] = useState('All Channels')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    channel: 'Email',
    startDate: '',
    endDate: '',
    audience: 'All Customers',
    goal: ''
  })

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChannel = channelFilter === 'All Channels' || campaign.channel === channelFilter
    const matchesStatus = statusFilter === 'All Statuses' || campaign.status === statusFilter
    return matchesSearch && matchesChannel && matchesStatus
  })

  // Handler functions
  const handleCreateCampaign = () => {
    if (showCreateModal) {
      // Validate form
      if (!newCampaign.name || !newCampaign.startDate || !newCampaign.endDate) {
        alert('Please fill all required fields')
        return
      }

      // Create new campaign
      const campaignId = Math.max(...campaigns.map(c => c.id)) + 1
      const newCampaignObj = {
        id: campaignId,
        name: newCampaign.name,
        channel: newCampaign.channel,
        status: 'Pending',
        progress: 0,
        startDate: newCampaign.startDate,
        endDate: newCampaign.endDate,
        audience: newCampaign.audience,
        goal: newCampaign.goal || 'General Marketing',
        sent: '-',
        opened: '-',
        clicked: '-'
      }

      setCampaigns([...campaigns, newCampaignObj])
      setShowCreateModal(false)
      setNewCampaign({
        name: '',
        channel: 'Email',
        startDate: '',
        endDate: '',
        audience: 'All Customers',
        goal: ''
      })
      alert('Campaign created successfully!')
    } else {
      setShowCreateModal(true)
    }
  }

  const handleDeleteCampaign = (id) => {
    if (('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== id))
      alert('Campaign deleted successfully!')
    }
  }

  const handleDuplicateCampaign = (id) => {
    const campaignToDuplicate = campaigns.find(c => c.id === id)
    if (campaignToDuplicate) {
      const newId = Math.max(...campaigns.map(c => c.id)) + 1
      const duplicatedCampaign = {
        ...campaignToDuplicate,
        id: newId,
        name: `${campaignToDuplicate.name} (Copy)`,
        status: 'Pending',
        progress: 0,
        sent: '-',
        opened: '-',
        clicked: '-'
      }
      setCampaigns([...campaigns, duplicatedCampaign])
      alert('Campaign duplicated successfully!')
    }
  }

  const handleStatusChange = (id, newStatus) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id ? { ...campaign, status: newStatus } : campaign
    ))
    alert(`Campaign status updated to ${newStatus}!`)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Marketing Campaigns</h1>
        <button 
          onClick={handleCreateCampaign}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition-colors"
        >
          {showCreateModal ? 'Save Campaign' : 'Create Campaign'}
        </button>
      </motion.div>

      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name*</label>
              <input
                type="text"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="e.g. Summer Sale"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Channel*</label>
              <select
                value={newCampaign.channel}
                onChange={(e) => setNewCampaign({...newCampaign, channel: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="SMS">SMS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
              <input
                type="date"
                value={newCampaign.startDate}
                onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date*</label>
              <input
                type="date"
                value={newCampaign.endDate}
                onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
              <select
                value={newCampaign.audience}
                onChange={(e) => setNewCampaign({...newCampaign, audience: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="All Customers">All Customers</option>
                <option value="Premium Users">Premium Users</option>
                <option value="Inactive Users">Inactive Users</option>
                <option value="New Users">New Users</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
              <input
                type="text"
                value={newCampaign.goal}
                onChange={(e) => setNewCampaign({...newCampaign, goal: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="e.g. Increase sales by 20%"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCampaign}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
            >
              Save Campaign
            </button>
          </div>
        </motion.div>
      )}

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select 
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Channels</option>
              <option>Email</option>
              <option>WhatsApp</option>
              <option>SMS</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id} 
                {...campaign} 
                detailed 
                onDelete={() => handleDeleteCampaign(campaign.id)}
                onDuplicate={() => handleDuplicateCampaign(campaign.id)}
                onStatusChange={(newStatus) => handleStatusChange(campaign.id, newStatus)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No campaigns found matching your criteria
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Campaigns