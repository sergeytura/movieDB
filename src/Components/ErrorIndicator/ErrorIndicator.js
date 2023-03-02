import React from "react";
import {  Alert, Space  } from 'antd';
import './ErrorIndicator.css'

export default function ErrorIndicator () {
    return (

        <div className="error-message">
          
          <Space 
        // direction="vertical"
        style={{
          width: '100%',
        }}
        >
          <Alert   message="Are you from Russia!? Use Psiphon 3 - its free and fast"
            type="error"
            showIcon  />
          
        </Space>
        
        </div>

)
        
}