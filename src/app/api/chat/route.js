import { db } from '@/lib/prisma'
import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(req) {
    try {
        const body = await req.json()
        const { message, userId, chatId, file } = body
        console.log(body)

        // 1. Get user details
        const user = await db.user.findUnique({
            where: { id: userId },
            include: {
                resume: true,
                industryInsight: true,
            },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // 2. Prepare user context
        const contextText = `
User Info:
Name: ${user.name || 'N/A'}
Skills: ${user.skills?.join(', ') || 'None listed'}
Experience: ${user.experience || 'N/A'} years
Industry: ${user.industry || 'N/A'}
Industry Insight: ${user.industryInsight || 'N/A'}

${user.resume?.content ? 'Resume:\n' + user.resume.content.slice(0, 1000) : ''}
        `.trim()

        let contents = []

        // 3. If chatId exists, load previous messages
        let chat = null
        if (chatId) {
            chat = await db.chat.findUnique({
                where: { id: chatId },
                include: { messages: true },
            })

            if (chat?.messages?.length) {
                chat.messages.forEach((msg) => {
                    contents.push({
                        role: msg.role,
                        parts: [{ text: msg.content }],
                    })
                })
            }
        }

        // 4. Add user context and new message
        contents.push(
            { role: 'user', parts: [{ text: `User context:\n${contextText}` }] },
            { role: 'user', parts: [{ text: message }] }
        )

        // 5. Optional: include PDF file
        if (file) {
            contents.push({
                role: 'user',
                parts: [{
                    inlineData: {
                        mimeType: 'application/pdf',
                        data: file, // base64-encoded
                    },
                }],
            })
        }

        // 6. Call Gemini
        const chatResponse = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents,
        })

        const reply = chatResponse.text || 'No response.'
        console.log('Gemini reply:', reply)

        // 7. Save messages
        if (!chat) {
            chat = await db.chat.create({
                data: {
                    userId,
                    messages: {
                        create: [
                            { role: 'user', content: message },
                            { role: 'assistant', content: reply },
                        ],
                    },
                },
            })
        } else {
            await db.message.createMany({
                data: [
                    { chatId: chat.id, role: 'user', content: message },
                    { chatId: chat.id, role: 'assistant', content: reply },
                ],
            })
        }

        return NextResponse.json({ reply, chatId: chat.id })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
