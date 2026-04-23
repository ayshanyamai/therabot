import { useState, useEffect } from 'react'
import { AlertCircle, Clock, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function SessionWarning() {
  const { user, logout, validateSession } = useAuth()
  const [showWarning, setShowWarning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(null)

  useEffect(() => {
    if (!user) return

    const checkSession = () => {
      const token = localStorage.getItem('therabot_token')
      if (!token) {
        logout(true)
        return
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Date.now() / 1000
        const timeUntilExpiry = payload.exp - currentTime

        // Show warning when 5 minutes or less remaining
        if (timeUntilExpiry <= 300 && timeUntilExpiry > 0) {
          setShowWarning(true)
          setTimeRemaining(Math.floor(timeUntilExpiry))
        } else if (timeUntilExpiry <= 0) {
          // Token expired, force logout
          logout(true)
        } else {
          setShowWarning(false)
          setTimeRemaining(null)
        }
      } catch (error) {
        console.error('Error checking session:', error)
        logout(true)
      }
    }

    // Check immediately
    checkSession()

    // Check every minute
    const interval = setInterval(checkSession, 60000)

    return () => clearInterval(interval)
  }, [user, logout])

  // Update countdown every second when warning is shown
  useEffect(() => {
    if (!showWarning || timeRemaining === null) return

    const countdown = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          logout(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(countdown)
  }, [showWarning, timeRemaining, logout])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleExtendSession = async () => {
    try {
      // TODO: Call token refresh endpoint
      console.log('Extending session...')
      setShowWarning(false)
    } catch (error) {
      console.error('Error extending session:', error)
      logout(true)
    }
  }

  if (!showWarning || !user) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-50 border-b border-amber-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="w-5 h-5" />
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-800">
              Session expiring soon
            </p>
            <p className="text-xs text-amber-600">
              Your session will expire in {formatTime(timeRemaining)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleExtendSession}
            className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors"
          >
            Extend Session
          </button>
          <button
            onClick={() => logout(true)}
            className="flex items-center gap-2 px-3 py-2 text-amber-700 hover:text-amber-800 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default SessionWarning
