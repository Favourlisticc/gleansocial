import { motion } from 'framer-motion'
import { DocumentTextIcon, ChartBarIcon, CalendarIcon, ArrowDownTrayIcon, ShareIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const Reports = () => {
  // Initial static data with state management
  const [reports, setReports] = useState([
    { id: 1, name: 'Monthly Sales Report', type: 'Sales', date: 'Jul 1, 2023', downloads: 45, starred: true },
    { id: 2, name: 'Campaign Performance Q2', type: 'Marketing', date: 'Jun 30, 2023', downloads: 32, starred: false },
    { id: 3, name: 'Customer Acquisition', type: 'CRM', date: 'Jun 15, 2023', downloads: 28, starred: true },
    { id: 4, name: 'Website Traffic Analysis', type: 'Web', date: 'Jun 10, 2023', downloads: 19, starred: false },
    { id: 5, name: 'Product Performance', type: 'Sales', date: 'May 28, 2023', downloads: 22, starred: false },
    { id: 6, name: 'Social Media Engagement', type: 'Marketing', date: 'May 15, 2023', downloads: 18, starred: false },
    { id: 7, name: 'Customer Retention', type: 'CRM', date: 'May 5, 2023', downloads: 15, starred: false },
    { id: 8, name: 'SEO Performance', type: 'Web', date: 'Apr 30, 2023', downloads: 27, starred: true },
  ])

  const [typeFilter, setTypeFilter] = useState('All Types')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [newReport, setNewReport] = useState({
    name: '',
    type: 'Sales',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  })

  // Constants
  const itemsPerPage = 4
  const totalPages = Math.ceil(reports.length / itemsPerPage)

  // Calculate metrics
  const totalReports = reports.length
  const avgDownloads = Math.round(reports.reduce((sum, report) => sum + report.downloads, 0) / reports.length)
  const lastGenerated = reports[0]?.date
  const mostPopular = reports.reduce((prev, current) => (prev.downloads > current.downloads) ? prev : current).name

  // Filter and paginate reports
  const filteredReports = reports.filter(report => {
    const matchesType = typeFilter === 'All Types' || report.type === typeFilter
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handler functions
  const handleGenerateReport = () => {
    if (showGenerateModal) {
      // Validate form
      if (!newReport.name) {
        alert('Please enter a report name')
        return
      }

      // Create new report
      const newId = Math.max(...reports.map(r => r.id)) + 1
      const reportToAdd = {
        ...newReport,
        id: newId,
        downloads: 0,
        starred: false
      }

      setReports([reportToAdd, ...reports])
      setShowGenerateModal(false)
      setNewReport({
        name: '',
        type: 'Sales',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      })
      alert('Report generated successfully!')
    } else {
      setShowGenerateModal(true)
    }
  }

  const handleDownload = (id) => {
    const report = reports.find(r => r.id === id)
    alert(`Downloading report: ${report?.name}`)
    // Increment download count
    setReports(reports.map(r => 
      r.id === id ? { ...r, downloads: r.downloads + 1 } : r
    ))
  }

  const handleShare = (id) => {
    const report = reports.find(r => r.id === id)
    alert(`Sharing report: ${report?.name}`)
  }

  const handleStar = (id) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, starred: !report.starred } : report
    ))
  }

  const handleDelete = (id) => {
    if (('Are you sure you want to delete this report?')) {
      setReports(reports.filter(report => report.id !== id))
      alert('Report deleted successfully!')
    }
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
        <h1 className="text-2xl font-bold text-gray-800">Analytics Reports</h1>
        <button 
          onClick={handleGenerateReport}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          {showGenerateModal ? 'Generate Now' : 'Generate Report'}
        </button>
      </motion.div>

      {showGenerateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Generate New Report</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Name*</label>
              <input
                type="text"
                value={newReport.name}
                onChange={(e) => setNewReport({...newReport, name: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="e.g. Monthly Sales Report"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type*</label>
              <select
                value={newReport.type}
                onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="CRM">CRM</option>
                <option value="Web">Web</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowGenerateModal(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateReport}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
            >
              Generate Report
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
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Types</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>CRM</option>
              <option>Web</option>
            </select>
            <input 
              type="text" 
              placeholder="Search reports..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-primary" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Reports</p>
                <p className="text-xl font-semibold">{totalReports}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg. Downloads</p>
                <p className="text-xl font-semibold">{avgDownloads}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center">
              <CalendarIcon className="h-6 w-6 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Last Generated</p>
                <p className="text-xl font-semibold">{lastGenerated}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <div className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Most Popular</p>
                <p className="text-xl font-semibold">{mostPopular}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedReports.length > 0 ? (
                paginatedReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleStar(report.id)}>
                        {report.starred ? (
                          <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{report.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{report.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{report.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{report.downloads}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button 
                        onClick={() => handleDownload(report.id)}
                        className="text-primary hover:text-primaryDark flex items-center"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        Download
                      </button>
                      <button 
                        onClick={() => handleShare(report.id)}
                        className="text-gray-600 hover:text-gray-800 flex items-center"
                      >
                        <ShareIcon className="h-4 w-4 mr-1" />
                        Share
                      </button>
                      <button 
                        onClick={() => handleDelete(report.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No reports found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredReports.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredReports.length)} of {filteredReports.length} entries
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

export default Reports