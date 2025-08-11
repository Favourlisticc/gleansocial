import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ArrowsRightLeftIcon, 
  CalendarIcon, 
  ChartBarIcon,
  PlusIcon,
  PauseIcon,
  PlayIcon,
  CogIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

const initialWorkflows = [
  { 
    id: 1, 
    name: 'Abandoned Cart', 
    trigger: 'Cart abandoned for 1 hour', 
    actions: ['Email reminder', 'SMS follow-up'], 
    status: 'Active', 
    conversions: 245,
    lastRun: 'Jul 20, 2023',
    description: 'Recover abandoned carts with automated follow-ups'
  },
  { 
    id: 2, 
    name: 'Welcome Series', 
    trigger: 'New customer signup', 
    actions: ['Welcome email', 'Onboarding guide'], 
    status: 'Active', 
    conversions: 187,
    lastRun: 'Jul 18, 2023',
    description: 'Onboard new customers with a welcome sequence'
  },
  { 
    id: 3, 
    name: 'Re-engagement', 
    trigger: 'No activity for 30 days', 
    actions: ['Special offer', 'Feedback request'], 
    status: 'Paused', 
    conversions: 92,
    lastRun: 'Jul 15, 2023',
    description: 'Win back inactive customers with targeted offers'
  },
  { 
    id: 4, 
    name: 'Upsell', 
    trigger: 'Purchase completed', 
    actions: ['Related products', 'Premium offer'], 
    status: 'Draft', 
    conversions: 0,
    lastRun: 'Never',
    description: 'Increase order value with strategic upsells'
  },
  { 
    id: 5, 
    name: 'Birthday', 
    trigger: 'Customer birthday', 
    actions: ['Birthday coupon', 'Personalized message'], 
    status: 'Active', 
    conversions: 78,
    lastRun: 'Jul 10, 2023',
    description: 'Celebrate customer birthdays with special offers'
  },
  { 
    id: 6, 
    name: 'Post-Purchase', 
    trigger: 'Order delivered', 
    actions: ['Thank you email', 'Review request'], 
    status: 'Active', 
    conversions: 132,
    lastRun: 'Jul 5, 2023',
    description: 'Follow up after purchase to encourage reviews'
  }
]

