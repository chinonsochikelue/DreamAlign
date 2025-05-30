'use client';
import React, { useEffect, useState } from 'react'
import ChatMessages from './_component/ChatMessages'
import InputText from './_component/Input';
import { ModernSidebar, SideBar } from './_component/SideBar';

function page() {
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user')
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      }
    }

    fetchUser()
  }, [])


  const handleSend = (newMessage) => {
    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <div>
      {/* Header content can go here */}
      <div className="fixed top-20 bg-background h-2">
        <ModernSidebar user={user} />
      </div>

      {/* Main content area */}
      <div className='md:ml-70 ml-0'>
        <ChatMessages user={user} messages={messages} />
      </div>

      {/* <div className="fixed bottom-0 left-0 right-0 z-50 bg-background"> */}
      <div className="fixed bottom-0 md:left-70 left-0 right-0 bg-background">
        {/* Footer content can go here */}
        <InputText onSend={handleSend} userId={user.id} />
      </div>
    </div>
  )
}

export default page