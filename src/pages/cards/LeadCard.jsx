import { motion } from 'framer-motion'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  UserIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  CalendarDaysIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export const LeadCard = ({ 
  id,
  name, 
  email, 
  phone, 
  source, 
  status, 
  lastContact, 
  score, 
  detailed = false,
  onContact,
  onStatusChange,
  onFavorite,
  onViewDetails,
  isFavorite = false
}) => {
  // State for dropdown menu
  const [showMenu, setShowMenu] = useState(false)
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  // Status colors mapping
  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-purple-100 text-purple-800',
    'Qualified': 'bg-green-100 text-green-800',
    'Lost': 'bg-red-100 text-red-800',
    'Follow-up': 'bg-yellow-100 text-yellow-800'
  }

  // Handler functions
  const handleContact = (method) => {
    if (onContact) onContact(id, method)
    setShowMenu(false)
  }

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) onStatusChange(id, newStatus)
    setShowStatusMenu(false)
  }

  const toggleFavorite = () => {
    if (onFavorite) onFavorite(id, !isFavorite)
  }

  const handleViewDetails = () => {
    if (onViewDetails) onViewDetails(id)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white p-4 rounded-lg shadow flex items-center justify-between relative"
    >
      {/* Favorite button */}
      <button 
        onClick={toggleFavorite}
        className="absolute -left-1 -top-1 z-10"
      >
        {isFavorite ? (
          <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        ) : (
          <StarIcon className="h-5 w-5 text-gray-300 hover:text-yellow-400" />
        )}
      </button>

      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <div 
          onClick={handleViewDetails}
          className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer"
        >
          <UserIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 
            onClick={handleViewDetails}
            className="font-medium text-gray-800 truncate cursor-pointer hover:text-primary"
          >
            {name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="flex items-center truncate">
              <EnvelopeIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{email}</span>
            </span>
            {detailed && (
              <span className="flex items-center truncate">
                <PhoneIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{phone}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 ml-2">
        {detailed && (
          <div className="flex items-center w-24">
            <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">{score}</span>
          </div>
        )}
        
        {/* Status with dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className={`px-2 py-1 text-xs rounded-full flex items-center ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}
          >
            {status}
            <svg className="ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {showStatusMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10"
            >
              <div className="py-1">
                {Object.keys(statusColors).map((statusOption) => (
                  <button
                    key={statusOption}
                    onClick={() => handleStatusChange(statusOption)}
                    className={`block w-full text-left px-4 py-2 text-sm ${status === statusOption ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    {statusOption}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        {detailed ? (
          <div className="text-sm text-gray-500 hidden md:block">
            <p className="flex items-center">
              <CalendarDaysIcon className="h-4 w-4 mr-1" />
              {lastContact}
            </p>
          </div>
        ) : (
          <span className="text-sm text-gray-500 hidden sm:flex items-center">
            <CalendarDaysIcon className="h-4 w-4 mr-1" />
            {lastContact}
          </span>
        )}

        {/* Contact dropdown menu */}
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <EllipsisVerticalIcon className="h-5 w-5" />
          </button>
          
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10"
            >
              <div className="py-1">
                <button
                  onClick={() => handleContact('email')}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  Email Lead
                </button>
                <button
                  onClick={() => handleContact('call')}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Call Lead
                </button>
                <button
                  onClick={() => handleContact('message')}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                  Send Message
                </button>
                <button
                  onClick={handleViewDetails}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  View Details
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Click outside to close menus */}
      {(showMenu || showStatusMenu) && (
        <div 
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowMenu(false)
            setShowStatusMenu(false)
          }}
        />
      )}
    </motion.div>
  

)
}