const Workflows = () => {
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [showForm, setShowForm] = useState(false)
  const [currentWorkflow, setCurrentWorkflow] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    trigger: '',
    actions: [],
    status: 'Draft',
    description: ''
  })
  const [newAction, setNewAction] = useState('')
  const [filterStatus, setFilterStatus] = useState('All Statuses')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [workflowToDelete, setWorkflowToDelete] = useState(null)

  const itemsPerPage = 4
  const totalWorkflows = workflows.length

  // Filter workflows
  const filteredWorkflows = workflows.filter(workflow => {
    const matchesStatus = filterStatus === 'All Statuses' || workflow.status === filterStatus
    const matchesSearch = searchQuery === '' || 
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Paginate workflows
  const paginatedWorkflows = filteredWorkflows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredWorkflows.length / itemsPerPage)

  const handleStatusToggle = (id) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === id) {
        const newStatus = workflow.status === 'Active' ? 'Paused' : 'Active'
        const lastRun = newStatus === 'Active' && workflow.status === 'Draft' ? 
          new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 
          workflow.lastRun
        return { ...workflow, status: newStatus, lastRun }
      }
      return workflow
    }))
  }

  const handleAddAction = () => {
    if (newAction.trim()) {
      setFormData({
        ...formData,
        actions: [...formData.actions, newAction.trim()]
      })
      setNewAction('')
    }
  }

  const handleRemoveAction = (index) => {
    const updatedActions = [...formData.actions]
    updatedActions.splice(index, 1)
    setFormData({
      ...formData,
      actions: updatedActions
    })
  }

  const handleCreateWorkflow = () => {
    const newWorkflow = {
      id: Math.max(...workflows.map(w => w.id)) + 1,
      ...formData,
      conversions: 0,
      lastRun: formData.status === 'Active' ? 
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 
        'Never'
    }
    setWorkflows([newWorkflow, ...workflows])
    setShowForm(false)
    resetForm()
  }

  const handleUpdateWorkflow = () => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === currentWorkflow.id) {
        const lastRun = formData.status === 'Active' && workflow.status === 'Draft' ? 
          new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 
          workflow.lastRun
        return { ...workflow, ...formData, lastRun }
      }
      return workflow
    }))
    setShowForm(false)
    resetForm()
  }

  const handleDeleteWorkflow = () => {
    setWorkflows(workflows.filter(w => w.id !== workflowToDelete.id))
    setShowDeleteModal(false)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      trigger: '',
      actions: [],
      status: 'Draft',
      description: ''
    })
    setCurrentWorkflow(null)
    setNewAction('')
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openEditForm = (workflow) => {
    setCurrentWorkflow(workflow)
    setFormData({
      name: workflow.name,
      trigger: workflow.trigger,
      actions: [...workflow.actions],
      status: workflow.status,
      description: workflow.description
    })
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Automation Workflows</h1>
        <button 
          onClick={() => {
            setCurrentWorkflow(null)
            setShowForm(true)
          }}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          <span>New Workflow</span>
        </button>
      </motion.div>

      {/* Workflow Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            {currentWorkflow ? 'Edit Workflow' : 'Create New Workflow'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Name*</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. Abandoned Cart Recovery"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trigger*</label>
              <input
                type="text"
                value={formData.trigger}
                onChange={(e) => setFormData({...formData, trigger: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="When this happens..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe what this workflow does..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Actions*</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddAction()}
                  className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add an action..."
                />
                <button
                  onClick={handleAddAction}
                  className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primaryDark"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.actions.map((action, index) => (
                  <div key={index} className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                    <span className="text-sm">{action}</span>
                    <button 
                      onClick={() => handleRemoveAction(index)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={currentWorkflow ? handleUpdateWorkflow : handleCreateWorkflow}
                disabled={!formData.name || !formData.trigger || formData.actions.length === 0}
                className={`px-4 py-2 bg-primary text-white rounded-md ${
                  !formData.name || !formData.trigger || formData.actions.length === 0 ? 
                  'opacity-50 cursor-not-allowed' : 'hover:bg-primaryDark'
                }`}
              >
                {currentWorkflow ? 'Update Workflow' : 'Create Workflow'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Delete Workflow</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{workflowToDelete.name}"? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteWorkflow}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Workflows List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
          <input 
            type="text" 
            placeholder="Search workflows..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary flex-1"
          />
          <select 
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {paginatedWorkflows.length > 0 ? (
          <div className="space-y-4">
            {paginatedWorkflows.map((workflow) => (
              <motion.div
                key={workflow.id}
                whileHover={{ scale: 1.01 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <ArrowsRightLeftIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{workflow.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>Last run: {workflow.lastRun}</span>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            workflow.status === 'Active' ? 'bg-green-100 text-green-800' :
                            workflow.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {workflow.status}
                          </span>
                        </div>
                        
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Trigger:</h4>
                          <p className="text-sm text-gray-600">{workflow.trigger}</p>
                        </div>
                        
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Actions:</h4>
                          <div className="flex flex-wrap gap-2">
                            {workflow.actions.map((action, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                {action}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center text-sm font-medium text-gray-600">
                      <ChartBarIcon className="h-4 w-4 mr-1" />
                      <span>{workflow.conversions.toLocaleString()} conversions</span>
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => {
                          setWorkflowToDelete(workflow)
                          setShowDeleteModal(true)
                        }}
                        className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleStatusToggle(workflow.id)}
                        className={`p-2 rounded-full ${
                          workflow.status === 'Active' ? 
                          'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50' :
                          'text-green-600 hover:text-green-800 hover:bg-green-50'
                        }`}
                        title={workflow.status === 'Active' ? 'Pause' : 'Activate'}
                      >
                        {workflow.status === 'Active' ? (
                          <PauseIcon className="h-5 w-5" />
                        ) : (
                          <PlayIcon className="h-5 w-5" />
                        )}
                      </button>
                      <button 
                        onClick={() => openEditForm(workflow)}
                        className="p-2 text-primary hover:text-primaryDark rounded-full hover:bg-primary/10"
                        title="Edit"
                      >
                        <CogIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No workflows found matching your criteria</p>
            <button 
              onClick={() => {
                setFilterStatus('All Statuses')
                setSearchQuery('')
              }}
              className="mt-4 px-4 py-2 text-primary hover:text-primaryDark"
            >
              Clear filters
            </button>
          </div>
        )}

        {filteredWorkflows.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-4 border-t gap-4">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredWorkflows.length)} of{' '}
              {filteredWorkflows.length} entries
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md flex items-center ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                <span>Previous</span>
              </button>
              
              {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === page ? 'bg-primary text-white' : 'hover:bg-gray-50'
                    }`}
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
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === totalPages ? 'bg-primary text-white' : 'hover:bg-gray-50'
                  }`}
                >
                  {totalPages}
                </button>
              )}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-md flex items-center ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <span>Next</span>
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Workflows