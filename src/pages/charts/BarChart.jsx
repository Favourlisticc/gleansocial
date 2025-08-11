import { motion } from 'framer-motion'
import { 
  InformationCircleIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export const BarChart = ({ 
  data = [],
  metrics = ['clicks', 'impressions', 'conversions'],
  colors = ['#3b82f6', '#60a5fa', '#93c5fd'],
  title = 'Campaign Performance',
  description,
  onRefresh,
  isLoading = false,
  showControls = true,
  stacked = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [activeMetric, setActiveMetric] = useState(null)

  // Default data if none provided
  const chartData = data.length > 0 ? data : [
    { name: 'Summer Sale', clicks: 3456, impressions: 12345, conversions: 789 },
    { name: 'New Launch', clicks: 2890, impressions: 9876, conversions: 654 },
    { name: 'Retention', clicks: 1234, impressions: 5678, conversions: 321 },
    { name: 'Holiday', clicks: 4321, impressions: 13579, conversions: 987 },
    { name: 'Clearance', clicks: 1567, impressions: 8642, conversions: 543 },
  ]

  // Filter metrics to only those present in data
  const availableMetrics = metrics.filter(metric => 
    chartData.some(item => item[metric] !== undefined)
  
  )

  const maxValue = Math.max(
    ...chartData.map(item => 
      Math.max(...availableMetrics.map(metric => item[metric] || 0))
  ))

  // Animation variants
  const barVariants = {
    hidden: { height: 0 },
    visible: (custom) => ({
      height: `${(custom.value / maxValue) * 100}%`,
      transition: {
        delay: custom.delay,
        duration: 0.8,
        type: 'spring',
        damping: 10,
      },
    }),
  }

  // Handle metric visibility
  const visibleMetrics = activeMetric 
    ? [activeMetric]
    : availableMetrics

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
      <div className={`${isExpanded ? 'h-96' : 'h-64'} relative`}>
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <ArrowPathIcon className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}
        
        <div className="flex items-end h-5/6 space-x-2">
          {chartData.map((item, index) => (
            <div 
              key={index} 
              className="flex-1 flex space-x-1"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {visibleMetrics.map((metric, metricIndex) => {
                const opacity = hoveredItem === index || activeMetric === metric ? 1 : 0.8
                const color = colors[metricIndex % colors.length]
                
                return (
                  <motion.div
                    key={metric}
                    custom={{ 
                      value: item[metric], 
                      delay: index * 0.05 + metricIndex * 0.02 
                    }}
                    initial="hidden"
                    animate="visible"
                    variants={barVariants}
                    className={`relative group rounded-t ${stacked ? 'absolute bottom-0' : ''}`}
                    style={{
                      width: stacked ? '100%' : `${100 / visibleMetrics.length}%`,
                      backgroundColor: color,
                      opacity,
                      zIndex: hoveredItem === index ? 10 : metricIndex + 1,
                      left: stacked ? 0 : `${(metricIndex * 100) / visibleMetrics.length}%`
                    }}
                    onClick={() => setActiveMetric(activeMetric === metric ? null : metric)}
                  >
                    <div className="absolute -top-6 left-0 right-0 text-center text-xs font-medium">
                      {item[metric].toLocaleString()}
                    </div>
                    {(hoveredItem === index || activeMetric) && (
                      <div className="absolute -top-8 left-0 right-0 text-center text-xs font-medium">
                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                      </div>
                    )}
                  </motion.div>
                )
              })}
              
              <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500 truncate px-1">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center mt-6 gap-2">
        {availableMetrics.map((metric, index) => {
          const color = colors[index % colors.length]
          const isActive = activeMetric === metric || !activeMetric
          
          return (
            <button
              key={metric}
              className={`flex items-center px-2 py-1 rounded-md text-xs ${
                isActive ? 'bg-opacity-20' : 'bg-opacity-10 opacity-50'
              }`}
              style={{ backgroundColor: `${color}${isActive ? '33' : '1a'}` }}
              onClick={() => setActiveMetric(activeMetric === metric ? null : metric)}
            >
              <div 
                className="w-3 h-3 mr-2 rounded-sm" 
                style={{ backgroundColor: color }}
              ></div>
              <span className="font-medium" style={{ color }}>
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </span>
            </button>
          )
        })}
      </div>

      {/* Tooltip for hovered item */}
      {hoveredItem !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-20"
          style={{
            left: `${(hoveredItem / chartData.length) * 100}%`,
            bottom: 'calc(100% + 10px)'
          }}
        >
          <h4 className="font-medium text-sm mb-1">{chartData[hoveredItem].name}</h4>
          {availableMetrics.map(metric => (
            <div key={metric} className="flex justify-between text-xs">
              <span className="text-gray-500 mr-2">
                {metric.charAt(0).toUpperCase() + metric.slice(1)}:
              </span>
              <span className="font-medium">
                {chartData[hoveredItem][metric].toLocaleString()}
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}