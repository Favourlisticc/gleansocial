import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Leads from './pages/crmm/Leads'
import Customers from './pages/crmm/Customers'
import Interactions from './pages/crmm/Interactions'
import Campaigns from './pages/Marketing'
import Templates from './pages/market/Templates'
import Segments from './pages/market/Segments'
import Chatbots from './pages/Sales/Chatbots'
import Workflows from './pages/Sales/Workflows'
import Pipeline from './pages/Sales/Pipeline'
import AnalyticsOverview from './pages/Analytics/Insights'
import Reports from './pages/Analytics/Reports'
import Insights from './pages/Analytics/Insights'
import AdCampaigns from './pages/Advertising/Campaigns'
import Creatives from './pages/Advertising/Creatives'
import Performance from './pages/Advertising/Performance'
import Profile from './pages/settings/Profile'
import Billing from './pages/settings/Billing'
import Integrations from './pages/settings/Integrations'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              
              {/* CRM Routes */}
              <Route path="/crm/leads" element={<Leads />} />
              <Route path="/crm/customers" element={<Customers />} />
              <Route path="/crm/interactions" element={<Interactions />} />
              
              {/* Marketing Routes */}
              <Route path="/marketing/campaigns" element={<Campaigns />} />
              <Route path="/marketing/templates" element={<Templates />} />
              <Route path="/marketing/segments" element={<Segments />} />
              
              {/* Sales Routes */}
              <Route path="/sales/chatbots" element={<Chatbots />} />
              <Route path="/sales/workflows" element={<Workflows />} />
              <Route path="/sales/pipeline" element={<Pipeline />} />
              
              {/* Analytics Routes */}
              <Route path="/analytics/overview" element={<AnalyticsOverview />} />
              <Route path="/analytics/reports" element={<Reports />} />
              <Route path="/analytics/insights" element={<Insights />} />
              
              {/* Advertising Routes */}
              <Route path="/advertising/campaigns" element={<AdCampaigns />} />
              <Route path="/advertising/creatives" element={<Creatives />} />
              <Route path="/advertising/performance" element={<Performance />} />
              
              {/* Settings Routes */}
              <Route path="/settings/profile" element={<Profile />} />
              <Route path="/settings/billing" element={<Billing />} />
              <Route path="/settings/integrations" element={<Integrations />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App