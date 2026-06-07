"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const PARTICLE_COUNT = 800
const COLOR = "#00d4ff"
const OPACITY = 0.25

function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 20 - 5
      const speed = 0.2 + Math.random() * 0.5
      const offset = Math.random() * Math.PI * 2
      const amplitude = 0.3 + Math.random() * 0.7
      temp.push({ x, y, z, speed, offset, amplitude })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i]
      dummy.position.set(
        p.x + Math.sin(time * p.speed + p.offset) * p.amplitude,
        p.y + Math.cos(time * p.speed * 0.7 + p.offset) * p.amplitude,
        p.z
      )
      const scale = 0.02 + Math.sin(time * p.speed + p.offset) * 0.01
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={COLOR}
        transparent
        opacity={OPACITY}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  )
}

export function Particles() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ParticleField />
      </Canvas>
    </div>
  )
}
