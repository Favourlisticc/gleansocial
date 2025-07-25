import { motion } from 'framer-motion'
import { PhoneIcon, EnvelopeIcon, ChatBubbleBottomCenterTextIcon, CalendarIcon } from '@heroicons/react/24/outline'

const interactions = [
  { id: 1, type: 'Call', customer: 'Sarah Johnson', date: 'Jul 20, 2023 10:30 AM', duration: '15m', outcome: 'Positive', notes: 'Discussed new product features' },
  { id: 2, type: 'Email', customer: 'Michael Brown', date: 'Jul 19, 2023 2:15 PM', outcome: 'Neutral', notes: 'Sent pricing information' },
  { id: 3, type: 'WhatsApp', customer: 'Emily Davis', date: 'Jul 18, 2023 4:45 PM', outcome: 'Positive', notes: 'Confirmed order delivery' },
  { id: 4, type: 'Call', customer: 'David Wilson', date: 'Jul 17, 2023 11:20 AM', duration: '8m', outcome: 'Negative', notes: 'Customer complaint about service' },
]

const Interactions = () => {
  const getInteractionIcon = (type) => {
    switch(type) {
      case 'Call': return <PhoneIcon className="h-5 w-5 text-blue-500" />
      case 'Email': return <EnvelopeIcon className="h-5 w-5 text-primary" />
      case 'WhatsApp': return <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-green-500" />
      default: return <PhoneIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getOutcomeColor = (outcome) => {
    switch(outcome) {
      case 'Positive': return 'bg-green-100 text-green-800'
      case 'Negative': return 'bg-red-100 text-red-800'
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
        <h1 className="text-2xl font-bold text-gray-800">Customer Interactions</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
          Log Interaction
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
              <option>All Types</option>
              <option>Call</option>
              <option>Email</option>
              <option>WhatsApp</option>
            </select>
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Outcomes</option>
              <option>Positive</option>
              <option>Neutral</option>
              <option>Negative</option>
            </select>
            <input 
              type="text" 
              placeholder="Search interactions..." 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-4">
          {interactions.map((interaction) => (
            <motion.div
              key={interaction.id}
              whileHover={{ scale: 1.01 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-gray-100 mr-4">
                  {getInteractionIcon(interaction.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{interaction.customer}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{interaction.date}</span>
                        {interaction.duration && (
                          <span className="ml-3">{interaction.duration}</span>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getOutcomeColor(interaction.outcome)}`}>
                      {interaction.outcome}
                    </span>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <p className="font-medium">Notes:</p>
                    <p>{interaction.notes}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">Showing 1 to 4 of 42 entries</div>
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

export default Interactions;