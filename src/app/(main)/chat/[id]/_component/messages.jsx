'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import InputText from '../../_component/Input';
import { ModernSidebar } from '../../_component/SideBar';

function Messages({ chat, chatId, user }) {
    const [messages, setMessages] = useState(chat.messages)


    const handleSend = (newMessage) => {
        setMessages((prev) => [...prev, newMessage])
    }
    return (
        <div>
            <div className="fixed top-20 bg-background h-2">
                <ModernSidebar user={user} />
            </div>
            <div className='md:ml-70 ml-0'>

                <div className="w-full max-w-2xl mx-auto px-4 mt-6 mb-40 space-y-2 flex flex-col">
                    {messages.map((msg, idx) => {
                        const isUser = msg.role === 'user'
                        const avatarSrc = isUser
                            ? '/avatars/user.png' // Replace with your user's avatar path
                            : '/bot.png'  // Replace with your bot's avatar path

                        return (
                            <div
                                key={idx}
                                className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                {!isUser && (
                                    <Image
                                        src={avatarSrc}
                                        alt="Bot avatar"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                )}

                                <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md text-sm whitespace-pre-wrap
                                    ${isUser
                                        ? 'bg-blue-500 text-white rounded-br-none'
                                        : 'bg-muted rounded-bl-none'
                                    }`}
                                >
                                    {msg.content}
                                </div>

                                {isUser && (
                                    <Image
                                        src={user?.imageUrl}
                                        alt="User avatar"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="fixed bottom-0 md:left-70 left-0 right-0 bg-background">
                <InputText onSend={handleSend} chatId={chatId} userId={user.id} />
            </div>
        </div>

    )
}

export default Messages