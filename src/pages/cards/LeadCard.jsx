import { motion } from 'framer-motion'
import { EnvelopeIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline'

export const LeadCard = ({ name, email, phone, source, status, lastContact, score, detailed = false }) => {
  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-purple-100 text-purple-800',
    'Qualified': 'bg-green-100 text-green-800',
    'Lost': 'bg-red-100 text-red-800'
  }

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <UserIcon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{name}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="flex items-center">
              <EnvelopeIcon className="h-4 w-4 mr-1" />
              {email}
            </span>
            {detailed && (
              <span className="flex items-center">
                <PhoneIcon className="h-4 w-4 mr-1" />
                {phone}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {detailed && (
          <div className="flex items-center">
            <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">{score}</span>
          </div>
        )}
        
        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
          {status}
        </span>
        
        {detailed ? (
          <div className="text-sm text-gray-500">
            <p>Source: {source}</p>
            <p>Last contact: {lastContact}</p>
          </div>
        ) : (
          <span className="text-sm text-gray-500">{lastContact}</span>
        )}
      </div>
    </motion.div>
  )
}
