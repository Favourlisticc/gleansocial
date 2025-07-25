import { motion } from 'framer-motion'
import { CreditCardIcon, BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline'

const invoices = [
  { id: 'INV-2023-07', date: 'Jul 1, 2023', amount: '$99.00', status: 'Paid' },
  { id: 'INV-2023-06', date: 'Jun 1, 2023', amount: '$99.00', status: 'Paid' },
  { id: 'INV-2023-05', date: 'May 1, 2023', amount: '$99.00', status: 'Paid' },
  { id: 'INV-2023-04', date: 'Apr 1, 2023', amount: '$99.00', status: 'Paid' },
]

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/24', primary: true },
  { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/23', primary: false },
]

const Billing = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Billing & Payments</h1>
        <p className="text-gray-600 mt-1">Manage your subscription and payment methods</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-lg font-medium text-gray-800 mb-4">Subscription Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900">Growth Plan</h3>
            <p className="text-2xl font-semibold mt-2">$99<span className="text-sm font-normal text-gray-500">/month</span></p>
            <p className="text-sm text-gray-600 mt-2">Billed monthly, cancel anytime</p>
            <button className="w-full mt-4 px-4 py-2 border rounded-md hover:bg-gray-50">
              Change Plan
            </button>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">Next Billing Date</h3>
                <p className="text-gray-600 mt-2">Aug 1, 2023</p>
              </div>
              <ClockIcon className="h-5 w-5 text-gray-400" />
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
              Upgrade Plan
            </button>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">Usage</h3>
                <p className="text-gray-600 mt-2">12,345 of 50,000 contacts</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <ChartBarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <button className="w-full mt-4 px-4 py-2 border rounded-md hover:bg-gray-50">
              View Usage
            </button>
          </div>
        </div>

        <h2 className="text-lg font-medium text-gray-800 mb-4">Payment Methods</h2>
        <div className="space-y-4 mb-8">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center">
                <CreditCardIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{method.type} ending in {method.last4}</p>
                  <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                {method.primary && (
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Primary
                  </span>
                )}
                <button className="text-primary hover:text-primaryDark">Edit</button>
                <button className="text-gray-600 hover:text-gray-800">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Add Payment Method
        </button>

        <h2 className="text-lg font-medium text-gray-800 mt-8 mb-4">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primaryDark">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Billing