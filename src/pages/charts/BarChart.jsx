import { motion } from 'framer-motion'

export const BarChart = () => {
  // Sample data for campaign performance
  const campaignData = [
    { name: 'Summer Sale', clicks: 3456, impressions: 12345, conversions: 789 },
    { name: 'New Launch', clicks: 2890, impressions: 9876, conversions: 654 },
    { name: 'Retention', clicks: 1234, impressions: 5678, conversions: 321 },
    { name: 'Holiday', clicks: 4321, impressions: 13579, conversions: 987 },
    { name: 'Clearance', clicks: 1567, impressions: 8642, conversions: 543 },
  ]

  // Find the maximum value for scaling
  const maxValue = Math.max(
    ...campaignData.map(item => Math.max(item.clicks, item.impressions, item.conversions))
  )

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

  return (
    <div className="h-64">
      <div className="flex items-end h-48 space-x-2">
        {campaignData.map((campaign, index) => (
          <div key={index} className="flex-1 flex space-x-1">
            {/* Clicks bar */}
            <motion.div
              custom={{ value: campaign.clicks, delay: index * 0.1 }}
              initial="hidden"
              animate="visible"
              variants={barVariants}
              className="w-1/3 bg-primary/80 relative group rounded-t"
            >
              <div className="absolute -top-6 left-0 right-0 text-center text-xs font-medium">
                {campaign.clicks.toLocaleString()}
              </div>
              <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500 truncate px-1">
                {campaign.name}
              </div>
              <div className="absolute -top-8 left-0 right-0 text-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Clicks
              </div>
            </motion.div>

            {/* Impressions bar */}
            <motion.div
              custom={{ value: campaign.impressions, delay: index * 0.1 + 0.05 }}
              initial="hidden"
              animate="visible"
              variants={barVariants}
              className="w-1/3 bg-primary/50 relative group rounded-t"
            >
              <div className="absolute -top-6 left-0 right-0 text-center text-xs font-medium">
                {campaign.impressions.toLocaleString()}
              </div>
              <div className="absolute -top-8 left-0 right-0 text-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Impressions
              </div>
            </motion.div>

            {/* Conversions bar */}
            <motion.div
              custom={{ value: campaign.conversions, delay: index * 0.1 + 0.1 }}
              initial="hidden"
              animate="visible"
              variants={barVariants}
              className="w-1/3 bg-primary/30 relative group rounded-t"
            >
              <div className="absolute -top-6 left-0 right-0 text-center text-xs font-medium">
                {campaign.conversions.toLocaleString()}
              </div>
              <div className="absolute -top-8 left-0 right-0 text-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Conversions
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-6 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-primary/80 mr-2 rounded-sm"></div>
          <span className="text-xs text-gray-600">Clicks</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-primary/50 mr-2 rounded-sm"></div>
          <span className="text-xs text-gray-600">Impressions</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-primary/30 mr-2 rounded-sm"></div>
          <span className="text-xs text-gray-600">Conversions</span>
        </div>
      </div>
    </div>
  )
}