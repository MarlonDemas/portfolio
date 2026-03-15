import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const N = 3000

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.innerWidth < 1024) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000)

    const positions = new Float32Array(N * 3)
    const colors = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 900
      positions[i * 3 + 1] = (Math.random() - 0.5) * 900
      positions[i * 3 + 2] = Math.random() * -2000
      const t = (positions[i * 3 + 2] + 2000) / 2000
      const b = 0.1 + t * 0.9
      colors[i * 3]     = b * 0.0
      colors[i * 3 + 1] = b * 0.83
      colors[i * 3 + 2] = b * 1.0
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.4,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      vertexColors: true,
    })
    scene.add(new THREE.Points(geo, mat))

    let mx = 0
    let my = 0

    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1
      my = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)
    resize()

    let animId: number
    const tick = () => {
      animId = requestAnimationFrame(tick)
      const pos = geo.attributes.position.array as Float32Array
      const col = geo.attributes.color.array as Float32Array
      for (let i = 0; i < N; i++) {
        pos[i * 3 + 2] += 0.25
        if (pos[i * 3 + 2] > 10) pos[i * 3 + 2] = -2000
        const t = (pos[i * 3 + 2] + 2000) / 2000
        const b = 0.1 + t * 0.9
        col[i * 3]     = b * 0.0
        col[i * 3 + 1] = b * 0.83
        col[i * 3 + 2] = b * 1.0
      }
      geo.attributes.position.needsUpdate = true
      geo.attributes.color.needsUpdate = true
      camera.rotation.x += (my * 0.035 - camera.rotation.x) * 0.03
      camera.rotation.y += (mx * 0.035 - camera.rotation.y) * 0.03
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 hidden lg:block"
      style={{ zIndex: -1 }}
    />
  )
}
