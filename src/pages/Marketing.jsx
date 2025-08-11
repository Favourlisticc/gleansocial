import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

// Sample campaign data
const initialCampaigns = [
  { 
    id: 1, 
    name: 'Summer Sale', 
    status: 'Active', 
    type: 'Email', 
    audience: 'All Customers', 
    sent: 1250, 
    opened: 450, 
    clicked: 180, 
    conversions: 24,
    lastUpdated: '2023-06-15',
    startDate: '2023-06-01',
    endDate: '2023-06-30',
    budget: 5000
  },
  { 
    id: 2, 
    name: 'New Product Launch', 
    status: 'Scheduled', 
    type: 'WhatsApp', 
    audience: 'Previous Buyers', 
    sent: 0, 
    opened: 0, 
    clicked: 0, 
    conversions: 0,
    lastUpdated: '2023-06-14',
    startDate: '2023-07-01',
    endDate: '2023-07-15',
    budget: 7500
  },
  { 
    id: 3, 
    name: 'Abandoned Cart Recovery', 
    status: 'Active', 
    type: 'WhatsApp', 
    audience: 'Cart Abandoners', 
    sent: 89, 
    opened: 72, 
    clicked: 45, 
    conversions: 18,
    lastUpdated: '2023-06-13',
    startDate: '2023-06-10',
    endDate: '2023-06-20',
    budget: 2000
  },
  { 
    id: 4, 
    name: 'Customer Feedback Survey', 
    status: 'Draft', 
    type: 'SMS', 
    audience: 'Recent Customers', 
    sent: 0, 
    opened: 0, 
    clicked: 0, 
    conversions: 0,
    lastUpdated: '2023-06-12',
    startDate: '',
    endDate: '',
    budget: 1000
  },
  { 
    id: 5, 
    name: 'Loyalty Program', 
    status: 'Active', 
    type: 'Email', 
    audience: 'VIP Customers', 
    sent: 245, 
    opened: 180, 
    clicked: 95, 
    conversions: 35,
    lastUpdated: '2023-06-10',
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    budget: 10000
  },
];

// Sample AI content suggestions
const initialContentSuggestions = [
  { id: 1, type: 'Email Subject', content: 'Don\'t miss out on our biggest sale of the year! 🔥', useCase: 'Summer Sale' },
  { id: 2, type: 'WhatsApp Message', content: 'Hi {name}! We noticed you left some items in your cart. Need help completing your purchase?', useCase: 'Cart Recovery' },
  { id: 3, type: 'Email Body', content: 'Introducing our newest product line designed specifically for your needs...', useCase: 'Product Launch' },
  { id: 4, type: 'SMS', content: 'Your feedback matters! Take our 2-min survey and get 15% off your next purchase: {link}', useCase: 'Customer Survey' },
];

