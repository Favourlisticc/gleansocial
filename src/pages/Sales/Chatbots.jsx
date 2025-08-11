import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ChatBubbleBottomCenterTextIcon, 
  CogIcon, 
  PlayIcon, 
  PauseIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

// Expanded static data
const initialChatbots = [
  { id: 1, name: 'Sales Assistant', platform: 'WhatsApp', status: 'Active', responses: 1245, lastUpdated: 'Jul 20, 2023', description: 'Handles sales inquiries and product questions' },
  { id: 2, name: 'Support Bot', platform: 'Website', status: 'Active', responses: 876, lastUpdated: 'Jul 18, 2023', description: 'Provides 24/7 customer support' },
  { id: 3, name: 'Lead Qualifier', platform: 'WhatsApp', status: 'Paused', responses: 1532, lastUpdated: 'Jul 15, 2023', description: 'Qualifies leads before sales team contact' },
  { id: 4, name: 'Order Status', platform: 'Facebook', status: 'Draft', responses: 0, lastUpdated: 'Jul 10, 2023', description: 'Checks order status and shipping info' },
  { id: 5, name: 'FAQ Bot', platform: 'Website', status: 'Active', responses: 2345, lastUpdated: 'Jul 5, 2023', description: 'Answers frequently asked questions' },
  { id: 6, name: 'Appointment Scheduler', platform: 'WhatsApp', status: 'Paused', responses: 432, lastUpdated: 'Jun 28, 2023', description: 'Schedules appointments with agents' },
]

const Chatbots = () => {
  const [chatbots, setChatbots] = useState(initialChatbots)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newChatbot, setNewChatbot] = useState({
    name: '',
    platform: 'Website',
    description: '',
    status: 'Draft'
  })
  const [editingChatbot, setEditingChatbot] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [chatbotToDelete, setChatbotToDelete] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const handleStatusToggle = (id) => {
    const updatedChatbots = chatbots.map(bot => 
      bot.id === id ? 
      { ...bot, status: bot.status === 'Active' ? 'Paused' : 'Active' } : 
      bot
    )
    setChatbots(updatedChatbots)
  }

  const handleCreateChatbot = () => {
    const today = new Date()
    const lastUpdated = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    
    const chatbotToAdd = {
      id: Math.max(...chatbots.map(b => b.id)) + 1,
      ...newChatbot,
      responses: 0,
      lastUpdated
    }
    
    setChatbots([chatbotToAdd, ...chatbots])
    setShowCreateForm(false)
    setNewChatbot({
      name: '',
      platform: 'Website',
      description: '',
      status: 'Draft'
    })
  }

  const handleEditChatbot = (bot) => {
    setEditingChatbot(bot)
    setNewChatbot({
      name: bot.name,
      platform: bot.platform,
      description: bot.description,
      status: bot.status
    })
    setShowCreateForm(true)
  }

  const handleUpdateChatbot = () => {
    const today = new Date()
    const lastUpdated = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    
    const updatedChatbots = chatbots.map(bot => 
      bot.id === editingChatbot.id ? 
      { ...bot, ...newChatbot, lastUpdated } : 
      bot
    )
    
    setChatbots(updatedChatbots)
    setShowCreateForm(false)
    setEditingChatbot(null)
    setNewChatbot({
      name: '',
      platform: 'Website',
      description: '',
      status: 'Draft'
    })
  }

  const handleDeleteChatbot = () => {
    setChatbots(chatbots.filter(bot => bot.id !== chatbotToDelete.id))
    setShowDeleteConfirm(false)
    setChatbotToDelete(null)
  }

  // Filter chatbots based on status and search
  const filteredChatbots = chatbots.filter(bot => {
    if (filterStatus !== 'All' && bot.status !== filterStatus) {
      return false
    }
    if (searchQuery && !bot.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Chatbots</h1>
        <button 
          onClick={() => {
            setEditingChatbot(null)
            setShowCreateForm(true)
          }}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          <span>New Chatbot</span>
        </button>
      </motion.div>

      <div className="flex space-x-3 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Draft">Draft</option>
        </select>
        <input
          type="text"
          placeholder="Search chatbots..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary flex-1"
        />
      </div>

      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingChatbot ? 'Edit Chatbot' : 'Create New Chatbot'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chatbot Name</label>
              <input
                type="text"
                value={newChatbot.name}
                onChange={(e) => setNewChatbot({...newChatbot, name: e.target.value})}
                placeholder="e.g. Support Bot"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <select
                value={newChatbot.platform}
                onChange={(e) => setNewChatbot({...newChatbot, platform: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Website">Website</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Facebook">Facebook</option>
                <option value="Telegram">Telegram</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newChatbot.description}
                onChange={(e) => setNewChatbot({...newChatbot, description: e.target.value})}
                placeholder="Describe what this chatbot does..."
                rows="3"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Status</label>
              <select
                value={newChatbot.status}
                onChange={(e) => setNewChatbot({...newChatbot, status: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingChatbot ? handleUpdateChatbot : handleCreateChatbot}
                disabled={!newChatbot.name}
                className={`px-4 py-2 bg-primary text-white rounded-md ${!newChatbot.name ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryDark'}`}
              >
                {editingChatbot ? 'Update Chatbot' : 'Create Chatbot'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Delete Chatbot</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{chatbotToDelete.name}"? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteChatbot}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredChatbots.length > 0 ? (
          filteredChatbots.map((bot) => (
            <motion.div
              key={bot.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{bot.name}</h3>
                    <p className="text-sm text-gray-500">{bot.platform}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  bot.status === 'Active' ? 'bg-green-100 text-green-800' :
                  bot.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {bot.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{bot.description}</p>

              <div className="flex justify-between text-sm text-gray-600 mb-6">
                <div>
                  <p>Responses</p>
                  <p className="font-medium">{bot.responses.toLocaleString()}</p>
                </div>
                <div>
                  <p>Last Updated</p>
                  <p className="font-medium">{bot.lastUpdated}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => handleEditChatbot(bot)}
                  className="flex-1 flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  <CogIcon className="h-4 w-4 mr-2" />
                  <span>Configure</span>
                </button>
                {bot.status === 'Active' ? (
                  <button 
                    onClick={() => handleStatusToggle(bot.id)}
                    className="flex-1 flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    <PauseIcon className="h-4 w-4 mr-2" />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => handleStatusToggle(bot.id)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
                  >
                    <PlayIcon className="h-4 w-4 mr-2" />
                    <span>Activate</span>
                  </button>
                )}
              </div>

              <div className="mt-3">
                <button 
                  onClick={() => {
                    setChatbotToDelete(bot)
                    setShowDeleteConfirm(true)
                  }}
                  className="text-red-600 hover:text-red-800 text-sm flex items-center"
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  <span>Delete Chatbot</span>
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No chatbots found matching your criteria</p>
            <button 
              onClick={() => {
                setFilterStatus('All')
                setSearchQuery('')
              }}
              className="mt-4 px-4 py-2 text-primary hover:text-primaryDark"
            >
              Clear filters
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Chatbots