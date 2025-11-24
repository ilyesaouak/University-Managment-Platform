export interface ToastNotification {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  duration?: number
}

export function ToastContainer({
  notifications,
  onRemove,
}: {
  notifications: ToastNotification[]
  onRemove: (id: string) => void
}) {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg text-white shadow-lg max-w-sm ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
                ? "bg-destructive"
                : toast.type === "warning"
                  ? "bg-accent"
                  : "bg-primary"
          }`}
        >
          <p className="font-semibold">{toast.title}</p>
          <p className="text-sm">{toast.message}</p>
        </div>
      ))}
    </div>
  )
}