const Marketing = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [contentSuggestions, setContentSuggestions] = useState(initialContentSuggestions);
  const [activeTab, setActiveTab] = useState('campaigns');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    status: 'Draft',
    type: 'Email',
    audience: 'All Customers',
    startDate: '',
    endDate: '',
    budget: 0
  });
  const [contentForm, setContentForm] = useState({
    contentType: 'Email Subject Line',
    purpose: 'Promotional',
    tone: 'Professional',
    instructions: ''
  });
  const [generatingContent, setGeneratingContent] = useState(false);

  // Filter campaigns based on status and search term
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = filterStatus === 'All' || campaign.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      campaign.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.audience.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Handle campaign form input changes
  const handleCampaignInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCampaign) {
      setEditingCampaign({ ...editingCampaign, [name]: value });
    } else {
      setNewCampaign({ ...newCampaign, [name]: value });
    }
  };

  // Handle content form input changes
  const handleContentInputChange = (e) => {
    const { name, value } = e.target;
    setContentForm({ ...contentForm, [name]: value });
  };

  // Create a new campaign
  const handleCreateCampaign = () => {
    const newId = Math.max(...campaigns.map(c => c.id), 0) + 1;
    const now = new Date().toISOString().split('T')[0];
    
    setCampaigns([...campaigns, {
      ...newCampaign,
      id: newId,
      sent: 0,
      opened: 0,
      clicked: 0,
      conversions: 0,
      lastUpdated: now
    }]);
    
    setNewCampaign({
      name: '',
      status: 'Draft',
      type: 'Email',
      audience: 'All Customers',
      startDate: '',
      endDate: '',
      budget: 0
    });
    setShowCampaignModal(false);
  };

  // Update an existing campaign
  const handleUpdateCampaign = () => {
    if (editingCampaign) {
      const now = new Date().toISOString().split('T')[0];
      setCampaigns(campaigns.map(c => 
        c.id === editingCampaign.id ? { ...editingCampaign, lastUpdated: now } : c
      ));
      setEditingCampaign(null);
      setShowCampaignModal(false);
    }
  };

  // Delete a campaign
  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    setShowDeleteConfirm(null);
  };

  // Duplicate a campaign
  const handleDuplicateCampaign = (campaign) => {
    const newId = Math.max(...campaigns.map(c => c.id), 0) + 1;
    const now = new Date().toISOString().split('T')[0];
    
    setCampaigns([...campaigns, {
      ...campaign,
      id: newId,
      name: `${campaign.name} (Copy)`,
      status: 'Draft',
      sent: 0,
      opened: 0,
      clicked: 0,
      conversions: 0,
      lastUpdated: now
    }]);
  };

  // Generate new content suggestions
  const generateContent = () => {
    setGeneratingContent(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newSuggestions = [
        ...contentSuggestions,
        {
          id: contentSuggestions.length + 1,
          type: contentForm.contentType,
          content: `New ${contentForm.tone.toLowerCase()} ${contentForm.purpose.toLowerCase()} content suggestion`,
          useCase: contentForm.purpose
        }
      ];
      
      setContentSuggestions(newSuggestions);
      setGeneratingContent(false);
    }, 1500);
  };

  // Calculate statistics
  const calculateStats = () => {
    const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
    const messagesSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
    const totalOpened = campaigns.reduce((sum, c) => sum + c.opened, 0);
    const openRate = messagesSent > 0 ? Math.round((totalOpened / messagesSent) * 100) : 0;
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const conversionRate = messagesSent > 0 ? (totalConversions / messagesSent * 100).toFixed(1) : 0;
    
    return [
      { title: 'Active Campaigns', value: activeCampaigns, icon: '🚀' },
      { title: 'Messages Sent', value: messagesSent.toLocaleString(), icon: '📨' },
      { title: 'Open Rate', value: `${openRate}%`, icon: '👁️' },
      { title: 'Conversion Rate', value: `${conversionRate}%`, icon: '💰' },
    ];
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Marketing & Campaigns</h1>
          {activeTab === 'campaigns' && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingCampaign(null);
                setShowCampaignModal(true);
              }}
              className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Create Campaign
            </motion.button>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow p-4"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'campaigns', icon: <EnvelopeIcon className="h-5 w-5 mr-2" /> },
              { id: 'audience', icon: <UserGroupIcon className="h-5 w-5 mr-2" /> },
              { id: 'content', icon: <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-2" /> },
              { id: 'analytics', icon: <ChartBarIcon className="h-5 w-5 mr-2" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize flex items-center`}
              >
                {tab.icon}
                {tab.id}
              </button>
            ))}
          </nav>
        </div>

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="appearance-none block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Draft">Draft</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDownIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCampaigns.length > 0 ? (
                    filteredCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {campaign.startDate && campaign.endDate ? 
                              `${campaign.startDate} - ${campaign.endDate}` : 
                              'No dates set'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {campaign.type === 'Email' && <EnvelopeIcon className="h-4 w-4 mr-1 text-gray-500" />}
                            {campaign.type === 'WhatsApp' && <ChatBubbleBottomCenterTextIcon className="h-4 w-4 mr-1 text-gray-500" />}
                            {campaign.type === 'SMS' && <DevicePhoneMobileIcon className="h-4 w-4 mr-1 text-gray-500" />}
                            <span className="text-sm text-gray-500">{campaign.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.audience}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 
                              campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                              campaign.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                              'bg-yellow-100 text-yellow-800'}`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {campaign.status === 'Draft' || campaign.status === 'Scheduled' ? (
                            <span className="text-sm text-gray-500">Not started</span>
                          ) : (
                            <div className="text-sm">
                              <div>Sent: {campaign.sent}</div>
                              <div>Opens: {Math.round((campaign.opened / campaign.sent) * 100)}%</div>
                              <div>Clicks: {Math.round((campaign.clicked / campaign.sent) * 100)}%</div>
                              <div>Conversions: {campaign.conversions}</div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => {
                              setEditingCampaign(campaign);
                              setShowCampaignModal(true);
                            }}
                            className="text-primary hover:text-primary-dark mr-3 flex items-center"
                          >
                            <PencilIcon className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDuplicateCampaign(campaign)}
                            className="text-gray-600 hover:text-gray-900 mr-3 flex items-center"
                          >
                            <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                            Duplicate
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(campaign.id)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                        No campaigns found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white shadow rounded-lg p-6"
              >
                <h2 className="text-lg font-semibold mb-4">AI Content Suggestions</h2>
                <div className="space-y-4">
                  {contentSuggestions.map((suggestion) => (
                    <motion.div 
                      key={suggestion.id}
                      whileHover={{ scale: 1.01 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block bg-primary bg-opacity-10 text-primary px-2 py-1 rounded text-xs font-medium mb-2">
                            {suggestion.type}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">For: {suggestion.useCase}</span>
                          <p className="text-gray-800 mt-1">{suggestion.content}</p>
                        </div>
                        <button className="text-primary hover:text-primary-dark text-sm flex items-center">
                          <SparklesIcon className="h-4 w-4 mr-1" />
                          Use
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4">
                  <button 
                    onClick={() => setContentSuggestions([...contentSuggestions, ...initialContentSuggestions])}
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                  >
                    <ArrowPathIcon className="h-5 w-5 mr-2" />
                    Load More Suggestions
                  </button>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white shadow rounded-lg p-6"
              >
                <h2 className="text-lg font-semibold mb-4">Create Custom Content</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                    <select
                      name="contentType"
                      value={contentForm.contentType}
                      onChange={handleContentInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                      <option>Email Subject Line</option>
                      <option>Email Body</option>
                      <option>WhatsApp Message</option>
                      <option>SMS</option>
                      <option>Social Media Post</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Purpose</label>
                    <select
                      name="purpose"
                      value={contentForm.purpose}
                      onChange={handleContentInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                      <option>Promotional</option>
                      <option>Informational</option>
                      <option>Welcome Series</option>
                      <option>Cart Recovery</option>
                      <option>Re-engagement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                    <select
                      name="tone"
                      value={contentForm.tone}
                      onChange={handleContentInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                      <option>Professional</option>
                      <option>Friendly</option>
                      <option>Casual</option>
                      <option>Urgent</option>
                      <option>Humorous</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Instructions (Optional)</label>
                    <textarea
                      name="instructions"
                      rows={3}
                      value={contentForm.instructions}
                      onChange={handleContentInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                      placeholder="Any specific details to include..."
                    ></textarea>
                  </div>
                  <button 
                    onClick={generateContent}
                    disabled={generatingContent}
                    className={`w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 flex items-center justify-center ${
                      generatingContent ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {generatingContent ? (
                      <>
                        <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Generate Content
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Audience Tab */}
        {activeTab === 'audience' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white shadow rounded-lg p-6"
          >
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Audience Segmentation</h3>
              <p className="mt-2 text-gray-500">This feature is currently in development</p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <UserGroupIcon className="h-10 w-10 mx-auto text-primary" />
                  <h4 className="mt-2 font-medium">Customer Segments</h4>
                  <p className="text-sm text-gray-500 mt-1">Coming soon</p>
                </div>
                <div className="border rounded-lg p-4">
                  <ChartBarIcon className="h-10 w-10 mx-auto text-primary" />
                  <h4 className="mt-2 font-medium">Behavioral Groups</h4>
                  <p className="text-sm text-gray-500 mt-1">Coming soon</p>
                </div>
                <div className="border rounded-lg p-4">
                  <SparklesIcon className="h-10 w-10 mx-auto text-primary" />
                  <h4 className="mt-2 font-medium">AI Recommendations</h4>
                  <p className="text-sm text-gray-500 mt-1">Coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white shadow rounded-lg p-6"
          >
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Campaign Analytics</h3>
              <p className="mt-2 text-gray-500">This feature is coming soon</p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <ChartBarIcon className="h-10 w-10 mx-auto text-primary" />
                  <h4 className="mt-2 font-medium">Performance Metrics</h4>
                  <p className="text-sm text-gray-500 mt-1">Coming soon</p>
                </div>
                <div className="border rounded-lg p-4">
                  <SparklesIcon className="h-10 w-10 mx-auto text-primary" />
                  <h4 className="mt-2 font-medium">AI Insights</h4>
                  <p className="text-sm text-gray-500 mt-1">Coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Campaign Modal */}
      {(showCampaignModal && !editingCampaign) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl"
          >
            <h2 className="text-xl font-bold mb-4">Create New Campaign</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCampaign.name}
                    onChange={handleCampaignInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                  <select
                    name="type"
                    value={newCampaign.type}
                    onChange={handleCampaignInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={newCampaign.status}
                    onChange={handleCampaignInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Active">Active</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                  <select
                    name="audience"
                    value={newCampaign.audience}
                    onChange={handleCampaignInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="All Customers">All Customers</option>
                    <option value="Previous Buyers">Previous Buyers</option>
                    <option value="VIP Customers">VIP Customers</option>
                    <option value="Cart Abandoners">Cart Abandoners</option>
                    <option value="Recent Customers">Recent Customers</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newCampaign.startDate}
                      onChange={handleCampaignInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newCampaign.endDate}
                      onChange={handleCampaignInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    name="budget"
                    value={newCampaign.budget}
                    onChange={handleCampaignInputChange}
                    min="0"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCampaignModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Create Campaign
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {(showCampaignModal && editingCampaign) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl"
          >
            <h2 className="text-xl font-bold mb-4">Edit Campaign</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingCampaign.name}
                    onChange={handleCampaignInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                  <select
                    name="type"
                    value={editingCampaign.type}
                    onChange={handleCampaignInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={editingCampaign.status}
                    onChange={handleCampaignInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                  <select
                    name="audience"
                    value={editingCampaign.audience}
                    onChange={handleCampaignInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="All Customers">All Customers</option>
                    <option value="Previous Buyers">Previous Buyers</option>
                    <option value="VIP Customers">VIP Customers</option>
                    <option value="Cart Abandoners">Cart Abandoners</option>
                    <option value="Recent Customers">Recent Customers</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={editingCampaign.startDate}
                      onChange={handleCampaignInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={editingCampaign.endDate}
                      onChange={handleCampaignInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    name="budget"
                    value={editingCampaign.budget}
                    onChange={handleCampaignInputChange}
                    min="0"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCampaignModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCampaign}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this campaign? This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCampaign(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete Campaign
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Marketing;