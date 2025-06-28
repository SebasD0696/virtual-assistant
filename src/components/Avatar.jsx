import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import speak from '../utils/tts.js'

export default function Avatar({ text }) {
  const { scene } = useGLTF('/avatar.glb')

  useEffect(() => {
    if (text) speak(text)
  }, [text])

  return (
    <group>
      {/* Mueve el modelo hacia abajo para que la cabeza quede en el origen */}
      <primitive object={scene} scale={7} position={[0, -10.5, 0]} />
    </group>
  )
}
