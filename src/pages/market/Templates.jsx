import { motion } from 'framer-motion'
import { useState } from 'react'
import { EnvelopeIcon, ChatBubbleBottomCenterTextIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'

// Expanded static data
const initialTemplates = [
  { id: 1, name: 'Welcome Email', channel: 'Email', lastUsed: 'Jul 20, 2023', usage: 1245, content: 'Welcome to our service! We\'re excited to have you.' },
  { id: 2, name: 'Abandoned Cart', channel: 'Email', lastUsed: 'Jul 18, 2023', usage: 876, content: 'You left items in your cart. Complete your purchase now!' },
  { id: 3, name: 'Order Confirmation', channel: 'WhatsApp', lastUsed: 'Jul 15, 2023', usage: 1532, content: 'Your order #12345 has been confirmed. Thank you!' },
  { id: 4, name: 'Promo Offer', channel: 'SMS', lastUsed: 'Jul 10, 2023', usage: 987, content: 'SPECIAL OFFER: 20% off today only! Use code SAVE20' },
  { id: 5, name: 'Password Reset', channel: 'Email', lastUsed: 'Jul 5, 2023', usage: 432, content: 'Click here to reset your password.' },
  { id: 6, name: 'Appointment Reminder', channel: 'SMS', lastUsed: 'Jun 28, 2023', usage: 765, content: 'Reminder: Your appointment is tomorrow at 2 PM.' },
  { id: 7, name: 'Feedback Request', channel: 'Email', lastUsed: 'Jun 20, 2023', usage: 321, content: 'How was your experience? We\'d love your feedback!' },
]

const Templates = () => {
  const [templates, setTemplates] = useState(initialTemplates)
  const [filterChannel, setFilterChannel] = useState('All Channels')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showTemplateForm, setShowTemplateForm] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    channel: 'Email',
    content: ''
  })
  const [previewTemplate, setPreviewTemplate] = useState(null)

  const itemsPerPage = 5
  const totalItems = initialTemplates.length

  const getChannelIcon = (channel) => {
    switch(channel) {
      case 'Email': return <EnvelopeIcon className="h-5 w-5 text-primary" />
      case 'WhatsApp': return <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-green-500" />
      case 'SMS': return <DevicePhoneMobileIcon className="h-5 w-5 text-blue-500" />
      default: return <EnvelopeIcon className="h-5 w-5 text-gray-500" />
    }
  }

  // Filter templates based on search and filters
  const filteredTemplates = initialTemplates.filter(template => {
    // Filter by channel
    if (filterChannel !== 'All Channels' && template.channel !== filterChannel) {
      return false
    }
    
    // Filter by search query
    if (searchQuery && 
        !template.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !template.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    return true
  })

  // Paginate templates
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleSaveTemplate = () => {
    const today = new Date()
    const lastUsed = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    
    if (editingTemplate) {
      // Update existing template
      const updatedTemplates = initialTemplates.map(t => 
        t.id === editingTemplate.id ? 
        { ...t, ...newTemplate, lastUsed, usage: t.usage + 1 } : 
        t
      )
      setTemplates(updatedTemplates)
      initialTemplates = updatedTemplates
    } else {
      // Add new template
      const newId = Math.max(...initialTemplates.map(t => t.id)) + 1
      const templateToAdd = {
        id: newId,
        ...newTemplate,
        lastUsed,
        usage: 0
      }
      initialTemplates.unshift(templateToAdd)
      setTemplates([...initialTemplates])
    }
    
    setShowTemplateForm(false)
    setEditingTemplate(null)
    setNewTemplate({
      name: '',
      channel: 'Email',
      content: ''
    })
  }

  const handleEdit = (template) => {
    setEditingTemplate(template)
    setNewTemplate({
      name: template.name,
      channel: template.channel,
      content: template.content
    })
    setShowTemplateForm(true)
  }

  const handleDuplicate = (template) => {
    const today = new Date()
    const lastUsed = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const newId = Math.max(...initialTemplates.map(t => t.id)) + 1
    
    const duplicatedTemplate = {
      ...template,
      id: newId,
      name: `${template.name} (Copy)`,
      lastUsed,
      usage: 0
    }
    
    initialTemplates.unshift(duplicatedTemplate)
    setTemplates([...initialTemplates])
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Marketing Templates</h1>
        <button 
          onClick={() => {
            setEditingTemplate(null)
            setShowTemplateForm(true)
          }}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
        >
          New Template
        </button>
      </motion.div>

      {showTemplateForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingTemplate ? 'Edit Template' : 'Create New Template'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
              <input
                type="text"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                placeholder="e.g. Welcome Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Channel</label>
              <select
                value={newTemplate.channel}
                onChange={(e) => setNewTemplate({...newTemplate, channel: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="SMS">SMS</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={newTemplate.content}
                onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                placeholder="Enter your template content here..."
                rows="6"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  setShowTemplateForm(false)
                  setEditingTemplate(null)
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setPreviewTemplate(newTemplate)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Preview
              </button>
              <button
                onClick={handleSaveTemplate}
                disabled={!newTemplate.name || !newTemplate.content}
                className={`px-4 py-2 bg-primary text-white rounded-md ${!newTemplate.name || !newTemplate.content ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryDark'}`}
              >
                {editingTemplate ? 'Update Template' : 'Save Template'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {previewTemplate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setPreviewTemplate(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Template Preview</h2>
            <div className="mb-4">
              <p className="font-medium">Channel: {previewTemplate.channel}</p>
              <p className="text-gray-600">{previewTemplate.name}</p>
            </div>
            <div className="border rounded-md p-4 bg-gray-50">
              <p className="whitespace-pre-line">{previewTemplate.content}</p>
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
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
              value={filterChannel}
              onChange={(e) => {
                setFilterChannel(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All Channels">All Channels</option>
              <option value="Email">Email</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="SMS">SMS</option>
            </select>
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTemplates.length > 0 ? (
                paginatedTemplates.map((template) => (
                  <tr key={template.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{template.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getChannelIcon(template.channel)}
                        <span className="ml-2">{template.channel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{template.lastUsed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{template.usage.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(template)}
                        className="text-primary hover:text-primaryDark mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDuplicate(template)}
                        className="text-gray-600 hover:text-gray-800 mr-3"
                      >
                        Duplicate
                      </button>
                      <button 
                        onClick={() => setPreviewTemplate(template)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No templates found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredTemplates.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTemplates.length)} of {filteredTemplates.length} entries
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                  >
                    {page}
                  </button>
                )
              })}
              
              {totalPages > 3 && currentPage > 3 && (
                <span className="px-3 py-1">...</span>
              )}
              
              {totalPages > 3 && currentPage > 3 && currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage)}
                  className="px-3 py-1 border rounded-md bg-primary text-white"
                >
                  {currentPage}
                </button>
              )}
              
              {totalPages > 3 && currentPage < totalPages - 2 && (
                <span className="px-3 py-1">...</span>
              )}
              
              {totalPages > 3 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                >
                  {totalPages}
                </button>
              )}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
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



export default Templates