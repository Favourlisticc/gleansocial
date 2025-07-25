import { motion } from 'framer-motion'
import { NavLinks } from './NavLinks'
import { XMarkIcon } from '@heroicons/react/24/outline'

import Logo from "../../assets/images/Asset 1 (3).png"

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img src={Logo} alt="Glean Socials" className="h-8 w-auto" />
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md hover:bg-gray-100">
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <NavLinks />
      </motion.div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r bg-white">
          <div className="flex items-center h-[120px] px-4 border-b  ">
          <img src={Logo} alt="Glean Socials" className="h-[90px] w-auto" />
          </div>
          <NavLinks />
        </div>
      </div>
    </>
  )
}

export default Sidebar