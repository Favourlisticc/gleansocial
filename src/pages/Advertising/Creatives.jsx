import { motion } from 'framer-motion'
import { PhotoIcon, VideoCameraIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'

const creatives = [
  { id: 1, name: 'Summer Sale Banner', type: 'Image', platform: 'Facebook', size: '1200x628', status: 'Active', impressions: 12450 },
  { id: 2, name: 'Product Video Ad', type: 'Video', platform: 'Instagram', size: '1080x1080', status: 'Active', impressions: 8760 },
  { id: 3, name: 'Promo Carousel', type: 'Carousel', platform: 'Facebook', size: '1080x1080', status: 'Pending', impressions: 0 },
  { id: 4, name: 'Lead Gen Form', type: 'Form', platform: 'LinkedIn', size: '1200x628', status: 'Active', impressions: 5430 },
]

const Creatives = () => {
  const getTypeIcon = (type) => {
    switch(type) {
      case 'Image': return <PhotoIcon className="h-5 w-5 text-blue-500" />
      case 'Video': return <VideoCameraIcon className="h-5 w-5 text-red-500" />
      case 'Carousel': return <ArrowsPointingOutIcon className="h-5 w-5 text-green-500" />
      default: return <PhotoIcon className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Ad Creatives</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
            Upload
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
            Create New
          </button>
        </div>
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
              <option>All Platforms</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Google</option>
              <option>LinkedIn</option>
            </select>
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Types</option>
              <option>Image</option>
              <option>Video</option>
              <option>Carousel</option>
              <option>Form</option>
            </select>
            <input 
              type="text" 
              placeholder="Search creatives..." 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creatives.map((creative) => (
            <motion.div
              key={creative.id}
              whileHover={{ y: -5 }}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-100 h-40 flex items-center justify-center">
                {getTypeIcon(creative.type)}
                <span className="ml-2 text-gray-600">{creative.type}</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{creative.name}</h3>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>{creative.platform}</span>
                  <span>{creative.size}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    creative.status === 'Active' ? 'bg-green-100 text-green-800' :
                    creative.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {creative.status}
                  </span>
                  <span className="text-sm text-gray-600">{creative.impressions.toLocaleString()} impressions</span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t">
                  <button className="text-sm text-primary hover:text-primaryDark">Preview</button>
                  <button className="text-sm text-gray-600 hover:text-gray-800">Edit</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">Showing 1 to 4 of 12 entries</div>
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

export default Creatives;