"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Send } from "lucide-react"

interface BroadcastMessage {
  id: string
  title: string
  content: string
  targetAudience: string
  sentDate: string
  recipients: number
}

export default function AdminMessagesPage() {
  const router = useRouter()
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>([])
  const [showComposer, setShowComposer] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (!token || !user) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(user)
      if (parsedUser.role !== "admin") {
        router.push("/login")
        return
      }
    } catch {
      router.push("/login")
      return
    }

    loadBroadcasts()
  }, [router])

  const loadBroadcasts = () => {
    const mockBroadcasts: BroadcastMessage[] = [
      {
        id: "1",
        title: "Semester Registration Reminder",
        content: "Please complete your course registration by Friday",
        targetAudience: "All Students",
        sentDate: "2025-01-20",
        recipients: 1240,
      },
      {
        id: "2",
        title: "Grading Submission Deadline",
        content: "All teachers must submit grades by Wednesday",
        targetAudience: "All Teachers",
        sentDate: "2025-01-19",
        recipients: 32,
      },
      {
        id: "3",
        title: "System Maintenance Notice",
        content: "System will be down for maintenance on Sunday",
        targetAudience: "All Users",
        sentDate: "2025-01-18",
        recipients: 2108,
      },
    ]
    setBroadcasts(mockBroadcasts)
    setIsLoading(false)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Messaging</h1>
            <p className="text-muted-foreground">Send announcements and manage communications</p>
          </div>
          <Button onClick={() => setShowComposer(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Send Announcement
          </Button>
        </div>

        {/* Broadcast History */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Broadcasts</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Audience</th>
                  <th className="text-center py-3 px-4 font-semibold">Recipients</th>
                  <th className="text-left py-3 px-4 font-semibold">Sent Date</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {broadcasts.map((broadcast) => (
                  <tr key={broadcast.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{broadcast.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{broadcast.content}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{broadcast.targetAudience}</td>
                    <td className="py-3 px-4 text-center">{broadcast.recipients}</td>
                    <td className="py-3 px-4">{broadcast.sentDate}</td>
                    <td className="py-3 px-4 text-right">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Message Composer Modal */}
        {showComposer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Send System Announcement</h2>
              <MessageComposer onClose={() => setShowComposer(false)} />
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function MessageComposer({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    audience: "all",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Broadcasting:", formData)
    alert("Announcement sent successfully!")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          placeholder="Announcement title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          rows={6}
          placeholder="Your message..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Target Audience</label>
        <select
          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          value={formData.audience}
          onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
        >
          <option value="all">All Users</option>
          <option value="students">All Students</option>
          <option value="teachers">All Teachers</option>
          <option value="directors">All Directors</option>
          <option value="department">Specific Department</option>
        </select>
      </div>

      <div className="flex gap-2 justify-end pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          <Send className="w-4 h-4 mr-2" />
          Send Announcement
        </Button>
      </div>
    </form>
  )
}
