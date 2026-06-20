import { Suspense, Component } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Portal from './Portal.jsx'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

class SceneErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) {
      return (
        <div className="flex h-full items-center justify-center text-bone/40 text-xs uppercase tracking-[0.3em]">
          3D not available
        </div>
      )
    }
    return this.props.children
  }
}

export default function Stage() {
  const reduced = usePrefersReducedMotion()
  return (
    <SceneErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Portal reduced={reduced} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!reduced}
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      </Canvas>
    </SceneErrorBoundary>
  )
}
