import { useState } from 'react'
import { MessageSquare, User, BarChart3, Settings, Home } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function BottomNav({ currentPage = 'chat' }) {
  const { user, isAnonymous } = useAuth()

  const navItems = [
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageSquare,
      href: '/chat',
      active: currentPage === 'chat'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      href: '/analytics',
      active: currentPage === 'analytics',
      requiresAuth: true
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      href: '/profile',
      active: currentPage === 'profile',
      requiresAuth: true
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      active: currentPage === 'settings',
      requiresAuth: true
    }
  ]

  const handleNavClick = (item) => {
    if (item.requiresAuth && isAnonymous) {
      // Redirect to login for protected features
      window.location.href = '/login'
      return
    }
    window.location.href = item.href
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.active
          const isDisabled = item.requiresAuth && isAnonymous

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              disabled={isDisabled}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'text-emerald-600'
                  : isDisabled
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : ''}`} />
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-600 rounded-full"></div>
                )}
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-emerald-600' : ''}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
      
      {/* Guest Mode Indicator */}
      {isAnonymous && (
        <div className="px-4 py-2 bg-amber-50 border-t border-amber-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-700">Guest Mode</span>
            <button
              onClick={() => window.location.href = '/login'}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BottomNav
