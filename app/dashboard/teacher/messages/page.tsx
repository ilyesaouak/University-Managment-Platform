"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  id: string
  sender: string
  senderRole: string
  content: string
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  participantName: string
  participantRole: string
  lastMessage: string
  timestamp: string
  unread: number
  messages: Message[]
}

export default function TeacherMessagesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageText, setMessageText] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (!token || !userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "teacher") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
      loadConversations()
    } catch {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const loadConversations = () => {
    const mockConversations: Conversation[] = [
      {
        id: "1",
        participantName: "Student Group A (Database)",
        participantRole: "students",
        lastMessage: "When is the lab deadline?",
        timestamp: "30 min ago",
        unread: 2,
        messages: [
          {
            id: "1",
            sender: "Ahmed Hassan",
            senderRole: "student",
            content: "When is the lab deadline?",
            timestamp: "30 min ago",
            read: false,
          },
          {
            id: "2",
            sender: "Fatima Ali",
            senderRole: "student",
            content: "+1, we need to know",
            timestamp: "28 min ago",
            read: false,
          },
        ],
      },
      {
        id: "2",
        participantName: "Mohamed Ibrahim",
        participantRole: "student",
        lastMessage: "Thank you for the feedback!",
        timestamp: "2 hours ago",
        unread: 0,
        messages: [
          {
            id: "1",
            sender: "Mohamed Ibrahim",
            senderRole: "student",
            content: "Thank you for the feedback!",
            timestamp: "2 hours ago",
            read: true,
          },
        ],
      },
      {
        id: "3",
        participantName: "Department Head",
        participantRole: "admin",
        lastMessage: "Please submit grades by Friday",
        timestamp: "1 day ago",
        unread: 0,
        messages: [
          {
            id: "1",
            sender: "Department Head",
            senderRole: "admin",
            content: "Please submit grades by Friday",
            timestamp: "1 day ago",
            read: true,
          },
        ],
      },
    ]
    setConversations(mockConversations)
    setSelectedConversation(mockConversations[0])
  }

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return

    const newMessage: Message = {
      id: Math.random().toString(),
      sender: user.name,
      senderRole: "teacher",
      content: messageText,
      timestamp: "Now",
      read: true,
    }

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
    })

    setConversations(
      conversations.map((c) =>
        c.id === selectedConversation.id
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastMessage: messageText,
              timestamp: "Now",
            }
          : c,
      ),
    )

    setMessageText("")
  }

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="teacher" userName={user.name}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations */}
        <div className="lg:col-span-1 flex flex-col">
          <Card className="flex-1 p-4 overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold mb-3">Messages</h2>
            <div className="overflow-y-auto space-y-2 flex-1">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full text-left p-3 rounded-lg hover:bg-muted ${
                    selectedConversation?.id === conversation.id ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{conversation.participantName}</p>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat */}
        {selectedConversation && (
          <div className="lg:col-span-2 flex flex-col">
            <Card className="flex-1 p-4 overflow-hidden flex flex-col">
              <div className="border-b border-border pb-4 mb-4">
                <h3 className="font-semibold text-lg">{selectedConversation.participantName}</h3>
              </div>

              <div className="overflow-y-auto flex-1 mb-4 space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderRole === "teacher" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.senderRole === "teacher"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage()
                  }}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
