import { motion } from 'framer-motion'
import { Squares2X2Icon, ArrowPathIcon, CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const Integrations = () => {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'WhatsApp', logo: 'WhatsApp', connected: true, lastSynced: 'Jul 20, 2023' },
    { id: 2, name: 'Google Analytics', logo: 'Google', connected: true, lastSynced: 'Jul 18, 2023' },
    { id: 3, name: 'Facebook Ads', logo: 'Facebook', connected: false },
    { id: 4, name: 'Paystack', logo: 'Paystack', connected: false },
    { id: 5, name: 'Mailchimp', logo: 'Mailchimp', connected: false },
    { id: 6, name: 'Zapier', logo: 'Zapier', connected: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All Categories')

  const handleConnect = (id) => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        // Simulate connection process
        if (!integration.connected) {
          return { ...integration, syncing: true }
        }
      }
      return integration
    }))
    
    // Simulate API call delay
    setTimeout(() => {
      setIntegrations(integrations.map(integration => {
        if (integration.id === id) {
          return { 
            ...integration, 
            connected: !integration.connected,
            syncing: false,
            lastSynced: integration.connected ? undefined : new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })
          }
        }
        return integration
      }))
    }, 1500)
  }

  const handleSync = (id) => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id && integration.connected) {
        return { ...integration, syncing: true }
      }
      return integration
    }))
    
    // Simulate sync process
    setTimeout(() => {
      setIntegrations(integrations.map(integration => {
        if (integration.id === id && integration.connected) {
          return { 
            ...integration, 
            syncing: false,
            lastSynced: new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })
          }
        }
        return integration
      }))
    }, 1000)
  }

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'All Categories' || 
      (category === 'Communication' && ['WhatsApp'].includes(integration.name)) ||
      (category === 'Analytics' && ['Google Analytics'].includes(integration.name)) ||
      (category === 'Payments' && ['Paystack'].includes(integration.name)) ||
      (category === 'Marketing' && ['Facebook Ads', 'Mailchimp'].includes(integration.name))
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Integrations</h1>
        <p className="text-gray-600 mt-1">Connect your favorite tools and services</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md">
            <input 
              type="text" 
              placeholder="Search integrations..." 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="ml-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Communication</option>
            <option>Analytics</option>
            <option>Payments</option>
            <option>Marketing</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <motion.div
              key={integration.id}
              whileHover={{ y: -5 }}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <Squares2X2Icon className="h-5 w-5" />
                </div>
                <h3 className="ml-3 font-medium text-gray-900">{integration.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                {integration.connected ? 
                  integration.syncing ? 'Syncing data...' : `Last synced: ${integration.lastSynced}` 
                  : 'Connect to enable this integration'}
              </p>
              <div className="flex justify-between items-center">
                {integration.connected ? (
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center text-sm text-green-600">
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Connected
                    </span>
                    <button 
                      onClick={() => handleSync(integration.id)}
                      disabled={integration.syncing}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      title="Sync now"
                    >
                      <ArrowPathIcon className={`h-4 w-4 ${integration.syncing ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                ) : (
                  <span className="text-sm text-gray-600">Not connected</span>
                )}
                <button 
                  onClick={() => handleConnect(integration.id)}
                  disabled={integration.syncing}
                  className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                    integration.connected ? 
                    'border hover:bg-gray-50' : 
                    'bg-primary text-white hover:bg-primaryDark'
                  } ${integration.syncing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {integration.syncing ? (
                    'Processing...'
                  ) : integration.connected ? (
                    'Manage'
                  ) : (
                    <>
                      Connect <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Integrations