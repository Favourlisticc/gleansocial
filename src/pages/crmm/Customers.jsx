import { motion } from 'framer-motion'
import { UserGroupIcon, ChartBarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { BarChart } from '../charts/BarChart'

const customers = [
  { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '+1234567890', value: '$12,450', lastPurchase: 'Jul 15, 2023', status: 'Active' },
  { id: 2, name: 'Globex Inc', email: 'sales@globex.com', phone: '+1987654321', value: '$8,720', lastPurchase: 'Jul 10, 2023', status: 'Active' },
  { id: 3, name: 'Initech', email: 'info@initech.com', phone: '+1122334455', value: '$5,340', lastPurchase: 'Jun 28, 2023', status: 'Active' },
  { id: 4, name: 'Umbrella Corp', email: 'support@umbrella.com', phone: '+1567890123', value: '$3,210', lastPurchase: 'May 15, 2023', status: 'Inactive' },
]

const stats = [
  { title: 'Total Customers', value: '124', change: '+8%', trend: 'up', icon: UserGroupIcon },
  { title: 'Avg. Order Value', value: '$245', change: '+12%', trend: 'up', icon: ShoppingBagIcon },
  { title: 'Retention Rate', value: '78%', change: '+5%', trend: 'up', icon: ChartBarIcon },
]

const Customers = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
          Add Customer
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="font-medium text-gray-800 mb-4">Customer Value Over Time</h3>
        <BarChart />
      </motion.div>

      {/* Customer List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-gray-800">Customer Directory</h3>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lifetime Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Purchase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600">{customer.email}</div>
                    <div className="text-gray-500 text-sm">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{customer.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{customer.lastPurchase}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primaryDark mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">Showing 1 to 4 of 124 entries</div>
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

export default Customers;