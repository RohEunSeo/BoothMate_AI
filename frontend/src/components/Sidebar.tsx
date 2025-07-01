// src/components/Sidebar.tsx
import React from 'react'
import HoverButton from './HoverButton'

interface SidebarProps {
  onAddBooth: () => void
  onRemoveBooth: () => void
  onResetBooths: () => void
  onUploadFloorImage: (file: File) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  onAddBooth,
  onRemoveBooth,
  onResetBooths,
  onUploadFloorImage,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '10px',
        backgroundColor: '#1a1a1a',
        width: '250px',
        gap: '15px',
      }}
    >
      {/* ✅ 도면 업로드 */}
      <div style={{ position: 'relative', width: '100%' }}>
        <HoverButton>도면 업로드</HoverButton>
        <input
          type="file"
          accept=".svg,.jpg,.png,.pdf"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              onUploadFloorImage(file)
              console.log('도면 파일 선택됨:', file.name)
            }
          }}
        />
      </div>
      <div style={{ position: 'relative', width: '100%' }}>
        <HoverButton>참가 기업 목록 업로드</HoverButton>
        <input
          type="file"
          accept=".csv, .xlsx"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              onUploadFloorImage(file)
              console.log('참가 기업 파일 선택됨:', file.name)
            }
          }}
        />
      </div>

      <HoverButton onClick={onAddBooth}>부스 추가</HoverButton>
      <HoverButton onClick={onRemoveBooth}>부스 삭제</HoverButton>
      <HoverButton onClick={onResetBooths}>전체 리셋</HoverButton>
      <HoverButton>PDF 저장</HoverButton>

      {/* AI 조건 입력 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={labelStyle}>위치 선호도</label>
        <textarea placeholder="예: 입구 근처" style={textareaStyle} rows={5} />

        <label style={labelStyle}>경쟁사 회피 조건</label>
        <textarea placeholder="예: A사와 멀리 배치" style={textareaStyle} rows={5} />

        <HoverButton style={{ backgroundColor: '#444' }}>AI 자동 배치</HoverButton>
      </div>
    </div>
  )
}

const textareaStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #888',
  backgroundColor: '#f0f0f0',
  color: '#333',
  fontSize: '14px',
  resize: 'vertical',
}

const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  color: '#ccc',
}

export default Sidebar
