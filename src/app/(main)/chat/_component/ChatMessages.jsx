'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function ChatMessages({ messages, user }) {
    return (
        <div className="w-full max-w-2xl mx-auto px-4 mt-6 mb-40 space-y-2 flex flex-col">
            <AnimatePresence initial={false}>
                {messages.map((msg, idx) => {
                    const isUser = msg.role === 'user'
                    const avatarSrc = isUser
                        ? '/avatars/user.png' // Replace with your user's avatar path
                        : '/bot.png'  // Replace with your bot's avatar path

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
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

                            <div className={`max-w-[80%] px-4 py-3 flex flex-wrap overscroll-none rounded-2xl shadow-md text-sm whitespace-pre-wrap
                                ${isUser
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : 'bg-muted rounded-bl-none'
                                }`}
                            >
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
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
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}
