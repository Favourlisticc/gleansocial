import { motion } from 'framer-motion'
import { LightBulbIcon, ChartBarIcon, ArrowTrendingUpIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { LineChart } from '../charts/LineChart'
import { useState } from 'react'

const Insights = () => {
  // Initial static data with state management
  const [insights, setInsights] = useState([
    { id: 1, title: 'High-Value Customer Segment', description: 'Customers with LTV > $1000 are 3x more likely to purchase premium products', impact: 'High', category: 'Revenue', viewed: false },
    { id: 2, title: 'Best Time to Contact Leads', description: 'Leads contacted between 2-4 PM have 25% higher conversion rate', impact: 'Medium', category: 'Sales', viewed: false },
    { id: 3, title: 'Email Campaign Performance', description: 'Emails with personalized subject lines have 40% higher open rates', impact: 'High', category: 'Marketing', viewed: true },
    { id: 4, title: 'Cart Abandonment Trend', description: 'Mobile users have 15% higher abandonment rate than desktop users', impact: 'Medium', category: 'E-commerce', viewed: false },
    { id: 5, title: 'Product Bundle Opportunity', description: 'Customers who buy Product A are 60% likely to also purchase Product B', impact: 'High', category: 'Revenue', viewed: false },
    { id: 6, title: 'Customer Churn Risk', description: 'Users inactive for 30 days have 80% chance of churning next month', impact: 'Critical', category: 'Retention', viewed: false },
  ])

  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [impactFilter, setImpactFilter] = useState('All Impacts')
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState(null)

  // Constants
  const itemsPerPage = 4
  const totalPages = Math.ceil(insights.length / itemsPerPage)

  // Calculate metrics
  const newInsightsCount = insights.filter(insight => !insight.viewed).length
  const highImpactCount = insights.filter(insight => insight.impact === 'High' || insight.impact === 'Critical').length

  // Filter and paginate insights
  const filteredInsights = insights.filter(insight => {
    const matchesCategory = categoryFilter === 'All Categories' || insight.category === categoryFilter
    const matchesImpact = impactFilter === 'All Impacts' || insight.impact === impactFilter
    return matchesCategory && matchesImpact
  })

  const paginatedInsights = filteredInsights.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Helper functions
  const getImpactColor = (impact) => {
    switch(impact) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Handler functions
  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would fetch new insights
      const newInsight = {
        id: Math.max(...insights.map(i => i.id)) + 1,
        title: `New Insight ${new Date().toLocaleTimeString()}`,
        description: 'This is a newly generated insight based on recent data patterns',
        impact: ['High', 'Medium', 'Critical'][Math.floor(Math.random() * 3)],
        category: ['Revenue', 'Sales', 'Marketing', 'E-commerce', 'Retention'][Math.floor(Math.random() * 5)],
        viewed: false
      }
      setInsights([newInsight, ...insights])
      setIsRefreshing(false)
      alert('New insights generated successfully!')
    }, 1500)
  }

  const handleViewDetails = (insight) => {
    setSelectedInsight(insight)
    // Mark as viewed
    setInsights(insights.map(i => 
      i.id === insight.id ? { ...i, viewed: true } : i
    ))
  }

  const handleCloseDetails = () => {
    setSelectedInsight(null)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Predictive Insights</h1>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center"
        >
          <ArrowPathIcon className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Insights'}
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="font-medium text-gray-800 mb-4">Customer Conversion Trends</h3>
        <LineChart />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-gray-800">Recommended Actions</h3>
          <div className="flex space-x-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Categories</option>
              <option>Revenue</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>E-commerce</option>
              <option>Retention</option>
            </select>
            <select
              value={impactFilter}
              onChange={(e) => setImpactFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Impacts</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center">
              <LightBulbIcon className="h-6 w-6 text-primary" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">New Insights Generated</p>
                <p className="text-xl font-semibold">{newInsightsCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">High Impact Insights</p>
                <p className="text-xl font-semibold">{highImpactCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {paginatedInsights.length > 0 ? (
            paginatedInsights.map((insight) => (
              <motion.div
                key={insight.id}
                whileHover={{ scale: 1.01 }}
                className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${!insight.viewed ? 'border-l-4 border-l-primary' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(insight.impact)}`}>
                    {insight.impact} Impact
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                    {insight.category}
                  </span>
                  <button 
                    onClick={() => handleViewDetails(insight)}
                    className="text-sm text-primary hover:text-primaryDark"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No insights found matching your criteria
            </div>
          )}
        </div>

        {filteredInsights.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredInsights.length)} of {filteredInsights.length} entries
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === page ? 'bg-primary text-white' : 'hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">{selectedInsight.title}</h2>
                <button 
                  onClick={handleCloseDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(selectedInsight.impact)}`}>
                    {selectedInsight.impact} Impact
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                    {selectedInsight.category}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">Key Finding</h3>
                  <p className="text-gray-600">{selectedInsight.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="border rounded-lg p-3">
                    <h3 className="font-medium text-gray-800 mb-2">Business Impact</h3>
                    <p className="text-gray-600">
                      {selectedInsight.impact === 'Critical' ? 'Critical impact on key metrics requiring immediate action' :
                       selectedInsight.impact === 'High' ? 'Significant potential to improve business performance' :
                       'Opportunity for optimization and incremental improvements'}
                    </p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <h3 className="font-medium text-gray-800 mb-2">Suggested Actions</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {selectedInsight.category === 'Revenue' && (
                        <>
                          <li>Target high-LTV customers with premium offers</li>
                          <li>Create personalized upsell campaigns</li>
                        </>
                      )}
                      {selectedInsight.category === 'Marketing' && (
                        <>
                          <li>Implement personalized subject lines</li>
                          <li>A/B test different email templates</li>
                        </>
                      )}
                      {selectedInsight.category === 'Sales' && (
                        <>
                          <li>Schedule calls for 2-4 PM time window</li>
                          <li>Train team on high-conversion techniques</li>
                        </>
                      )}
                      {selectedInsight.category === 'E-commerce' && (
                        <>
                          <li>Optimize mobile checkout flow</li>
                          <li>Implement abandoned cart recovery</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
                    Create Action Plan
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Insights