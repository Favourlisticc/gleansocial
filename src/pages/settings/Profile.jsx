import { motion } from 'framer-motion'
import { 
  UserIcon, 
  EnvelopeIcon, 
  DevicePhoneMobileIcon, 
  BuildingOfficeIcon, 
  GlobeAltIcon, 
  LockClosedIcon,
  CheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

const Profile = () => {
  const [user, setUser] = useState({
    name: 'David Dolapo',
    email: 'David.dolapo@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc',
    website: 'acme.example.com',
    lastLogin: 'July 25, 2023 at 10:30 AM',
    passwordLastChanged: '3 months ago',
    twoFactorEnabled: false
  })

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [formData, setFormData] = useState({ ...user })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setUser(formData)
      setSaving(false)
      setEditing(false)
    }, 1500)
  }

  const handleChangePassword = () => {
    // Simulate password change
    setTimeout(() => {
      setUser(prev => ({ 
        ...prev, 
        passwordLastChanged: 'Just now' 
      }))
      setPasswordData({ current: '', new: '', confirm: '' })
      setShowPasswordForm(false)
    }, 1000)
  }

  const toggleTwoFactor = () => {
    // Simulate 2FA toggle
    setTimeout(() => {
      setUser(prev => ({ 
        ...prev, 
        twoFactorEnabled: !prev.twoFactorEnabled 
      }))
    }, 800)
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Personal Information</h2>
              {!editing ? (
                <button 
                  onClick={() => setEditing(true)}
                  className="text-sm text-primary hover:text-primaryDark"
                >
                  Edit Profile
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setEditing(false)
                    setFormData(user)
                  }}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${editing ? 'focus:ring-primary' : 'bg-gray-50'}`}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${editing ? 'focus:ring-primary' : 'bg-gray-50'}`}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <DevicePhoneMobileIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${editing ? 'focus:ring-primary' : 'bg-gray-50'}`}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${editing ? 'focus:ring-primary' : 'bg-gray-50'}`}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${editing ? 'focus:ring-primary' : 'bg-gray-50'}`}
                  />
                </div>
              </div>
            </div>

            {editing && (
              <div className="mt-6">
                <button 
                  onClick={handleSaveChanges}
                  disabled={saving}
                  className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark flex items-center ${
                    saving ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {saving ? (
                    <>
                      <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Security</h2>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center">
                  <LockClosedIcon className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Password</h3>
                    <p className="text-sm text-gray-600">Last changed {user.passwordLastChanged}</p>
                  </div>
                </div>
                
                {showPasswordForm ? (
                  <div className="mt-3 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        name="current"
                        type="password"
                        value={passwordData.current}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        name="new"
                        type="password"
                        value={passwordData.new}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <input
                        name="confirm"
                        type="password"
                        value={passwordData.confirm}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleChangePassword}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
                      >
                        Update Password
                      </button>
                      <button 
                        onClick={() => setShowPasswordForm(false)}
                        className="px-4 py-2 border rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowPasswordForm(true)}
                    className="w-full mt-3 px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Change Password
                  </button>
                )}
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
                <button 
                  onClick={toggleTwoFactor}
                  className={`w-full px-4 py-2 rounded-md flex items-center justify-center ${
                    user.twoFactorEnabled 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-primary text-white hover:bg-primaryDark'
                  }`}
                >
                  {user.twoFactorEnabled ? (
                    <>
                      <CheckIcon className="h-4 w-4 mr-2" />
                      Enabled
                    </>
                  ) : (
                    'Enable 2FA'
                  )}
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