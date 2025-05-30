import { checkUser } from '@/lib/checkUser'
import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const user = await checkUser()

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 })
  }

  const fullUser = await db.user.findUnique({
    where: { id: user.id },
    include: {
      Chat: {
        include: {
          messages: true,
        },
        orderBy: { updatedAt: 'desc' },
      },
    },
  })

  return NextResponse.json(fullUser)
}
