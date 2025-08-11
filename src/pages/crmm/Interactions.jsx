import { motion } from 'framer-motion'
import { useState } from 'react'
import { PhoneIcon, EnvelopeIcon, ChatBubbleBottomCenterTextIcon, CalendarIcon } from '@heroicons/react/24/outline'

// Expanded static data
const initialInteractions = [
  { id: 1, type: 'Call', customer: 'Sarah Johnson', date: 'Jul 20, 2023 10:30 AM', duration: '15m', outcome: 'Positive', notes: 'Discussed new product features' },
  { id: 2, type: 'Email', customer: 'Michael Brown', date: 'Jul 19, 2023 2:15 PM', outcome: 'Neutral', notes: 'Sent pricing information' },
  { id: 3, type: 'WhatsApp', customer: 'Emily Davis', date: 'Jul 18, 2023 4:45 PM', outcome: 'Positive', notes: 'Confirmed order delivery' },
  { id: 4, type: 'Call', customer: 'David Wilson', date: 'Jul 17, 2023 11:20 AM', duration: '8m', outcome: 'Negative', notes: 'Customer complaint about service' },
  { id: 5, type: 'Email', customer: 'Robert Smith', date: 'Jul 16, 2023 9:10 AM', outcome: 'Positive', notes: 'Follow-up on contract' },
  { id: 6, type: 'Call', customer: 'Lisa Taylor', date: 'Jul 15, 2023 3:30 PM', duration: '22m', outcome: 'Positive', notes: 'Product demo session' },
]

const Interactions = () => {
  const [interactions, setInteractions] = useState(initialInteractions)
  const [filterType, setFilterType] = useState('All Types')
  const [filterOutcome, setFilterOutcome] = useState('All Outcomes')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showLogForm, setShowLogForm] = useState(false)
  const [newInteraction, setNewInteraction] = useState({
    type: 'Call',
    customer: '',
    notes: '',
    outcome: 'Neutral'
  })

  const itemsPerPage = 4
  const totalItems = initialInteractions.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const getInteractionIcon = (type) => {
    switch(type) {
      case 'Call': return <PhoneIcon className="h-5 w-5 text-blue-500" />
      case 'Email': return <EnvelopeIcon className="h-5 w-5 text-primary" />
      case 'WhatsApp': return <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-green-500" />
      default: return <PhoneIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getOutcomeColor = (outcome) => {
    switch(outcome) {
      case 'Positive': return 'bg-green-100 text-green-800'
      case 'Negative': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredInteractions = initialInteractions.filter(interaction => {
    // Filter by type
    if (filterType !== 'All Types' && interaction.type !== filterType) {
      return false
    }
    
    // Filter by outcome
    if (filterOutcome !== 'All Outcomes' && interaction.outcome !== filterOutcome) {
      return false
    }
    
    // Filter by search query
    if (searchQuery && 
        !interaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !interaction.notes.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    return true
  })

  const paginatedInteractions = filteredInteractions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleLogInteraction = () => {
    const newId = Math.max(...initialInteractions.map(i => i.id)) + 1
    const today = new Date()
    const formattedDate = today.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    
    const interactionToAdd = {
      id: newId,
      type: newInteraction.type,
      customer: newInteraction.customer || 'New Customer',
      date: formattedDate,
      duration: newInteraction.type === 'Call' ? '5m' : undefined,
      outcome: newInteraction.outcome,
      notes: newInteraction.notes || 'No notes provided'
    }
    
    initialInteractions.unshift(interactionToAdd)
    setInteractions([...initialInteractions])
    setShowLogForm(false)
    setNewInteraction({
      type: 'Call',
      customer: '',
      notes: '',
      outcome: 'Neutral'
    })
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Customer Interactions</h1>
        <button 
          onClick={() => setShowLogForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition-colors"
        >
          Log Interaction
        </button>
      </motion.div>

      {showLogForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Log New Interaction</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newInteraction.type}
                onChange={(e) => setNewInteraction({...newInteraction, type: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Call">Call</option>
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <input
                type="text"
                value={newInteraction.customer}
                onChange={(e) => setNewInteraction({...newInteraction, customer: e.target.value})}
                placeholder="Customer name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Outcome</label>
              <select
                value={newInteraction.outcome}
                onChange={(e) => setNewInteraction({...newInteraction, outcome: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={newInteraction.notes}
                onChange={(e) => setNewInteraction({...newInteraction, notes: e.target.value})}
                placeholder="Interaction notes..."
                rows="3"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowLogForm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogInteraction}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
              >
                Save Interaction
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <select 
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All Types">All Types</option>
              <option value="Call">Call</option>
              <option value="Email">Email</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
            <select 
              value={filterOutcome}
              onChange={(e) => {
                setFilterOutcome(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All Outcomes">All Outcomes</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
            <input 
              type="text" 
              placeholder="Search interactions..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-4">
          {paginatedInteractions.length > 0 ? (
            paginatedInteractions.map((interaction) => (
              <motion.div
                key={interaction.id}
                whileHover={{ scale: 1.01 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-gray-100 mr-4">
                    {getInteractionIcon(interaction.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{interaction.customer}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>{interaction.date}</span>
                          {interaction.duration && (
                            <span className="ml-3">{interaction.duration}</span>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getOutcomeColor(interaction.outcome)}`}>
                        {interaction.outcome}
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p className="font-medium">Notes:</p>
                      <p>{interaction.notes}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No interactions found matching your criteria
            </div>
          )}
        </div>

        {filteredInteractions.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredInteractions.length)} of {filteredInteractions.length} entries
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                  >
                    {page}
                  </button>
                )
              })}
              
              {totalPages > 3 && currentPage > 3 && (
                <span className="px-3 py-1">...</span>
              )}
              
              {totalPages > 3 && currentPage > 3 && currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage)}
                  className="px-3 py-1 border rounded-md bg-primary text-white"
                >
                  {currentPage}
                </button>
              )}
              
              {totalPages > 3 && currentPage < totalPages - 2 && (
                <span className="px-3 py-1">...</span>
              )}
              
              {totalPages > 3 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                >
                  {totalPages}
                </button>
              )}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Interactions