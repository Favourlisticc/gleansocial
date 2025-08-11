import { motion } from 'framer-motion'
import { useState } from 'react'
import { LeadCard } from '../cards/LeadCard'

// Expanded static data
const initialLeads = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1234567890', source: 'Website', status: 'New', lastContact: '2 hours ago', score: 85 },
  { id: 2, name: 'Michael Brown', email: 'michael@example.com', phone: '+1987654321', source: 'WhatsApp', status: 'Contacted', lastContact: '1 day ago', score: 72 },
  { id: 3, name: 'Emily Davis', email: 'emily@example.com', phone: '+1122334455', source: 'Email', status: 'Qualified', lastContact: '3 days ago', score: 93 },
  { id: 4, name: 'David Wilson', email: 'david@example.com', phone: '+1567890123', source: 'Social Media', status: 'New', lastContact: '5 hours ago', score: 68 },
  { id: 5, name: 'Jessica Lee', email: 'jessica@example.com', phone: '+1345678901', source: 'Website', status: 'Contacted', lastContact: '2 days ago', score: 79 },
  { id: 6, name: 'Robert Smith', email: 'robert@example.com', phone: '+1789054321', source: 'Referral', status: 'Qualified', lastContact: '1 week ago', score: 88 },
  { id: 7, name: 'Lisa Taylor', email: 'lisa@example.com', phone: '+1654321890', source: 'Website', status: 'Lost', lastContact: '2 weeks ago', score: 45 },
]

export const Leads = () => {
  const [leads, setLeads] = useState(initialLeads)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSource, setFilterSource] = useState('All Sources')
  const [filterStatus, setFilterStatus] = useState('All Statuses')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Website',
    status: 'New'
  })

  const itemsPerPage = 5
  const totalItems = initialLeads.length

  // Filter leads based on search and filters
  const filteredLeads = initialLeads.filter(lead => {
    // Filter by search query
    if (searchQuery && 
        !lead.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !lead.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !lead.phone.includes(searchQuery)) {
      return false
    }
    
    // Filter by source
    if (filterSource !== 'All Sources' && lead.source !== filterSource) {
      return false
    }
    
    // Filter by status
    if (filterStatus !== 'All Statuses' && lead.status !== filterStatus) {
      return false
    }
    
    return true
  })

  // Paginate leads
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleAddLead = () => {
    const newId = Math.max(...initialLeads.map(l => l.id)) + 1
    const today = new Date()
    const lastContact = 'Just now'
    const score = Math.floor(Math.random() * 30) + 70 // Random score between 70-100
    
    const leadToAdd = {
      id: newId,
      ...newLead,
      lastContact,
      score
    }
    
    initialLeads.unshift(leadToAdd)
    setLeads([...initialLeads])
    setShowAddForm(false)
    setNewLead({
      name: '',
      email: '',
      phone: '',
      source: 'Website',
      status: 'New'
    })
  }

  const handleExport = () => {
    // Simulate export functionality
    alert(`Exporting ${filteredLeads.length} leads to CSV`)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Leads Management</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition-colors"
        >
          Add New Lead
        </button>
      </motion.div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Add New Lead</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={newLead.name}
                onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={newLead.email}
                onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                placeholder="john@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={newLead.phone}
                onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                placeholder="+1234567890"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select
                value={newLead.source}
                onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Website">Website</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Social Media">Social Media</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={newLead.status}
                onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddLead}
              disabled={!newLead.name || !newLead.email}
              className={`px-4 py-2 bg-primary text-white rounded-md ${!newLead.name || !newLead.email ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryDark'}`}
            >
              Add Lead
            </button>
          </div>
        </motion.div>
      )}

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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select 
              value={filterSource}
              onChange={(e) => {
                setFilterSource(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All Sources">All Sources</option>
              <option value="Website">Website</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
              <option value="Social Media">Social Media</option>
              <option value="Referral">Referral</option>
            </select>
            <select 
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <button 
            onClick={handleExport}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Export
          </button>
        </div>

        <div className="space-y-4">
          {paginatedLeads.length > 0 ? (
            paginatedLeads.map((lead) => (
              <LeadCard key={lead.id} {...lead} detailed />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No leads found matching your criteria
            </div>
          )}
        </div>

        {filteredLeads.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLeads.length)} of {filteredLeads.length} entries
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

export default Leads