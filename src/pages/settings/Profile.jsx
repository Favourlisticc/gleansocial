import { motion } from 'framer-motion'
import { UserIcon, EnvelopeIcon, DevicePhoneMobileIcon, BuildingOfficeIcon, GlobeAltIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const Profile = () => {
  const user = {
    name: 'David Dolapo',
    email: 'David.dolapo@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc',
    website: 'acme.example.com',
    lastLogin: 'July 25, 2023 at 10:30 AM'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account information and security</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <DevicePhoneMobileIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={user.phone}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    defaultValue={user.company}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    defaultValue={user.website}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
                Save Changes
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Security</h2>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center">
                  <LockClosedIcon className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Password</h3>
                    <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="w-full mt-3 px-4 py-2 border rounded-md hover:bg-gray-50">
                  Change Password
                </button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
                <button className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
                  Enable 2FA
                </button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Last Login</h3>
                <p className="text-sm text-gray-600">{user.lastLogin}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Profile