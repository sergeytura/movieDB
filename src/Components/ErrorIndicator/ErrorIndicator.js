import React from 'react'
import { Alert, Space } from 'antd'
import './ErrorIndicator.css'

export default function ErrorIndicator({ message }) {
  const vpnErr = 'Are you from Russia!? Use Psiphon 3 - its free and fast'
  return (
    <div className="error-message">
      <Space
        style={{
          width: '100%',
        }}
      >
        <Alert message={message || vpnErr} type="error" showIcon />
      </Space>
    </div>
  )
}
