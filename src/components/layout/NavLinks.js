import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  UsersIcon, 
  EnvelopeIcon, 
  ShoppingCartIcon, 
  ChartPieIcon, 
  MegaphoneIcon, 
  CogIcon 
} from '@heroicons/react/24/outline'

const navItems = [
  { 
    name: 'Dashboard', 
    icon: ChartBarIcon, 
    path: '/',
    subItems: []
  },
  { 
    name: 'CRM', 
    icon: UsersIcon,
    path: '/crm/leads',
    subItems: [
      { name: 'Leads', path: '/crm/leads' },
      { name: 'Customers', path: '/crm/customers' },
      { name: 'Interactions', path: '/crm/interactions' }
    ]
  },
  { 
    name: 'Marketing', 
    icon: EnvelopeIcon, 
    path: '/marketing/campaigns',
    subItems: [
      { name: 'Campaigns', path: '/marketing/campaigns' },
      { name: 'Templates', path: '/marketing/templates' },
      { name: 'Segments', path: '/marketing/segments' }
    ]
  },
  { 
    name: 'Sales', 
    icon: ShoppingCartIcon, 
    path: '/sales/chatbots',
    subItems: [
      { name: 'Chatbots', path: '/sales/chatbots' },
      { name: 'Workflows', path: '/sales/workflows' },
      { name: 'Pipeline', path: '/sales/pipeline' }
    ]
  },
  { 
    name: 'Analytics', 
    icon: ChartPieIcon, 
    path: '/analytics/overview',
    subItems: [
      { name: 'Overview', path: '/analytics/overview' },
      { name: 'Reports', path: '/analytics/reports' },
      { name: 'Insights', path: '/analytics/insights' }
    ]
  },
  { 
    name: 'Advertising', 
    icon: MegaphoneIcon, 
    path: '/advertising/campaigns',
    subItems: [
      { name: 'Campaigns', path: '/advertising/campaigns' },
      { name: 'Creatives', path: '/advertising/creatives' },
      { name: 'Performance', path: '/advertising/performance' }
    ]
  },
  { 
    name: 'Settings', 
    icon: CogIcon, 
    path: '/settings/profile',
    subItems: [
      { name: 'Profile', path: '/settings/profile' },
      { name: 'Billing', path: '/settings/billing' },
      { name: 'Integrations', path: '/settings/integrations' }
    ]
  },
]

export const NavLinks = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <nav className="px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <div key={item.name} className="space-y-1">
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-4 py-2 text-sm font-medium rounded-md group ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`
              }
            >
              <item.icon className="flex-shrink-0 w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
            
            {item.subItems && item.subItems.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pl-11 space-y-1"
              >
                {item.subItems.map((subItem) => (
                  <NavLink
                    key={subItem.name}
                    to={subItem.path}
                    className={({ isActive }) => 
                      `block px-4 py-2 text-sm rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`
                    }
                  >
                    {subItem.name}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}