import { checkUser } from "@/lib/checkUser"
import { db } from "@/lib/prisma"
import Messages from "./_component/messages"

export default async function ChatPage({ params }) {
    const chatId = await params?.id
    const fullUser = await checkUser()

    if (!fullUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    const user = await db.user.findUnique({
        where: { id: fullUser.id },
    })

    const chat = await db.chat.findUnique({
        where: { id: chatId },
        include: { messages: true },
    })

    return (
        <div>
           <Messages user={user} chatId={chatId} chat={chat} />
        </div>
    )
}
