import React, { useState } from 'react'

export default function ChatInput({ setText }) {
    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
    if (input.trim()) {
        setText(input)
        setInput('')
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe algo..."
            style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit">Hablar</button>
        </form>
    )
}
