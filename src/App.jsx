import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import Avatar from './components/Avatar.jsx'
import ChatInput from './components/ChatInput.jsx'

export default function App() {
  const [text, setText] = useState('Hola, soy tu asistente virtual')

  return (
    <>
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <Avatar text={text} />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <ChatInput setText={setText} />
    </>
  )
}
