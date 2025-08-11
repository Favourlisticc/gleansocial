import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  ClockIcon, 
  ChartBarIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// Expanded static data
const initialInvoices = [
  { id: 'INV-2023-07', date: 'Jul 1, 2023', amount: 99.00, status: 'Paid', pdfUrl: '#' },
  { id: 'INV-2023-06', date: 'Jun 1, 2023', amount: 99.00, status: 'Paid', pdfUrl: '#' },
  { id: 'INV-2023-05', date: 'May 1, 2023', amount: 99.00, status: 'Paid', pdfUrl: '#' },
  { id: 'INV-2023-04', date: 'Apr 1, 2023', amount: 99.00, status: 'Paid', pdfUrl: '#' },
  { id: 'INV-2023-03', date: 'Mar 1, 2023', amount: 99.00, status: 'Paid', pdfUrl: '#' },
  { id: 'INV-2023-02', date: 'Feb 1, 2023', amount: 99.00, status: 'Paid', pdfUrl: '#' },
]

const initialPaymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/24', primary: true },
  { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/23', primary: false },
  { id: 3, type: 'American Express', last4: '1005', expiry: '05/25', primary: false },
]

const Billing = () => {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)
  const [showAddCardForm, setShowAddCardForm] = useState(false)
  const [newCard, setNewCard] = useState({
    type: 'Visa',
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    primary: false
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  const itemsPerPage = 4
  const totalInvoices = invoices.length
  const totalPages = Math.ceil(totalInvoices / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleAddPaymentMethod = () => {
    const cardToAdd = {
      id: Math.max(...paymentMethods.map(p => p.id)) + 1,
      type: newCard.type,
      last4: newCard.number.slice(-4),
      expiry: newCard.expiry,
      primary: newCard.primary
    }
    
    // If marked as primary, unset other primaries
    const updatedMethods = newCard.primary 
      ? paymentMethods.map(method => ({ ...method, primary: false }))
      : [...paymentMethods]
    
    setPaymentMethods([cardToAdd, ...updatedMethods])
    setShowAddCardForm(false)
    setNewCard({
      type: 'Visa',
      number: '',
      expiry: '',
      cvc: '',
      name: '',
      primary: false
    })
  }

  const handleRemovePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id))
  }

  const handleSetPrimary = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      primary: method.id === id
    })))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const paginatedInvoices = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Billing & Payments</h1>
        <p className="text-gray-600 mt-1">Manage your subscription and payment methods</p>
      </motion.div>

      {/* Subscription Plan Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-lg font-medium text-gray-800 mb-4">Subscription Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Plan */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900">Growth Plan</h3>
            <p className="text-2xl font-semibold mt-2">
              {formatCurrency(99)}
              <span className="text-sm font-normal text-gray-500">/month</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">Billed monthly, cancel anytime</p>
            <button 
              onClick={() => setShowCancelModal(true)}
              className="w-full mt-4 px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel Plan
            </button>
          </div>

          {/* Next Billing */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">Next Billing Date</h3>
                <p className="text-gray-600 mt-2">Aug 1, 2023</p>
              </div>
              <ClockIcon className="h-5 w-5 text-gray-400" />
            </div>
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
            >
              Upgrade Plan
            </button>
          </div>

          {/* Usage */}
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

        {/* Payment Methods */}
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
              <div className="flex items-center space-x-3">
                {method.primary ? (
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Primary
                  </span>
                ) : (
                  <button 
                    onClick={() => handleSetPrimary(method.id)}
                    className="text-sm text-primary hover:text-primaryDark"
                  >
                    Set as primary
                  </button>
                )}
                <button className="text-gray-600 hover:text-gray-800">
                  Edit
                </button>
                <button 
                  onClick={() => handleRemovePaymentMethod(method.id)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Payment Method Button */}
        <button 
          onClick={() => setShowAddCardForm(true)}
          className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          <span>Add Payment Method</span>
        </button>

        {/* Add Card Form */}
        {showAddCardForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-6 border rounded-lg"
          >
            <h3 className="font-medium text-gray-800 mb-4">Add New Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                <select
                  value={newCard.type}
                  onChange={(e) => setNewCard({...newCard, type: e.target.value})}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="American Express">American Express</option>
                  <option value="Discover">Discover</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={newCard.number}
                  onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                <input
                  type="text"
                  value={newCard.expiry}
                  onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Security Code</label>
                <input
                  type="text"
                  value={newCard.cvc}
                  onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                  placeholder="CVC"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={newCard.name}
                  onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                  placeholder="Name on card"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="primary-card"
                  checked={newCard.primary}
                  onChange={(e) => setNewCard({...newCard, primary: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="primary-card" className="ml-2 block text-sm text-gray-700">
                  Set as primary payment method
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddCardForm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPaymentMethod}
                disabled={!newCard.number || !newCard.expiry || !newCard.cvc || !newCard.name}
                className={`px-4 py-2 bg-primary text-white rounded-md ${
                  !newCard.number || !newCard.expiry || !newCard.cvc || !newCard.name ? 
                  'opacity-50 cursor-not-allowed' : 'hover:bg-primaryDark'
                }`}
              >
                Add Card
              </button>
            </div>
          </motion.div>
        )}

        {/* Billing History */}
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
              {paginatedInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatCurrency(invoice.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a 
                      href={invoice.pdfUrl} 
                      className="text-primary hover:text-primaryDark flex items-center"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                      <span>Download</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalInvoices)} of {totalInvoices} entries
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowUpgradeModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Upgrade Your Plan</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">Pro Plan</h3>
                    <p className="text-2xl font-semibold mt-1">
                      {formatCurrency(199)}
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>100,000 contacts</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>Advanced analytics</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>Priority support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
              >
                Upgrade to Pro
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowCancelModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Cancel Subscription</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Keep Subscription
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Cancel Subscription
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Billing