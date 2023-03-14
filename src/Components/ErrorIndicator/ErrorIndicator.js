import React from 'react'
import { Alert, Space } from 'antd'
import './ErrorIndicator.css'

export default function ErrorIndicator({ errorObj }) {
  const vpnErr = 'Are you from Russia!? Use Psiphon 3 - its free and fast'
  const text = errorObj ? errorObj.message : vpnErr
  return (
    <div className="error-message">
      <Space
        style={{
          width: '100%',
        }}
      >
        <Alert message={text} type="error" showIcon />
      </Space>
    </div>
  )
}
