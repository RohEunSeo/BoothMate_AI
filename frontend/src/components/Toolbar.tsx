// src/components/Toolbar.tsx
import React from 'react'
import { exportToPDF } from '../utils/exportPDF'

const Toolbar: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
      <button onClick={exportToPDF}>📄 PDF 내보내기</button>
    </div>
  )
}

export default Toolbar
