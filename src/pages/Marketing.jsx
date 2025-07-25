import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
    lastUpdated: '2023-06-15' 
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
    lastUpdated: '2023-06-14' 
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
    lastUpdated: '2023-06-13' 
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
    lastUpdated: '2023-06-12' 
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
    lastUpdated: '2023-06-10' 
  },
];

// Sample AI content suggestions
const contentSuggestions = [
  { id: 1, type: 'Email Subject', content: 'Don\'t miss out on our biggest sale of the year! 🔥', useCase: 'Summer Sale' },
  { id: 2, type: 'WhatsApp Message', content: 'Hi {name}! We noticed you left some items in your cart. Need help completing your purchase?', useCase: 'Cart Recovery' },
  { id: 3, type: 'Email Body', content: 'Introducing our newest product line designed specifically for your needs...', useCase: 'Product Launch' },
  { id: 4, type: 'SMS', content: 'Your feedback matters! Take our 2-min survey and get 15% off your next purchase: {link}', useCase: 'Customer Survey' },
];

const Marketing = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [activeTab, setActiveTab] = useState('campaigns');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredCampaigns = filterStatus === 'All' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.status === filterStatus);

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Marketing & Campaigns</h1>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-lg"
          >
            + Create Campaign
          </motion.button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: 'Active Campaigns', value: '8', icon: '🚀' },
            { title: 'Messages Sent', value: '24,568', icon: '📨' },
            { title: 'Open Rate', value: '32%', icon: '👁️' },
            { title: 'Conversion Rate', value: '4.7%', icon: '💰' },
          ].map((stat, index) => (
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
            {['campaigns', 'audience', 'content', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
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
                  <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                  <select
                    id="status-filter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Draft">Draft</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search campaigns..."
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
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
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.type}
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
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark mr-3">Edit</button>
                        <button className="text-gray-600 hover:text-gray-900 mr-3">Duplicate</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
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
                          <p className="text-gray-800">{suggestion.content}</p>
                        </div>
                        <button className="text-primary hover:text-primary-dark text-sm">Use</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 hover:bg-gray-50">
                    Generate More Suggestions
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
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                      <option>Email Subject Line</option>
                      <option>Email Body</option>
                      <option>WhatsApp Message</option>
                      <option>SMS</option>
                      <option>Social Media Post</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Purpose</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                      <option>Promotional</option>
                      <option>Informational</option>
                      <option>Welcome Series</option>
                      <option>Cart Recovery</option>
                      <option>Re-engagement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
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
                      rows={3}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                      placeholder="Any specific details to include..."
                    ></textarea>
                  </div>
                  <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90">
                    Generate Content
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab === 'audience' && (
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-center text-lg text-gray-500">Audience segmentation coming soon</p>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-center text-lg text-gray-500">Campaign analytics coming soon</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Marketing;