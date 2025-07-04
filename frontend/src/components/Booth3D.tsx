// src/components/Booth3D.tsx
import React, { useRef, useState } from 'react'
import { Mesh, Vector2, Raycaster, Plane, Vector3 } from 'three'
import { useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import { Edges, Text } from '@react-three/drei'

interface Booth3DProps {
  position: [number, number, number]
  setIsDragging: (dragging: boolean) => void
  label?: string
  color?: string // ✅ 추가: 색상 입력
}

const Booth3D: React.FC<Booth3DProps> = ({ position, setIsDragging, label, color = "orange" }) => {
  const meshRef = useRef<Mesh>(null)
  const { size, camera } = useThree()

  const raycaster = new Raycaster()
  const plane = new Plane(new Vector3(0, 1, 0), -0.5) // y=0.5 평면

  const screenToPlanePoint = (x: number, y: number): Vector3 => {
    const ndc = new Vector2(
      (x / size.width) * 2 - 1,
      -(y / size.height) * 2 + 1
    )
    raycaster.setFromCamera(ndc, camera)

    const intersectPoint = new Vector3()
    raycaster.ray.intersectPlane(plane, intersectPoint)
    return intersectPoint
  }

  const [offset, setOffset] = useState<Vector3 | null>(null)

  const bind = useDrag(({ xy: [x, y], first, last }) => {
    const point = screenToPlanePoint(x, y)

    if (first) {
      setIsDragging(true)

      if (meshRef.current) {
        const boothPos = meshRef.current.position.clone()
        const delta = new Vector3().subVectors(boothPos, point)
        setOffset(delta)
      }
    }

    if (last) {
      setIsDragging(false)
      setOffset(null)
    }

    if (meshRef.current && offset) {
      const newPos = new Vector3().addVectors(point, offset)
      meshRef.current.position.set(newPos.x, 0.5, newPos.z)
    }
  })

  return (
    <group position={position} {...bind()} ref={meshRef}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color={color} /> {/* ✅ 반영됨 */}
      </mesh>
      <Edges threshold={15} scale={1} color="black" />
      {label && (
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.4}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  )
}

export default Booth3D
