import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

// Expanded static data
const initialStages = [
  { name: 'Lead', value: 1245, color: 'bg-blue-500', deals: [] },
  { name: 'Contacted', value: 876, color: 'bg-purple-500', deals: [] },
  { name: 'Qualified', value: 543, color: 'bg-primary', deals: [] },
  { name: 'Proposal', value: 321, color: 'bg-yellow-500', deals: [] },
  { name: 'Closed Won', value: 198, color: 'bg-green-500', deals: [] },
]

const initialDeals = [
  { id: 1, name: 'Acme Corp Expansion', value: 12450, stage: 'Proposal', contact: 'Sarah Johnson', expectedClose: 'Jul 30, 2023', notes: 'Waiting for final approval from CFO' },
  { id: 2, name: 'Globex Platform', value: 8720, stage: 'Qualified', contact: 'Michael Brown', expectedClose: 'Aug 15, 2023', notes: 'Technical review scheduled' },
  { id: 3, name: 'Initech Integration', value: 5340, stage: 'Contacted', contact: 'Emily Davis', expectedClose: 'Aug 30, 2023', notes: 'Initial demo completed' },
  { id: 4, name: 'Umbrella Security', value: 15600, stage: 'Lead', contact: 'David Wilson', expectedClose: 'Sep 10, 2023', notes: 'Needs discovery call' },
  { id: 5, name: 'Stark Industries', value: 25300, stage: 'Proposal', contact: 'Tony Stark', expectedClose: 'Jul 25, 2023', notes: 'Contract sent for signature' },
  { id: 6, name: 'Wayne Enterprises', value: 18700, stage: 'Qualified', contact: 'Bruce Wayne', expectedClose: 'Aug 5, 2023', notes: 'Budget approved' },
]

