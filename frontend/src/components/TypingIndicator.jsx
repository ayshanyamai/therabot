import { useState, useEffect } from 'react'

function TypingIndicator() {
  const [retryCount, setRetryCount] = useState(0)
  const [status, setStatus] = useState('thinking') // 'thinking', 'retrying', 'connecting'

  useEffect(() => {
    const interval = setInterval(() => {
      setRetryCount(prev => {
        if (prev >= 3) {
          setStatus('connecting')
          return 0
        }
        if (prev === 2) {
          setStatus('retrying')
        }
        return prev + 1
      })
    }, 2000) // Change status every 2 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusText = () => {
    switch (status) {
      case 'thinking':
        return 'Thinking...'
      case 'retrying':
        return 'Reconnecting...'
      case 'connecting':
        return 'Almost there...'
      default:
        return 'Thinking...'
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'thinking':
        return 'bg-blue-400'
      case 'retrying':
        return 'bg-amber-400'
      case 'connecting':
        return 'bg-emerald-400'
      default:
        return 'bg-blue-400'
    }
  }

  return (
    <div className="flex justify-start px-4 py-3">
      <div className="flex gap-3 max-w-[85%]">
        {/* Bot Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md">
          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
        </div>

        {/* Typing Bubble */}
        <div className="flex flex-col items-start">
          <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm">
            {/* Status Text */}
            <div className="text-xs text-gray-500 mb-2 font-medium">
              {getStatusText()}
            </div>

            {/* Animated Dots */}
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 ${getStatusColor()} rounded-full animate-bounce`}
                style={{ animationDelay: '0ms' }}
              ></span>
              <span
                className={`w-2 h-2 ${getStatusColor()} rounded-full animate-bounce`}
                style={{ animationDelay: '150ms' }}
              ></span>
              <span
                className={`w-2 h-2 ${getStatusColor()} rounded-full animate-bounce`}
                style={{ animationDelay: '300ms' }}
              ></span>
            </div>

            {/* Retry Indicator */}
            {status === 'retrying' && (
              <div className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></div>
                <span>Retrying connection...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
