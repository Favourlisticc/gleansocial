import { motion } from 'framer-motion'
import { LightBulbIcon, ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { LineChart } from '../charts/LineChart'

const insights = [
  { id: 1, title: 'High-Value Customer Segment', description: 'Customers with LTV > $1000 are 3x more likely to purchase premium products', impact: 'High', category: 'Revenue' },
  { id: 2, title: 'Best Time to Contact Leads', description: 'Leads contacted between 2-4 PM have 25% higher conversion rate', impact: 'Medium', category: 'Sales' },
  { id: 3, title: 'Email Campaign Performance', description: 'Emails with personalized subject lines have 40% higher open rates', impact: 'High', category: 'Marketing' },
  { id: 4, title: 'Cart Abandonment Trend', description: 'Mobile users have 15% higher abandonment rate than desktop users', impact: 'Medium', category: 'E-commerce' },
]

 const Insights = () => {
  const getImpactColor = (impact) => {
    switch(impact) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Predictive Insights</h1>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Refresh Insights
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
          <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Categories</option>
            <option>Revenue</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>E-commerce</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center">
              <LightBulbIcon className="h-6 w-6 text-primary" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">New Insights Generated</p>
                <p className="text-xl font-semibold">12</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Potential Revenue Impact</p>
                <p className="text-xl font-semibold">+18%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              whileHover={{ scale: 1.01 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
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
                <button className="text-sm text-primary hover:text-primaryDark">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">Showing 1 to 4 of 12 entries</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border rounded-md bg-primary text-white">1</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Insights