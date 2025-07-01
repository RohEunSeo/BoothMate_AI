// src/App.tsx
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Sidebar from './components/Sidebar'
import FloorImage from './components/FloorImage'
import Booth3D from './components/Booth3D'

const App = () => {
  const [floorImageUrl, setFloorImageUrl] = useState<string | null>(null)
  const [booths, setBooths] = useState<[number, number, number][]>([])
  const [isDragging, setIsDragging] = useState(false) // ⬅️ 드래그 상태 관리

  const handleAddBooth = () => {
    const nextX = booths.length * 3
    setBooths([...booths, [nextX, 0.5, 0]])
  }

  const handleRemoveBooth = () => {
    setBooths(booths.slice(0, -1))
  }

  const handleResetBooths = () => {
    setBooths([])
  }

  const handleUploadFloorImage = (file: File) => {
    const url = URL.createObjectURL(file)
    setFloorImageUrl(url)
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        onAddBooth={handleAddBooth}
        onRemoveBooth={handleRemoveBooth}
        onResetBooths={handleResetBooths}
        onUploadFloorImage={handleUploadFloorImage}
      />
      <div style={{ flex: 1 }}>
        <Canvas shadows camera={{ position: [10, 20, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} castShadow />
          <OrbitControls enabled={!isDragging} /> {/* 드래그 중엔 카메라 고정 */}
          {floorImageUrl && <FloorImage url={floorImageUrl} />}
          {booths.map((pos, i) => (
            <Booth3D
              key={i}
              position={pos}
              setIsDragging={setIsDragging}
            />
          ))}
        </Canvas>
      </div>
    </div>
  )
}

export default App
