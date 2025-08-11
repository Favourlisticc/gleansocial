import { motion } from 'framer-motion'
import { PhotoIcon, VideoCameraIcon, ArrowsPointingOutIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const Creatives = () => {
  // Initial static data with state management
  const [creatives, setCreatives] = useState([
    { id: 1, name: 'Summer Sale Banner', type: 'Image', platform: 'Facebook', size: '1200x628', status: 'Active', impressions: 12450 },
    { id: 2, name: 'Product Video Ad', type: 'Video', platform: 'Instagram', size: '1080x1080', status: 'Active', impressions: 8760 },
    { id: 3, name: 'Promo Carousel', type: 'Carousel', platform: 'Facebook', size: '1080x1080', status: 'Pending', impressions: 0 },
    { id: 4, name: 'Lead Gen Form', type: 'Form', platform: 'LinkedIn', size: '1200x628', status: 'Active', impressions: 5430 },
    { id: 5, name: 'Holiday Special', type: 'Image', platform: 'Google', size: '1200x628', status: 'Draft', impressions: 0 },
    { id: 6, name: 'Tutorial Video', type: 'Video', platform: 'YouTube', size: '1920x1080', status: 'Active', impressions: 15600 },
    { id: 7, name: 'Product Gallery', type: 'Carousel', platform: 'Instagram', size: '1080x1080', status: 'Active', impressions: 9800 },
    { id: 8, name: 'Survey Form', type: 'Form', platform: 'Facebook', size: '1200x628', status: 'Pending', impressions: 0 },
  ])

  const [platformFilter, setPlatformFilter] = useState('All Platforms')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [newCreative, setNewCreative] = useState({
    name: '',
    type: 'Image',
    platform: 'Facebook',
    size: '1200x628',
    status: 'Draft'
  })

  // Constants
  const itemsPerPage = 4
  const totalPages = Math.ceil(creatives.length / itemsPerPage)

  // Filter and paginate creatives
  const filteredCreatives = creatives.filter(creative => {
    const matchesPlatform = platformFilter === 'All Platforms' || creative.platform === platformFilter
    const matchesType = typeFilter === 'All Types' || creative.type === typeFilter
    const matchesSearch = creative.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesPlatform && matchesType && matchesSearch
  })

  const paginatedCreatives = filteredCreatives.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Helper functions
  const getTypeIcon = (type) => {
    switch(type) {
      case 'Image': return <PhotoIcon className="h-5 w-5 text-blue-500" />
      case 'Video': return <VideoCameraIcon className="h-5 w-5 text-red-500" />
      case 'Carousel': return <ArrowsPointingOutIcon className="h-5 w-5 text-green-500" />
      case 'Form': return <DocumentTextIcon className="h-5 w-5 text-purple-500" />
      default: return <PhotoIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getSizeForType = (type, platform) => {
    const sizes = {
      Image: {
        Facebook: '1200x628',
        Instagram: '1080x1080',
        LinkedIn: '1200x628',
        Google: '1200x628',
        YouTube: '1920x1080'
      },
      Video: {
        Facebook: '1280x720',
        Instagram: '1080x1080',
        LinkedIn: '1280x720',
        Google: '1920x1080',
        YouTube: '1920x1080'
      },
      Carousel: {
        Facebook: '1080x1080',
        Instagram: '1080x1080',
        LinkedIn: '1080x1080',
        Google: '1080x1080',
        YouTube: '1920x1080'
      },
      Form: {
        Facebook: '1200x628',
        Instagram: '1080x1080',
        LinkedIn: '1200x628',
        Google: '1200x628',
        YouTube: '1920x1080'
      }
    }
    return sizes[type]?.[platform] || '1200x628'
  }

  // Handler functions
  const handleCreateCreative = () => {
    if (showCreateModal) {
      // Validate form
      if (!newCreative.name) {
        alert('Please enter a creative name')
        return
      }

      // Create new creative
      const newId = Math.max(...creatives.map(c => c.id)) + 1
      const size = getSizeForType(newCreative.type, newCreative.platform)
      
      const creativeToAdd = {
        ...newCreative,
        id: newId,
        size,
        impressions: 0
      }

      setCreatives([...creatives, creativeToAdd])
      setShowCreateModal(false)
      setNewCreative({
        name: '',
        type: 'Image',
        platform: 'Facebook',
        size: '1200x628',
        status: 'Draft'
      })
      alert('Creative created successfully!')
    } else {
      setShowCreateModal(true)
    }
  }

  const handleUploadCreative = () => {
    if (showUploadModal) {
      // In a real app, this would handle file upload
      alert('Files uploaded successfully!')
      setShowUploadModal(false)
    } else {
      setShowUploadModal(true)
    }
  }

  const handlePreview = (id) => {
    const creative = creatives.find(c => c.id === id)
    alert(`Previewing creative: ${creative?.name}`)
  }

  const handleEdit = (id) => {
    const creative = creatives.find(c => c.id === id)
    alert(`Editing creative: ${creative?.name}`)
    // In a real app, this would open an edit form with the creative's data
  }

  const handleDelete = (id) => {
    if (('Are you sure you want to delete this creative?')) {
      setCreatives(creatives.filter(creative => creative.id !== id))
      alert('Creative deleted successfully!')
    }
  }

  const handleStatusChange = (id, newStatus) => {
    setCreatives(creatives.map(creative => 
      creative.id === id ? { ...creative, status: newStatus } : creative
    ))
    alert(`Creative status updated to ${newStatus}!`)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
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
          <button 
            onClick={handleUploadCreative}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            {showUploadModal ? 'Upload Files' : 'Upload'}
          </button>
          <button 
            onClick={handleCreateCreative}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
          >
            {showCreateModal ? 'Save Creative' : 'Create New'}
          </button>
        </div>
      </motion.div>

      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Upload Creatives</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Drag and drop files here</h3>
            <p className="mt-1 text-sm text-gray-500">or</p>
            <button className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
              Browse Files
            </button>
            <p className="mt-2 text-xs text-gray-500">
              Supported formats: JPG, PNG, GIF, MP4 up to 50MB
            </p>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadCreative}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
            >
              Upload
            </button>
          </div>
        </motion.div>
      )}

      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Create New Creative</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                value={newCreative.name}
                onChange={(e) => setNewCreative({...newCreative, name: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="e.g. Summer Sale Banner"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
              <select
                value={newCreative.type}
                onChange={(e) => setNewCreative({...newCreative, type: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="Image">Image</option>
                <option value="Video">Video</option>
                <option value="Carousel">Carousel</option>
                <option value="Form">Form</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform*</label>
              <select
                value={newCreative.platform}
                onChange={(e) => setNewCreative({...newCreative, platform: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Google">Google</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
              <select
                value={newCreative.status}
                onChange={(e) => setNewCreative({...newCreative, status: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCreative}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
            >
              Save Creative
            </button>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <select 
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Platforms</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Google</option>
              <option>LinkedIn</option>
              <option>YouTube</option>
            </select>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Types</option>
              <option>Image</option>
              <option>Video</option>
              <option>Carousel</option>
              <option>Form</option>
            </select>
            <input 
              type="text" 
              placeholder="Search creatives..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedCreatives.length > 0 ? (
            paginatedCreatives.map((creative) => (
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
                    <select
                      value={creative.status}
                      onChange={(e) => handleStatusChange(creative.id, e.target.value)}
                      className={`text-xs rounded-full px-2 py-1 ${
                        creative.status === 'Active' ? 'bg-green-100 text-green-800' :
                        creative.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                    </select>
                    <span className="text-sm text-gray-600">{creative.impressions.toLocaleString()} impressions</span>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t">
                    <button 
                      onClick={() => handlePreview(creative.id)}
                      className="text-sm text-primary hover:text-primaryDark"
                    >
                      Preview
                    </button>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleEdit(creative.id)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(creative.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No creatives found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {filteredCreatives.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCreatives.length)} of {filteredCreatives.length} entries
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === page ? 'bg-primary text-white' : 'hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Creatives