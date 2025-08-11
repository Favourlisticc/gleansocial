import { motion } from 'framer-motion'
import { ChartBarIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { BarChart } from '../charts/BarChart'
import { useState } from 'react'

const Performance = () => {
  // Initial static data with state management
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Sale', platform: 'Facebook', spend: 1245, clicks: 1245, conversions: 78, roas: 3.2 },
    { id: 2, name: 'New Launch', platform: 'Instagram', spend: 876, clicks: 876, conversions: 54, roas: 2.8 },
    { id: 3, name: 'Retention', platform: 'Google', spend: 543, clicks: 543, conversions: 32, roas: 4.1 },
    { id: 4, name: 'Lead Gen', platform: 'LinkedIn', spend: 321, clicks: 321, conversions: 19, roas: 2.5 },
    { id: 5, name: 'Holiday Special', platform: 'Facebook', spend: 1560, clicks: 1420, conversions: 92, roas: 3.8 },
    { id: 6, name: 'Product Demo', platform: 'YouTube', spend: 780, clicks: 650, conversions: 41, roas: 2.9 },
  ])

  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [platformFilter, setPlatformFilter] = useState('All Platforms')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAnalysis, setShowAnalysis] = useState(false)

  // Constants
  const itemsPerPage = 4
  const totalPages = Math.ceil(campaigns.length / itemsPerPage)

  // Calculate metrics
  const totalSpend = campaigns.reduce((sum, campaign) => sum + campaign.spend, 0)
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0)
  const averageRoas = (campaigns.reduce((sum, campaign) => sum + campaign.roas, 0) / campaigns.length).toFixed(2)

  // Filter and paginate campaigns
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesPlatform = platformFilter === 'All Platforms' || campaign.platform === platformFilter
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesPlatform && matchesSearch
  })

  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handler functions
  const handleExport = () => {
    // In a real app, this would generate a CSV or PDF
    alert(`Exporting performance data for ${dateRange}...`)
  }

  const handleAnalyze = () => {
    setShowAnalysis(!showAnalysis)
  }

  const handleDateRangeChange = (range) => {
    setDateRange(range)
    // In a real app, this would fetch new data for the selected range
    alert(`Loading data for ${range}...`)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Ad Performance</h1>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center"
          >
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            Export
          </button>
          <button 
            onClick={handleAnalyze}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark flex items-center"
          >
            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
            {showAnalysis ? 'Hide Analysis' : 'Analyze'}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-800">Performance Overview</h3>
          <select
            value={dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
        <BarChart />
      </motion.div>

      {showAnalysis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="font-medium text-gray-800 mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Top Performing Campaign</h4>
              <p className="text-primary font-semibold">Summer Sale</p>
              <p className="text-sm text-gray-600 mt-1">3.8x ROAS • 92 conversions</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Best Platform</h4>
              <p className="text-primary font-semibold">Facebook</p>
              <p className="text-sm text-gray-600 mt-1">Average ROAS: 3.5x</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Recommendation</h4>
              <p className="text-primary font-semibold">Increase budget for top performers</p>
              <p className="text-sm text-gray-600 mt-1">Scale successful campaigns by 20-30%</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Optimization Tip</h4>
              <p className="text-primary font-semibold">Improve LinkedIn creatives</p>
              <p className="text-sm text-gray-600 mt-1">Current ROAS below platform average</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-primary" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Spend</p>
                <p className="text-xl font-semibold">{formatCurrency(totalSpend)}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-6 w-6 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg. ROAS</p>
                <p className="text-xl font-semibold">{averageRoas}x</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Conversions</p>
                <p className="text-xl font-semibold">{totalConversions}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-800">Campaign Performance</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            />
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option>All Platforms</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Google</option>
              <option>LinkedIn</option>
              <option>YouTube</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROAS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCampaigns.length > 0 ? (
                paginatedCampaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{campaign.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{campaign.platform}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatCurrency(campaign.spend)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{campaign.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{campaign.conversions}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        campaign.roas >= 3 ? 'bg-green-100 text-green-800' :
                        campaign.roas >= 2 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {campaign.roas}x
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-primaryDark mr-3">
                        Details
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        Pause
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No campaigns found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredCampaigns.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length} entries
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
    </div>
  )
}

export default Performance