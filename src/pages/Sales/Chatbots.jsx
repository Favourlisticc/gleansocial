import { motion } from 'framer-motion'
import { ChatBubbleBottomCenterTextIcon, CogIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline'

const chatbots = [
  { id: 1, name: 'Sales Assistant', platform: 'WhatsApp', status: 'Active', responses: 1245, lastUpdated: 'Jul 20, 2023' },
  { id: 2, name: 'Support Bot', platform: 'Website', status: 'Active', responses: 876, lastUpdated: 'Jul 18, 2023' },
  { id: 3, name: 'Lead Qualifier', platform: 'WhatsApp', status: 'Paused', responses: 1532, lastUpdated: 'Jul 15, 2023' },
  { id: 4, name: 'Order Status', platform: 'Facebook', status: 'Draft', responses: 0, lastUpdated: 'Jul 10, 2023' },
]

const Chatbots = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Chatbots</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
          New Chatbot
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {chatbots.map((bot) => (
          <motion.div
            key={bot.id}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{bot.name}</h3>
                  <p className="text-sm text-gray-500">{bot.platform}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                bot.status === 'Active' ? 'bg-green-100 text-green-800' :
                bot.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {bot.status}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-6">
              <div>
                <p>Responses</p>
                <p className="font-medium">{bot.responses.toLocaleString()}</p>
              </div>
              <div>
                <p>Last Updated</p>
                <p className="font-medium">{bot.lastUpdated}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-50">
                <CogIcon className="h-4 w-4 mr-2" />
                <span>Configure</span>
              </button>
              {bot.status === 'Active' ? (
                <button className="flex-1 flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-50">
                  <PauseIcon className="h-4 w-4 mr-2" />
                  <span>Pause</span>
                </button>
              ) : (
                <button className="flex-1 flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
                  <PlayIcon className="h-4 w-4 mr-2" />
                  <span>Activate</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Chatbots;