import { motion } from 'framer-motion'
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ArrowTurnRightDownIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  delay = 0,
  description,
  onRefresh,
  isLoading = false,
  formatValue,
  secondaryValue,
  size = 'medium'
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  
  // Determine colors based on trend
  const trendColors = {
    up: {
      text: 'text-green-600',
      bg: 'bg-green-50',
      icon: <ArrowTurnRightDownIcon className="h-5 w-5" />
    },
    down: {
      text: 'text-red-600',
      bg: 'bg-red-50',
      icon: <ArrowTurnRightDownIcon className="h-5 w-5" />
    },
    neutral: {
      text: 'text-gray-600',
      bg: 'bg-gray-50',
      icon: <ChartBarIcon className="h-5 w-5" />
    }
  }

  // Handle different sizes
  const sizeClasses = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-5'
  }

  // Format the value if a formatter function is provided
  const formattedValue = formatValue ? formatValue(value) : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-white rounded-lg shadow relative ${sizeClasses[size]}`}
    >
      {/* Header section */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            {description && (
              <div className="relative ml-1">
                <button 
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <InformationCircleIcon className="h-4 w-4" />
                </button>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute z-10 left-0 mt-2 w-48 bg-white p-2 rounded-md shadow-lg border border-gray-100 text-xs text-gray-600"
                  >
                    {description}
                  </motion.div>
                )}
              </div>
            )}
          </div>
          <p className={`font-semibold ${size === 'small' ? 'text-xl' : 'text-2xl'} text-gray-800 mt-1`}>
            {formattedValue}
          </p>
        </div>
        
        {/* Refresh button */}
        {onRefresh && (
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            {isLoading ? (
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowPathIcon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Trend indicator */}
      <div className={`inline-flex items-center mt-2 px-2 py-1 rounded-md ${trendColors[trend]?.bg || 'bg-gray-50'}`}>
        {trendColors[trend]?.icon || <ChartBarIcon className="h-4 w-4" />}
        <span className={`ml-1 text-sm ${trendColors[trend]?.text || 'text-gray-600'}`}>
          {change}
        </span>
        {trend === 'up' ? (
          <ArrowUpIcon className="h-4 w-4 ml-1" />
        ) : trend === 'down' ? (
          <ArrowDownIcon className="h-4 w-4 ml-1" />
        ) : null}
      </div>

      {/* Secondary value (if provided) */}
      {secondaryValue && (
        <div className="mt-2 text-xs text-gray-500">
          {secondaryValue}
        </div>
      )}

      {/* Loading state overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 rounded-lg flex items-center justify-center">
          <ArrowPathIcon className="h-6 w-6 text-primary animate-spin" />
        </div>
      )}
    </motion.div>
  )
}