const Pipeline = () => {
  const [stages, setStages] = useState(() => {
    // Distribute deals to stages
    const stagesWithDeals = [...initialStages]
    initialDeals.forEach(deal => {
      const stageIndex = stagesWithDeals.findIndex(s => s.name === deal.stage)
      if (stageIndex > -1) {
        stagesWithDeals[stageIndex].deals.push(deal)
      }
    })
    return stagesWithDeals
  })
  const [deals, setDeals] = useState(initialDeals)
  const [showDealForm, setShowDealForm] = useState(false)
  const [currentDeal, setCurrentDeal] = useState(null)
  const [newDeal, setNewDeal] = useState({
    name: '',
    value: '',
    stage: 'Lead',
    contact: '',
    expectedClose: '',
    notes: ''
  })
  const [viewingDeal, setViewingDeal] = useState(null)
  const [filterStage, setFilterStage] = useState('All Stages')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 4
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const wonDeals = deals.filter(deal => deal.stage === 'Closed Won').length
  const winRate = Math.round((wonDeals / deals.length) * 100) || 0

  // Filter deals based on stage and search
  const filteredDeals = deals.filter(deal => {
    if (filterStage !== 'All Stages' && deal.stage !== filterStage) return false
    if (searchQuery && !deal.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Paginate deals
  const paginatedDeals = filteredDeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleCreateDeal = () => {
    const dealToAdd = {
      id: Math.max(...deals.map(d => d.id)) + 1,
      ...newDeal,
      value: parseInt(newDeal.value) || 0
    }
    
    // Add to deals
    const updatedDeals = [dealToAdd, ...deals]
    setDeals(updatedDeals)
    
    // Update stages
    const updatedStages = stages.map(stage => {
      if (stage.name === newDeal.stage) {
        return {
          ...stage,
          value: stage.value + 1,
          deals: [...stage.deals, dealToAdd]
        }
      }
      return stage
    })
    setStages(updatedStages)
    
    setShowDealForm(false)
    resetForm()
  }

  const handleUpdateDeal = () => {
    const updatedDeals = deals.map(deal => 
      deal.id === currentDeal.id ? { ...deal, ...newDeal, value: parseInt(newDeal.value) || 0 } : deal
    )
    setDeals(updatedDeals)
    
    // Update stages if stage changed
    if (currentDeal.stage !== newDeal.stage) {
      const updatedStages = stages.map(stage => {
        if (stage.name === currentDeal.stage) {
          return {
            ...stage,
            value: stage.value - 1,
            deals: stage.deals.filter(d => d.id !== currentDeal.id)
          }
        }
        if (stage.name === newDeal.stage) {
          return {
            ...stage,
            value: stage.value + 1,
            deals: [...stage.deals, { ...currentDeal, ...newDeal }]
          }
        }
        return stage
      })
      setStages(updatedStages)
    }
    
    setShowDealForm(false)
    resetForm()
  }

  const resetForm = () => {
    setNewDeal({
      name: '',
      value: '',
      stage: 'Lead',
      contact: '',
      expectedClose: '',
      notes: ''
    })
    setCurrentDeal(null)
  }

  const openEditForm = (deal) => {
    setCurrentDeal(deal)
    setNewDeal({
      name: deal.name,
      value: deal.value.toString(),
      stage: deal.stage,
      contact: deal.contact,
      expectedClose: deal.expectedClose,
      notes: deal.notes
    })
    setShowDealForm(true)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Sales Pipeline</h1>
        <button 
          onClick={() => {
            setCurrentDeal(null)
            setShowDealForm(true)
          }}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          <span>New Deal</span>
        </button>
      </motion.div>

      {/* Pipeline Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="font-medium text-gray-800 mb-4">Pipeline Stages</h3>
        <div className="flex items-end h-32 mb-8 space-x-2">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.name}
              initial={{ height: 0 }}
              animate={{ height: `${(stage.value / 1500) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`flex-1 ${stage.color} relative group rounded-t`}
            >
              <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500">
                {stage.name}
              </div>
              <div className="absolute -top-8 left-0 right-0 text-center text-xs font-medium">
                {stage.value.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-primary" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Pipeline Value</p>
                <p className="text-xl font-semibold">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Win Rate</p>
                <p className="text-xl font-semibold">{winRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Deal Form */}
      {showDealForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            {currentDeal ? 'Edit Deal' : 'Create New Deal'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deal Name</label>
              <input
                type="text"
                value={newDeal.name}
                onChange={(e) => setNewDeal({...newDeal, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
              <input
                type="number"
                value={newDeal.value}
                onChange={(e) => setNewDeal({...newDeal, value: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
              <select
                value={newDeal.stage}
                onChange={(e) => setNewDeal({...newDeal, stage: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {stages.map(stage => (
                  <option key={stage.name} value={stage.name}>{stage.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input
                type="text"
                value={newDeal.contact}
                onChange={(e) => setNewDeal({...newDeal, contact: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
              <input
                type="text"
                value={newDeal.expectedClose}
                onChange={(e) => setNewDeal({...newDeal, expectedClose: e.target.value})}
                placeholder="MMM DD, YYYY"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={newDeal.notes}
                onChange={(e) => setNewDeal({...newDeal, notes: e.target.value})}
                rows="3"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowDealForm(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={currentDeal ? handleUpdateDeal : handleCreateDeal}
              disabled={!newDeal.name || !newDeal.contact}
              className={`px-4 py-2 bg-primary text-white rounded-md ${!newDeal.name || !newDeal.contact ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryDark'}`}
            >
              {currentDeal ? 'Update Deal' : 'Create Deal'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Deal Details Modal */}
      {viewingDeal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setViewingDeal(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">{viewingDeal.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Value</p>
                <p className="text-lg font-semibold">{formatCurrency(viewingDeal.value)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Stage</p>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  viewingDeal.stage === 'Lead' ? 'bg-blue-100 text-blue-800' :
                  viewingDeal.stage === 'Contacted' ? 'bg-purple-100 text-purple-800' :
                  viewingDeal.stage === 'Qualified' ? 'bg-primary/10 text-primary' :
                  viewingDeal.stage === 'Proposal' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {viewingDeal.stage}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contact</p>
                <p className="text-lg font-semibold">{viewingDeal.contact}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Expected Close</p>
                <p className="text-lg font-semibold">{viewingDeal.expectedClose}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Notes</p>
              <p className="whitespace-pre-line mt-1">{viewingDeal.notes}</p>
            </div>
            <div className="flex justify-end pt-6">
              <button
                onClick={() => setViewingDeal(null)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Deals Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-gray-800">Recent Deals</h3>
          <div className="flex space-x-2">
            <select
              value={filterStage}
              onChange={(e) => {
                setFilterStage(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Stages</option>
              {stages.map(stage => (
                <option key={stage.name}>{stage.name}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Search deals..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Close</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedDeals.length > 0 ? (
                paginatedDeals.map((deal) => (
                  <tr key={deal.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{deal.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatCurrency(deal.value)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        deal.stage === 'Lead' ? 'bg-blue-100 text-blue-800' :
                        deal.stage === 'Contacted' ? 'bg-purple-100 text-purple-800' :
                        deal.stage === 'Qualified' ? 'bg-primary/10 text-primary' :
                        deal.stage === 'Proposal' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{deal.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{deal.expectedClose}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => setViewingDeal(deal)}
                        className="text-primary hover:text-primaryDark mr-3 flex items-center"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        <span>View</span>
                      </button>
                      <button 
                        onClick={() => openEditForm(deal)}
                        className="text-gray-600 hover:text-gray-800 flex items-center"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No deals found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredDeals.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredDeals.length)} of {filteredDeals.length} entries
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md flex items-center ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                <span>Previous</span>
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
                className={`px-3 py-1 border rounded-md flex items-center ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              >
                <span>Next</span>
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Pipeline