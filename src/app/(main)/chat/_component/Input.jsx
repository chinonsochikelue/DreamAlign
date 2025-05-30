'use client'

import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Paperclip, Send, FileText, X, AlertTriangle } from 'lucide-react'

function InputText({ onSend, userId, chatId: initialChatId }) {
    const [message, setMessage] = useState('')
    const [files, setFiles] = useState([])
    const [fileErrors, setFileErrors] = useState([])
    const [chatId, setChatId] = useState(initialChatId || null)
    const [loading, setLoading] = useState(false)

    const textareaRef = useRef(null)
    const fileInputRef = useRef(null)

    const MAX_FILE_SIZE_MB = 3
    const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    const handleInput = (e) => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
        setMessage(e.target.value)
    }

    const handleSend = async () => {
        setLoading(true)
        if (!message.trim()) return

        let fileBase64 = null
        if (files.length > 0) {
            const reader = new FileReader()
            fileBase64 = await new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result.split(',')[1])
                reader.onerror = reject
                reader.readAsDataURL(files[0])
            })
        }

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    userId,
                    chatId,
                    file: fileBase64
                }),
            })

            const data = await res.json()
            if (data.chatId) setChatId(data.chatId)
            if (data.reply) {
                onSend({ role: 'user', content: message })
                onSend({ role: 'assistant', content: data.reply })
                setMessage('')
                setFiles([])
                setFileErrors([])
            }
            setLoading(false)
        } catch (err) {
            console.error('Failed to send message:', err)
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleFileChange = (e) => {
        if (!e.target.files) return
        const selected = Array.from(e.target.files)
        const newFiles = []
        const newErrors = []

        selected.forEach((file) => {
            if (!allowedTypes.includes(file.type)) {
                newErrors.push(`Unsupported file type: ${file.name}`)
            } else if (file.size > MAX_FILE_SIZE) {
                newErrors.push(`File too large (${file.name} > ${MAX_FILE_SIZE_MB}MB)`)
            } else {
                newFiles.push(file)
            }
        })

        setFiles((prev) => [...prev, ...newFiles])
        setFileErrors(newErrors)
        e.target.value = ''
    }

    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="w-full px-2 py-4 flex justify-center border-none bg-background mb-10">
            <div className="w-full max-w-2xl">
                {/* File Error Warnings */}
                {fileErrors.length > 0 && (
                    <div className="mb-2 space-y-1">
                        {fileErrors.map((err, i) => (
                            <div key={i} className="flex items-center text-red-600 text-sm gap-1">
                                <AlertTriangle className="h-4 w-4" />
                                {err}
                            </div>
                        ))}
                    </div>
                )}

                {/* File Previews */}
                {files.length > 0 && (
                    <div className="flex flex-col gap-2 mb-2">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                                <FileText className="text-muted-foreground" size={18} />
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                <button
                                    onClick={() => handleRemoveFile(index)}
                                    className="ml-auto text-muted-foreground hover:text-destructive"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Input Row */}
                <div className="flex items-end rounded-2xl bg-muted dark:bg-gray-800 px-4 py-3 shadow-md">
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 mr-3 text-muted-foreground"
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Attach file"
                    >
                        <Paperclip className="h-4 w-4" />
                    </Button>

                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        aria-label="Type your message"
                        spellCheck={true}
                        style={{ maxHeight: '150px', overflowY: 'auto', scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        className="flex-1 resize-none !border-none !outline-none !ring-0 focus:!outline-none focus:!ring-0 bg-transparent p-0 shadow-none text-normal overflow-hidden"
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={!message.trim() && files.length === 0 || loading}
                        className="ml-3 h-6 w-6 rounded-full text-muted-foreground"
                        onClick={handleSend}
                        aria-label="Send message"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InputText
