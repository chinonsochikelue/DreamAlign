"use client"

import * as React from "react"
import {
  Clock,
  LogOut,
  CheckCircle2,
  XCircle,
  Menu,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Sample data for the attendance system
const attendanceData = {
  user: {
    name: "Sarah Johnson",
    role: "Teacher",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
  },
  classes: [
    { id: 1, name: "Mathematics 101", students: 32, attendanceRate: 92 },
    { id: 2, name: "Computer Science", students: 28, attendanceRate: 88 },
    { id: 3, name: "Physics", students: 24, attendanceRate: 78 },
  ],
  recentScans: [
    { id: 1, name: "John Doe", time: "09:15 AM", status: "present" },
    { id: 2, name: "Jane Smith", time: "09:18 AM", status: "present" },
    { id: 3, name: "Mike Johnson", time: "09:32 AM", status: "late" },
  ],
  stats: {
    present: 78,
    absent: 12,
    late: 10,
  },
}

export function ModernSidebar() {
  const [user, setUser] = React.useState(null)
  const [selectedChatId, setSelectedChatId] = React.useState(null)
  const [chatMessages, setChatMessages] = React.useState([])
  
  const pathname = usePathname()

  // Load user data on mount
  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user')
      const data = await res.json()
      setUser(data)
    }

    fetchUser()
  }, [])

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId)
    const selectedChat = user.Chat.find((chat) => chat.id === chatId)
    setChatMessages(selectedChat?.messages || [])
  }

  if (!user) return <div>Loading...</div>


  return (
    <SidebarProvider>
      <Sidebar className="border-r mt-16">
        <SidebarHeader className="border-b">

          <div className="px-4 py-2">
            <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
              <Avatar>
                <AvatarImage src={user?.imageUrl || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback>{user?.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium truncate max-w-36">{user.name}</div>
                <div className="text-xs text-muted-foreground truncate max-w-36">{user.industry}</div>
              </div>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <Tabs defaultValue="navigation" className="w-full">
                <TabsContent value="navigation" className="mt-2">
                  <SidebarMenu>

                    {user.Chat?.map((chat) => (
                      <div key={chat.id}>
                        <Link href={`/chat/${chat.id}`}>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <button
                              onClick={() => handleChatSelect(chat.id)}
                              className={`w-full text-left ${selectedChatId === chat.id ? 'font-bold text-blue-600' : ''
                                }`}
                            >
                              💬 Chat • {new Date(chat.createdAt).toLocaleDateString()}
                            </button>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        </Link>
                      </div>
                    ))}

                  </SidebarMenu>
                </TabsContent>
              </Tabs>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="md:hidden h-8">
        <SidebarTrigger className="md:hidden">
          <Button variant="ghost" size="md">
            <Menu className="h-20 w-20" />
          </Button>
        </SidebarTrigger>
      </SidebarInset>
    </SidebarProvider>
  )
}

