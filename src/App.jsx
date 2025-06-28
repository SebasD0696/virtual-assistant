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
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '250px',
          height: '300px',
          background: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        }}
      >
        <Canvas 
          style={{
            width: '100%',
            height: '100%',
          }}
          camera={{ position: [0 , 1.5, 3.5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <Suspense fallback={null}>
            <Avatar text={text} />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>

      <ChatInput setText={setText} />
    </>
  )
}
