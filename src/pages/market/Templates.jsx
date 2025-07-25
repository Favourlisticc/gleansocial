import { motion } from 'framer-motion'
import { EnvelopeIcon, ChatBubbleBottomCenterTextIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'

const templates = [
  { id: 1, name: 'Welcome Email', channel: 'Email', lastUsed: 'Jul 20, 2023', usage: 1245 },
  { id: 2, name: 'Abandoned Cart', channel: 'Email', lastUsed: 'Jul 18, 2023', usage: 876 },
  { id: 3, name: 'Order Confirmation', channel: 'WhatsApp', lastUsed: 'Jul 15, 2023', usage: 1532 },
  { id: 4, name: 'Promo Offer', channel: 'SMS', lastUsed: 'Jul 10, 2023', usage: 987 },
]

const Templates = () => {
  const getChannelIcon = (channel) => {
    switch(channel) {
      case 'Email': return <EnvelopeIcon className="h-5 w-5 text-primary" />
      case 'WhatsApp': return <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-green-500" />
      case 'SMS': return <DevicePhoneMobileIcon className="h-5 w-5 text-blue-500" />
      default: return <EnvelopeIcon className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Marketing Templates</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
          New Template
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Channels</option>
              <option>Email</option>
              <option>WhatsApp</option>
              <option>SMS</option>
            </select>
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {templates.map((template) => (
                <tr key={template.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{template.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getChannelIcon(template.channel)}
                      <span className="ml-2">{template.channel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{template.lastUsed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{template.usage.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primaryDark mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-800">Duplicate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default Templates