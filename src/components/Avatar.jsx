import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import speak from '../utils/tts.js'

export default function Avatar({ text }) {
    const { scene } = useGLTF('/avatar.glb')

    useEffect(() => {
        if (text) speak(text)
    }, [text])

    return <primitive object={scene} scale={1.5} />
}
