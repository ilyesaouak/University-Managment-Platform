"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Search } from "lucide-react"

interface Message {
  id: string
  sender: string
  senderRole: string
  content: string
  timestamp: string
  read: boolean
  avatar?: string
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

export default function StudentMessagesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageText, setMessageText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
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
      if (parsedUser.role !== "student") {
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
        participantName: "Dr. Ahmed Khalil",
        participantRole: "teacher",
        lastMessage: "Please submit your lab report by Friday.",
        timestamp: "2 hours ago",
        unread: 1,
        messages: [
          {
            id: "1",
            sender: "Dr. Ahmed Khalil",
            senderRole: "teacher",
            content: "Hi, how is your project?",
            timestamp: "10:00 AM",
            read: true,
          },
          {
            id: "2",
            sender: "You",
            senderRole: "student",
            content: "It is going well, I have completed 60% of it",
            timestamp: "10:15 AM",
            read: true,
          },
          {
            id: "3",
            sender: "Dr. Ahmed Khalil",
            senderRole: "teacher",
            content: "Please submit your lab report by Friday.",
            timestamp: "10:45 AM",
            read: false,
          },
        ],
      },
      {
        id: "2",
        participantName: "Dr. Fatima Hassan",
        participantRole: "teacher",
        lastMessage: "Great work on the last assignment!",
        timestamp: "1 day ago",
        unread: 0,
        messages: [
          {
            id: "1",
            sender: "Dr. Fatima Hassan",
            senderRole: "teacher",
            content: "Great work on the last assignment!",
            timestamp: "Yesterday",
            read: true,
          },
        ],
      },
      {
        id: "3",
        participantName: "Academic Office",
        participantRole: "admin",
        lastMessage: "Your registration is confirmed for next semester.",
        timestamp: "3 days ago",
        unread: 0,
        messages: [
          {
            id: "1",
            sender: "Academic Office",
            senderRole: "admin",
            content: "Your registration is confirmed for next semester.",
            timestamp: "3 days ago",
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
      senderRole: "student",
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

  const filteredConversations = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="student" userName={user.name}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1 flex flex-col">
          <Card className="flex-1 p-4 overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold mb-3">Messages</h2>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Conversations */}
            <div className="overflow-y-auto space-y-2 flex-1">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full text-left p-3 rounded-lg hover:bg-muted transition-colors ${
                    selectedConversation?.id === conversation.id ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{conversation.participantName}</p>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{conversation.timestamp}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        {selectedConversation && (
          <div className="lg:col-span-2 flex flex-col">
            <Card className="flex-1 p-4 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="border-b border-border pb-4 mb-4">
                <h3 className="font-semibold text-lg">{selectedConversation.participantName}</h3>
                <p className="text-sm text-muted-foreground">{selectedConversation.participantRole}</p>
              </div>

              {/* Messages */}
              <div className="overflow-y-auto flex-1 mb-4 space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderRole === "student" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.senderRole === "student"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="break-words">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
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
