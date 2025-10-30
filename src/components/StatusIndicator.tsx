import { useState } from 'react'

export type Status = 'idle' | 'loading' | 'success' | 'error'

export interface StatusIndicatorProps {
  status: Status
  label: string
  message?: string
}

export function StatusIndicator({ status, label, message }: StatusIndicatorProps) {
  const [showMessage, setShowMessage] = useState(false)

  const colorMap: Record<typeof status, string> = {
    idle: 'red',
    loading: 'yellow',
    success: 'green',
    error: 'red',
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        position: 'relative',
        cursor: message ? 'pointer' : 'default',
      }}
      onClick={() => message && setShowMessage(!showMessage)}
    >
      <span
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: colorMap[status],
          display: 'inline-block',
        }}
      />
      {label && <span>{label}</span>}

      {showMessage && message && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '4px',
            background: '#333',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: '6px',
            zIndex: 999,
            whiteSpace: 'pre-wrap',
            maxWidth: '300px',
          }}
        >
          {message}
        </div>
      )}
    </div>
  )
}
