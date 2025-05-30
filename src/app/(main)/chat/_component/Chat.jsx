'use client'

import { useState } from 'react'
import ChatMessages from './ChatMessages'
import InputText from './Input'

export default function Chat() {
  const [messages, setMessages] = useState([])

  const handleNewMessage = (msg) => {
    setMessages((prev) => [...prev, msg])
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow overflow-y-auto">
        <ChatMessages messages={messages} />
      </div>
      <InputText onSend={handleNewMessage} />
    </div>
  )
}
