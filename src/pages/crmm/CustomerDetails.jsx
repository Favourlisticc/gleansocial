import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { 
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  PencilIcon,
  PlusIcon,
  ChatBubbleLeftIcon,
  UserCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export const CustomerDetails = () => {
  const { id } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [showInteractionForm, setShowInteractionForm] = useState(false)
  const [interactionType, setInteractionType] = useState('Call')
  const [interactionNotes, setInteractionNotes] = useState('')
  const [interactionDate, setInteractionDate] = useState(new Date().toISOString().split('T')[0])

  // Mock customer data - in a real app, you'd fetch this based on the ID
  const [customer, setCustomer] = useState({
    id: id,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1234567890',
    company: 'Johnson & Co',
    source: 'Website',
    status: 'Active Customer',
    value: 2450,
    lastPurchase: '2023-07-15',
    nextAction: 'Follow-up call on July 25',
    notes: 'Interested in premium plan. Needs demo of advanced features.',
    interactions: [
      { id: 1, date: '2023-07-15', type: 'Purchase', details: 'Purchased Standard Plan' },
      { id: 2, date: '2023-07-10', type: 'Email', details: 'Responded to pricing inquiry' },
      { id: 3, date: '2023-07-05', type: 'Call', details: 'Initial discovery call' },
      { id: 4, date: '2023-07-01', type: 'Website', details: 'Signed up for trial' },
    ]
  })

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Handle saving notes
  const handleSaveNote = () => {
    if (!newNote.trim()) return
    
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setCustomer({
        ...customer,
        notes: customer.notes ? `${customer.notes}\n\n${newNote}` : newNote
      })
      setNewNote('')
      setIsSaving(false)
    }, 1000)
  }

  // Handle adding interaction
  const handleAddInteraction = () => {
    if (!interactionNotes.trim()) return
    
    const newInteraction = {
      id: Math.max(...customer.interactions.map(i => i.id)) + 1,
      date: interactionDate,
      type: interactionType,
      details: interactionNotes
    }
    
    setCustomer({
      ...customer,
      interactions: [newInteraction, ...customer.interactions],
      lastPurchase: interactionType === 'Purchase' ? interactionDate : customer.lastPurchase
    })
    
    // Reset form
    setInteractionType('Call')
    setInteractionNotes('')
    setInteractionDate(new Date().toISOString().split('T')[0])
    setShowInteractionForm(false)
  }

  // Handle completing next action
  const handleCompleteAction = () => {
    setCustomer({
      ...customer,
      nextAction: 'No pending actions'
    })
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <UserCircleIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{customer.name}</h1>
            <p className="text-gray-600 flex items-center">
              <BuildingOfficeIcon className="h-4 w-4 mr-1" />
              {customer.company}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center"
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button 
            onClick={() => setShowInteractionForm(true)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Log Interaction
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Customer Information Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  Email
                </p>
                {isEditing ? (
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({...customer, email: e.target.value})}
                    className="w-full px-3 py-1 border rounded-md"
                  />
                ) : (
                  <p className="font-medium">{customer.email}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  Phone
                </p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                    className="w-full px-3 py-1 border rounded-md"
                  />
                ) : (
                  <p className="font-medium">{customer.phone}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Source</p>
                {isEditing ? (
                  <select
                    value={customer.source}
                    onChange={(e) => setCustomer({...customer, source: e.target.value})}
                    className="w-full px-3 py-1 border rounded-md"
                  >
                    <option>Website</option>
                    <option>Referral</option>
                    <option>Advertisement</option>
                    <option>Social Media</option>
                  </select>
                ) : (
                  <p className="font-medium">{customer.source}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                {isEditing ? (
                  <select
                    value={customer.status}
                    onChange={(e) => setCustomer({...customer, status: e.target.value})}
                    className="w-full px-3 py-1 border rounded-md"
                  >
                    <option>Prospect</option>
                    <option>Active Customer</option>
                    <option>Inactive</option>
                    <option>VIP</option>
                  </select>
                ) : (
                  <p className="font-medium">{customer.status}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                  Lifetime Value
                </p>
                <p className="font-medium">{formatCurrency(customer.value)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  Last Purchase
                </p>
                <p className="font-medium">{formatDate(customer.lastPurchase)}</p>
              </div>
            </div>
          </div>

          {/* Interactions Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Recent Interactions</h2>
              {showInteractionForm && (
                <button 
                  onClick={() => setShowInteractionForm(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>

            {showInteractionForm ? (
              <div className="mb-6 space-y-3">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Type</label>
                  <select
                    value={interactionType}
                    onChange={(e) => setInteractionType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>Call</option>
                    <option>Email</option>
                    <option>Meeting</option>
                    <option>Purchase</option>
                    <option>Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Date</label>
                  <input
                    type="date"
                    value={interactionDate}
                    onChange={(e) => setInteractionDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Notes</label>
                  <textarea
                    value={interactionNotes}
                    onChange={(e) => setInteractionNotes(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                  />
                </div>
                <button
                  onClick={handleAddInteraction}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
                >
                  Save Interaction
                </button>
              </div>
            ) : null}

            <div className="space-y-4">
              {customer.interactions.map((interaction) => (
                <div key={interaction.id} className="border-l-2 border-primary pl-4 py-2">
                  <div className="flex justify-between">
                    <p className="font-medium flex items-center">
                      {interaction.type === 'Call' && <PhoneIcon className="h-4 w-4 mr-2" />}
                      {interaction.type === 'Email' && <EnvelopeIcon className="h-4 w-4 mr-2" />}
                      {interaction.type === 'Purchase' && <CurrencyDollarIcon className="h-4 w-4 mr-2" />}
                      {interaction.type}
                    </p>
                    <p className="text-sm text-gray-500">{formatDate(interaction.date)}</p>
                  </div>
                  <p className="text-gray-600">{interaction.details}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Next Action Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Next Action</h2>
            <p className="text-gray-600 mb-4 flex items-center">
              <ChatBubbleLeftIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              {customer.nextAction}
            </p>
            <button 
              onClick={handleCompleteAction}
              className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark flex items-center justify-center"
            >
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Mark as Complete
            </button>
          </div>

          {/* Notes Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Notes</h2>
            {customer.notes && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                {customer.notes.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-600 mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            <textarea 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-3"
              rows="3"
              placeholder="Add new note..."
            />
            <button 
              onClick={handleSaveNote}
              disabled={isSaving || !newNote.trim()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Note'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}