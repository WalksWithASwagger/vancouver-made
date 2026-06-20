import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Torus,
  Stars,
  Sparkles,
} from '@react-three/drei'
import * as THREE from 'three'
import { colors } from '../brand/tokens.js'

// The "World Portal": a counterfeit trophy ring framing a churning globe.
// Future-forward FIFA-2026 branding, subverted. Spin it. It is rigged.
function Globe() {
  const mesh = useRef()
  useFrame((_, dt) => {
    if (mesh.current) mesh.current.rotation.y += dt * 0.15
  })
  return (
    <Sphere ref={mesh} args={[1.35, 64, 64]}>
      <MeshDistortMaterial
        color={colors.rain}
        emissive={colors.cyan}
        emissiveIntensity={0.25}
        roughness={0.35}
        metalness={0.6}
        distort={0.28}
        speed={1.4}
      />
    </Sphere>
  )
}

function TrophyRing({ radius = 2.1, tube = 0.06, tilt = 0, color = colors.gold }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.08
  })
  return (
    <Torus ref={ref} args={[radius, tube, 16, 128]} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={1}
        roughness={0.2}
      />
    </Torus>
  )
}

// Orbiting "fan zone" debris — the spectacle's discarded confetti.
function Debris({ count = 120 }) {
  const ref = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        r: 2.6 + Math.random() * 3.5,
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
        speed: 0.05 + Math.random() * 0.25,
        scale: 0.02 + Math.random() * 0.06,
      })),
    [count],
  )
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    seeds.forEach((s, i) => {
      const a = s.theta + t * s.speed
      dummy.position.set(
        s.r * Math.sin(s.phi) * Math.cos(a),
        s.r * Math.cos(s.phi) * 0.6,
        s.r * Math.sin(s.phi) * Math.sin(a),
      )
      dummy.scale.setScalar(s.scale)
      dummy.rotation.set(a, a * 1.5, 0)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={colors.hazard} emissive={colors.hazard} emissiveIntensity={0.4} />
    </instancedMesh>
  )
}

export default function Portal() {
  return (
    <>
      <color attach="background" args={[colors.ink]} />
      <fog attach="fog" args={[colors.ink, 6, 16]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={60} color={colors.cyan} />
      <pointLight position={[-6, -3, -4]} intensity={40} color={colors.hazard} />
      <spotLight position={[0, 8, 2]} angle={0.5} penumbra={1} intensity={50} color={colors.gold} />

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <Globe />
        <TrophyRing radius={2.0} tilt={0} color={colors.gold} />
        <TrophyRing radius={2.3} tilt={0.5} color={colors.cyan} />
        <TrophyRing radius={2.55} tilt={-0.4} color={colors.hazard} />
      </Float>

      <Debris />
      <Sparkles count={80} scale={9} size={3} speed={0.3} color={colors.bone} />
      <Stars radius={40} depth={30} count={1500} factor={3} saturation={0} fade speed={0.5} />
    </>
  )
}
