// src/App.tsx
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Sidebar from './components/Sidebar'
import FloorImage from './components/FloorImage'
import Booth3D from './components/Booth3D'

// 🔽 자동 배치용 모듈 추가
import { parseCSV, Company } from './utils/parseCompanyCSV'
import { generateBoothPlacement, Booth } from './utils/boothPlacement'

const App = () => {
  const [floorImageUrl, setFloorImageUrl] = useState<string | null>(null)
  const [booths, setBooths] = useState<[number, number, number][]>([]) // 수동용
  const [autoBooths, setAutoBooths] = useState<Booth[]>([])           // 자동 배치용
  const [isDragging, setIsDragging] = useState(false)

  // ✅ 수동 부스 추가
  const handleAddBooth = () => {
    const nextX = booths.length * 3
    setBooths([...booths, [nextX, 0.5, 0]])
  }

  const handleRemoveBooth = () => {
    setBooths(booths.slice(0, -1))
  }

  const handleResetBooths = () => {
    setBooths([])
    setAutoBooths([]) // 자동 배치도 리셋
  }

  const handleUploadFloorImage = (file: File) => {
    const url = URL.createObjectURL(file)
    setFloorImageUrl(url)
  }

  // ✅ 참가 기업 목록 업로드 시 자동 배치
  const handleCompanyUpload = async (file: File) => {
    try {
      const companies: Company[] = await parseCSV(file)
      const generated = generateBoothPlacement(companies)
      setAutoBooths(generated)
      console.log('자동 배치된 부스:', generated)
    } catch (error) {
      console.error('CSV 파싱 중 오류 발생:', error)
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        onAddBooth={handleAddBooth}
        onRemoveBooth={handleRemoveBooth}
        onResetBooths={handleResetBooths}
        onUploadFloorImage={handleUploadFloorImage}
        onUploadCompanyList={handleCompanyUpload}
      />
      <div style={{ flex: 1 }}>
        <Canvas shadows camera={{ position: [10, 20, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} castShadow />
          <OrbitControls enabled={!isDragging} />

          {/* 도면 이미지 렌더링 */}
          {floorImageUrl && <FloorImage url={floorImageUrl} />}

          {/* ✅ 수동 부스들 */}
          {booths.map((pos, i) => (
            <Booth3D
              key={`manual-${i}`}
              position={pos}
              setIsDragging={setIsDragging}
            />
          ))}

          {/* ✅ 자동 배치된 부스들 */}
          {autoBooths.map((booth) => (
            <Booth3D
              key={booth.id}
              position={[booth.position.x, 0.5, booth.position.z]}
              label={booth.companyName}
              color={booth.color} // ✅ 추가된 라인
              setIsDragging={setIsDragging}// 자동 부스는 드래그 안함
            />
          ))}
        </Canvas>
      </div>
    </div>
  )
}

export default App
