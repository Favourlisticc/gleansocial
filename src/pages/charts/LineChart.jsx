import { motion } from 'framer-motion'

export const LineChart = () => {
  const data = [
    { month: 'Jan', leads: 120 },
    { month: 'Feb', leads: 210 },
    { month: 'Mar', leads: 180 },
    { month: 'Apr', leads: 240 },
    { month: 'May', leads: 300 },
    { month: 'Jun', leads: 320 },
    { month: 'Jul', leads: 280 },
  ]

  const maxValue = Math.max(...data.map(item => item.leads))
  
  return (
    <div className="h-64">
      <div className="flex items-end h-48 space-x-2">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: (item.leads / maxValue) * 100 + '%' }}
            transition={{ delay: index * 0.1, type: 'spring', damping: 10 }}
            className="flex-1 bg-primary/20 relative group"
          >
            <div className="absolute top-0 left-0 right-0 bg-primary h-full"></div>
            <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500">
              {item.month}
            </div>
            <div className="absolute -top-8 left-0 right-0 text-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {item.leads}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}