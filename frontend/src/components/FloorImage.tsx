import React, { useState, useEffect } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three'

interface Props {
  url: string
}

export default function FloorImage({ url }: Props) {
  const texture = useLoader(TextureLoader, url)
  const { size, viewport } = useThree() // ⬅️ 현재 Canvas 크기와 뷰포트 비율을 알아냄
  const [dimensions, setDimensions] = useState<[number, number]>([1, 1])

  useEffect(() => {
    const image = texture.image
    if (!image) return

    const imgWidth = image.width
    const imgHeight = image.height
    const imgAspect = imgWidth / imgHeight
    const canvasAspect = viewport.width / viewport.height

    let planeWidth, planeHeight

    // ✅ 이미지가 더 넓은 경우 (가로에 맞춰야 함)
    if (imgAspect > canvasAspect) {
      planeWidth = viewport.width
      planeHeight = viewport.width / imgAspect
    } else {
      // ✅ 이미지가 더 긴 경우 (세로에 맞춰야 함)
      planeHeight = viewport.height
      planeWidth = viewport.height * imgAspect
    }

    setDimensions([planeWidth, planeHeight])
  }, [texture, viewport])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={dimensions} />
      <meshStandardMaterial map={texture} transparent opacity={1} />
    </mesh>
  )
}
