import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useState } from 'react'

import Profile from "../../assets/images/WhatsApp Image 2025-07-25 at 19.47.26.jpeg"

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b bg-white">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-medium text-gray-800 ml-2 md:ml-0">Dashboard</h2>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <BellIcon className="h-6 w-6" />
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="rounded-full flex items-center justify-center text-white font-medium">
                <img src={Profile} className=' rounded-full w-[40px] h-[40px]'  />
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">David Dolapo</span>
            </button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Navbar