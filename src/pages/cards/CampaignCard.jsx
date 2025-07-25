import { motion } from 'framer-motion'
import { 
  EnvelopeIcon, 
  ChatBubbleBottomCenterTextIcon, 
  DevicePhoneMobileIcon,
  ClockIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export const CampaignCard = ({ 
  id,
  name, 
  channel, 
  status, 
  progress, 
  startDate, 
  endDate,
  audience,
  goal,
  sent,
  opened,
  clicked,
  detailed = false 
}) => {
  // Channel icons mapping
  const channelIcons = {
    'Email': <EnvelopeIcon className="h-5 w-5" />,
    'WhatsApp': <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />,
    'SMS': <DevicePhoneMobileIcon className="h-5 w-5" />,
  }

  // Status colors mapping
  const statusColors = {
    'Active': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'Draft': 'bg-gray-100 text-gray-800',
    'Paused': 'bg-red-100 text-red-800'
  }

  // Progress bar color based on status
  const progressColor = {
    'Active': 'bg-primary',
    'Pending': 'bg-yellow-500',
    'Completed': 'bg-blue-500',
    'Draft': 'bg-gray-400',
    'Paused': 'bg-red-500'
  }[status] || 'bg-primary'

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: detailed ? 1 : 1.02 }}
      className={`bg-white rounded-lg shadow ${detailed ? 'p-6' : 'p-4'}`}
    >
      <div className={`flex ${detailed ? 'flex-col md:flex-row md:items-start' : 'items-center justify-between'}`}>
        {/* Left section */}
        <div className={`flex ${detailed ? 'flex-col md:flex-1 mb-4 md:mb-0' : 'items-center space-x-4'}`}>
          <div className={`flex items-center justify-center rounded-lg ${detailed ? 'h-12 w-12 mb-3' : 'h-10 w-10'} bg-primary/10 text-primary`}>
            {channelIcons[channel] || <EnvelopeIcon className="h-5 w-5" />}
          </div>
          
          <div>
            <h3 className={`font-medium ${detailed ? 'text-xl mb-1' : 'text-base'}`}>{name}</h3>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${detailed ? 'text-gray-600' : 'text-gray-500'}`}>{channel}</span>
              {!detailed && (
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
                  {status}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className={`flex ${detailed ? 'flex-col md:flex-row md:items-center md:space-x-6 w-full md:w-auto' : 'items-center space-x-4'}`}>
          {detailed ? (
            <>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{startDate} - {endDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ChartBarIcon className="h-4 w-4" />
                  <span>Goal: {goal}</span>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Audience</h4>
                <p className="text-sm text-gray-600">{audience}</p>
              </div>

              <div className="mt-4 md:mt-0">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Performance</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Sent: {sent}</p>
                  <p>Opened: {opened}</p>
                  <p>Clicked: {clicked}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="hidden sm:block">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4" />
                  <span>{startDate}</span>
                </div>
              </div>
            </>
          )}

          {/* Progress section */}
          <div className={`flex items-center ${detailed ? 'mt-4 md:mt-0 md:w-48' : 'w-24'}`}>
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full rounded-full ${progressColor}`}
                />
              </div>
              {detailed && (
                <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
              )}
            </div>
            {!detailed && (
              <span className="ml-2 text-xs font-medium text-gray-700">{progress}%</span>
            )}
          </div>
        </div>
      </div>

      {detailed && (
        <div className="flex justify-end mt-6 space-x-3">
          <button className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50">
            View Details
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primaryDark">
            {status === 'Active' ? 'Manage' : 'Edit'}
          </button>
        </div>
      )}
    </motion.div>
  )
}