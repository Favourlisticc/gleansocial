import { motion } from 'framer-motion'
import { 
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export const LineChart = ({ 
  data = [],
  title = 'Leads Over Time',
  description,
  color = '#3b82f6',
  onRefresh,
  isLoading = false,
  showControls = true,
  showPoints = true,
  showArea = true,
  showGrid = true,
  height = 300
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [activeDataset, setActiveDataset] = useState(0)

  // Default data if none provided
  const chartData = data.length > 0 ? data : [
    { month: 'Jan', leads: 120 },
    { month: 'Feb', leads: 210 },
    { month: 'Mar', leads: 180 },
    { month: 'Apr', leads: 240 },
    { month: 'May', leads: 300 },
    { month: 'Jun', leads: 320 },
    { month: 'Jul', leads: 280 },
  ]

  // Handle multiple datasets
  const datasets = Array.isArray(chartData[0]?.value) ? 
    chartData[0].value.map((_, i) => i) : [0]
  
  // Get values for current active dataset
  const getValues = (item) => {
    return Array.isArray(item.value) ? item.value[activeDataset] : item.value || item.leads
  }

  // Calculate chart metrics
  const values = chartData.map(getValues)
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  const range = maxValue - minValue
  const step = 100 / (chartData.length - 1)

  // Generate SVG path for the line
  const generatePath = () => {
    return chartData.map((item, i) => {
      const value = getValues(item)
      const x = i * step
      const y = 100 - ((value - minValue) / range * 100)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
  }

  // Generate SVG path for the area
  const generateAreaPath = () => {
    const linePoints = chartData.map((item, i) => {
      const value = getValues(item)
      const x = i * step
      const y = 100 - ((value - minValue) / range * 100)
      return `${x},${y}`
    }).join(' ')

    return `M ${linePoints} L 100,100 L 0,100 Z`
  }

  // Animation variants
  const pointVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 }
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${isExpanded ? 'w-full' : 'w-full max-w-3xl'}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        
        {/* Controls */}
        {showControls && (
          <div className="flex space-x-2">
            {onRefresh && (
              <button 
                onClick={onRefresh}
                disabled={isLoading}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                title="Refresh data"
              >
                {isLoading ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowPathIcon className="h-5 w-5" />
                )}
              </button>
            )}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Chart */}
      <div 
        className="relative"
        style={{ height: `${isExpanded ? height * 1.5 : height}px` }}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <ArrowPathIcon className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}

        {/* Grid lines */}
        {showGrid && (
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 25, 50, 75, 100].map((percent, i) => (
              <div 
                key={i}
                className="border-t border-gray-100 relative"
                style={{ top: `${percent}%` }}
              >
                <span className="absolute -left-10 -top-2 text-xs text-gray-400">
                  {Math.round(minValue + (range * (100 - percent) / 100))}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* SVG Chart */}
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Area fill */}
          {showArea && (
            <motion.path
              d={generateAreaPath()}
              fill={`${color}20`}
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          )}

          {/* Line */}
          <motion.path
            d={generatePath()}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Points */}
          {showPoints && chartData.map((item, i) => {
            const value = getValues(item)
            const x = i * step
            const y = 100 - ((value - minValue) / range * 100)
            
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={hoveredIndex === i ? 5 : 3}
                fill={color}
                stroke="white"
                strokeWidth="1"
                variants={pointVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              />
            )
          })}
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          {chartData.map((item, i) => (
            <div 
              key={i}
              className="text-xs text-gray-500 text-center"
              style={{ width: `${step}%` }}
            >
              {item.month || item.label || item.x}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bg-white p-2 rounded shadow-lg border border-gray-200 z-10"
            style={{
              left: `${(hoveredIndex / (chartData.length - 1)) * 100}%`,
              bottom: 'calc(100% + 10px)',
              transform: 'translateX(-50%)'
            }}
          >
            <div className="text-xs font-medium text-gray-800">
              {chartData[hoveredIndex].month || chartData[hoveredIndex].label}
            </div>
            <div className="text-xs text-gray-600">
              {getValues(chartData[hoveredIndex]).toLocaleString()} leads
            </div>
          </motion.div>
        )}
      </div>

      {/* Dataset selector */}
      {datasets.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {datasets.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveDataset(i)}
              className={`px-2 py-1 text-xs rounded ${
                activeDataset === i 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Dataset {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}