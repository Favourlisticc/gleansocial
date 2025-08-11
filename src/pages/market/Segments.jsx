import { motion } from 'framer-motion'
import { useState } from 'react'
import { UserGroupIcon, ChartBarIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

// Expanded static data
const initialSegments = [
  { id: 1, name: 'High Value Customers', criteria: 'LTV > $1000', size: 245, lastUsed: 'Jul 20, 2023', activeInCampaigns: true, conversionRate: 22 },
  { id: 2, name: 'Inactive Users', criteria: 'No purchase in 90 days', size: 876, lastUsed: 'Jul 18, 2023', activeInCampaigns: false, conversionRate: 5 },
  { id: 3, name: 'New Signups', criteria: 'Created in last 7 days', size: 153, lastUsed: 'Jul 15, 2023', activeInCampaigns: true, conversionRate: 15 },
  { id: 4, name: 'Abandoned Cart', criteria: 'Added to cart but not purchased', size: 432, lastUsed: 'Jul 10, 2023', activeInCampaigns: true, conversionRate: 18 },
  { id: 5, name: 'Frequent Buyers', criteria: '3+ purchases in last month', size: 198, lastUsed: 'Jul 5, 2023', activeInCampaigns: false, conversionRate: 32 },
  { id: 6, name: 'Discount Seekers', criteria: 'Used 2+ coupon codes', size: 321, lastUsed: 'Jun 28, 2023', activeInCampaigns: true, conversionRate: 12 },
  { id: 7, name: 'Mobile Users', criteria: '75%+ mobile sessions', size: 567, lastUsed: 'Jun 20, 2023', activeInCampaigns: false, conversionRate: 14 },
]

const Segments = () => {
  const [segments, setSegments] = useState(initialSegments)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showNewSegmentForm, setShowNewSegmentForm] = useState(false)
  const [newSegment, setNewSegment] = useState({
    name: '',
    criteria: '',
    size: 0
  })
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState(null)

  const itemsPerPage = 5
  const totalItems = initialSegments.length

  // Filter segments based on search
  const filteredSegments = initialSegments.filter(segment => {
    if (searchQuery && 
        !segment.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !segment.criteria.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  // Paginate segments
  const paginatedSegments = filteredSegments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredSegments.length / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleAddSegment = () => {
    const newId = Math.max(...initialSegments.map(s => s.id)) + 1
    const today = new Date()
    const lastUsed = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    
    const segmentToAdd = {
      id: newId,
      ...newSegment,
      lastUsed,
      activeInCampaigns: false,
      conversionRate: Math.floor(Math.random() * 20) + 5 // Random rate between 5-25%
    }
    
    initialSegments.unshift(segmentToAdd)
    setSegments([...initialSegments])
    setShowNewSegmentForm(false)
    setNewSegment({
      name: '',
      criteria: '',
      size: 0
    })
  }

  const handleUseSegment = (segment) => {
    setSelectedSegment(segment)
    setShowAnalyzeModal(true)
  }

  const handleEditSegment = (segment) => {
    setSelectedSegment(segment)
    setShowNewSegmentForm(true)
    setNewSegment({
      name: segment.name,
      criteria: segment.criteria,
      size: segment.size
    })
  }

  // Calculate metrics for the summary cards
  const totalSegments = initialSegments.length
  const avgSegmentSize = Math.round(initialSegments.reduce((sum, seg) => sum + seg.size, 0) / initialSegments.length)
  const activeInCampaigns = initialSegments.filter(seg => seg.activeInCampaigns).length
  const avgConversionRate = Math.round(initialSegments.reduce((sum, seg) => sum + seg.conversionRate, 0) / initialSegments.length)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Customer Segments</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAnalyzeModal(true)}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Analyze
          </button>
          <button 
            onClick={() => {
              setSelectedSegment(null)
              setShowNewSegmentForm(true)
            }}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
          >
            New Segment
          </button>
        </div>
      </motion.div>

      {showNewSegmentForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            {selectedSegment ? 'Edit Segment' : 'Create New Segment'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Segment Name</label>
              <input
                type="text"
                value={newSegment.name}
                onChange={(e) => setNewSegment({...newSegment, name: e.target.value})}
                placeholder="e.g. Premium Customers"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Criteria</label>
              <input
                type="text"
                value={newSegment.criteria}
                onChange={(e) => setNewSegment({...newSegment, criteria: e.target.value})}
                placeholder="e.g. Purchased > $500 in last month"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <input
                type="number"
                value={newSegment.size}
                onChange={(e) => setNewSegment({...newSegment, size: parseInt(e.target.value) || 0})}
                placeholder="Estimated size"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowNewSegmentForm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSegment}
                disabled={!newSegment.name || !newSegment.criteria}
                className={`px-4 py-2 bg-primary text-white rounded-md ${!newSegment.name || !newSegment.criteria ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryDark'}`}
              >
                {selectedSegment ? 'Update Segment' : 'Create Segment'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {showAnalyzeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAnalyzeModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              {selectedSegment ? `Analyzing: ${selectedSegment.name}` : 'Segment Analysis'}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Total Segments</p>
                <p className="text-xl font-semibold">{totalSegments}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Avg. Conversion Rate</p>
                <p className="text-xl font-semibold">{avgConversionRate}%</p>
              </div>
            </div>
            {selectedSegment && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Segment Details</h3>
                  <p className="text-gray-600 mt-1">{selectedSegment.criteria}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Size</p>
                    <p className="text-lg font-semibold">{selectedSegment.size.toLocaleString()}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                    <p className="text-lg font-semibold">{selectedSegment.conversionRate}%</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Last Used</p>
                    <p className="text-lg font-semibold">{selectedSegment.lastUsed}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setShowAnalyzeModal(false)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <input 
            type="text" 
            placeholder="Search segments..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center">
              <UserGroupIcon className="h-6 w-6 text-primary" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Segments</p>
                <p className="text-xl font-semibold">{totalSegments}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg. Segment Size</p>
                <p className="text-xl font-semibold">{avgSegmentSize}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center">
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Active in Campaigns</p>
                <p className="text-xl font-semibold">{activeInCampaigns}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg. Conversion Rate</p>
                <p className="text-xl font-semibold">{avgConversionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criteria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSegments.length > 0 ? (
                paginatedSegments.map((segment) => (
                  <tr key={segment.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{segment.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{segment.criteria}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{segment.size.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{segment.lastUsed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleUseSegment(segment)}
                        className="text-primary hover:text-primaryDark mr-3"
                      >
                        Use
                      </button>
                      <button 
                        onClick={() => handleEditSegment(segment)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No segments found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredSegments.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSegments.length)} of {filteredSegments.length} entries
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

export default Segments