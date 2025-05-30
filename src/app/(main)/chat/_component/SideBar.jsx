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
          <div className="flex items-center justify-between px-4 py-3">
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <Tabs defaultValue="navigation" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="navigation">Chat History</TabsTrigger>
                  <TabsTrigger value="attendance">Interviews</TabsTrigger>
                </TabsList>
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
                <TabsContent value="attendance" className="mt-2 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Today's Attendance</div>
                      <div className="text-xs text-muted-foreground">Total: 100</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="space-y-1 rounded-md bg-green-50 p-2 dark:bg-green-950">
                        <CheckCircle2 className="mx-auto h-4 w-4 text-green-500" />
                        <div className="font-medium text-green-600 dark:text-green-400">Present</div>
                        <div>{attendanceData.stats.present}</div>
                      </div>
                      <div className="space-y-1 rounded-md bg-red-50 p-2 dark:bg-red-950">
                        <XCircle className="mx-auto h-4 w-4 text-red-500" />
                        <div className="font-medium text-red-600 dark:text-red-400">Absent</div>
                        <div>{attendanceData.stats.absent}</div>
                      </div>
                      <div className="space-y-1 rounded-md bg-yellow-50 p-2 dark:bg-yellow-950">
                        <Clock className="mx-auto h-4 w-4 text-yellow-500" />
                        <div className="font-medium text-yellow-600 dark:text-yellow-400">Late</div>
                        <div>{attendanceData.stats.late}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Recent Scans</div>
                    <div className="space-y-2">
                      {attendanceData.recentScans.map((scan) => (
                        <div key={scan.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
                          <div className="flex items-center gap-2">
                            {scan.status === "present" ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : scan.status === "late" ? (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span>{scan.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{scan.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Class Attendance</div>
                    <div className="space-y-3">
                      {attendanceData.classes.map((cls) => (
                        <div key={cls.id} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>{cls.name}</span>
                            <span>{cls.attendanceRate}%</span>
                          </div>
                          <Progress value={cls.attendanceRate} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>
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
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
      </SidebarInset>
    </SidebarProvider>
  )
}

