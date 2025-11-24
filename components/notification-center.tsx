"use client"
import { Card } from "@/components/ui/card"
import { X, AlertCircle, CheckCircle, Info } from "lucide-react"

export interface Notification {
  id: string
  type: "info" | "warning" | "success" | "error"
  title: string
  message: string
  timestamp: string
  read: boolean
}

interface NotificationCenterProps {
  notifications: Notification[]
  onClose: (id: string) => void
}

export function NotificationCenter({ notifications, onClose }: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-accent" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      default:
        return <Info className="w-5 h-5 text-primary" />
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Notifications</h3>
        {unreadCount > 0 && (
          <span className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id} className={`p-3 ${notification.read ? "" : "border-primary"}`}>
              <div className="flex items-start gap-3">
                {getIcon(notification.type)}
                <div className="flex-1">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                </div>
                <button
                  onClick={() => onClose(notification.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
