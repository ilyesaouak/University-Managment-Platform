"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, CheckCircle, Clock } from "lucide-react"

interface MakeupClass {
  id: string
  course: string
  originalDate: string
  makeupDate: string
  teacher: string
  students: number
  status: "pending" | "scheduled" | "completed"
}

export default function MakeupsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [makeups, setMakeups] = useState<MakeupClass[]>([])

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

    loadMakeups()
  }, [router])

  const loadMakeups = () => {
    const mockMakeups: MakeupClass[] = [
      {
        id: "1",
        course: "Database Systems",
        originalDate: "2025-01-15",
        makeupDate: "2025-01-22",
        teacher: "Dr. Ahmed Khalil",
        students: 45,
        status: "scheduled",
      },
      {
        id: "2",
        course: "Web Development",
        originalDate: "2025-01-13",
        makeupDate: "TBD",
        teacher: "Dr. Fatima Hassan",
        students: 38,
        status: "pending",
      },
      {
        id: "3",
        course: "Data Structures",
        originalDate: "2025-01-10",
        makeupDate: "2025-01-17",
        teacher: "Dr. Mohamed Saleh",
        students: 52,
        status: "completed",
      },
    ]
    setMakeups(mockMakeups)
    setIsLoading(false)
  }

  if (isLoading) return <div>Loading...</div>

  const pendingMakeups = makeups.filter((m) => m.status === "pending")

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Makeup Classes</h1>
            <p className="text-muted-foreground">Manage makeup sessions for cancelled classes</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Makeup
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingMakeups.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">{makeups.filter((m) => m.status === "scheduled").length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{makeups.filter((m) => m.status === "completed").length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Makeups Table */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">All Makeup Classes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Course</th>
                  <th className="text-left py-3 px-4 font-semibold">Original Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Makeup Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Teacher</th>
                  <th className="text-center py-3 px-4 font-semibold">Students</th>
                  <th className="text-center py-3 px-4 font-semibold">Status</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {makeups.map((makeup) => (
                  <tr key={makeup.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{makeup.course}</td>
                    <td className="py-3 px-4">{makeup.originalDate}</td>
                    <td className="py-3 px-4">{makeup.makeupDate}</td>
                    <td className="py-3 px-4">{makeup.teacher}</td>
                    <td className="py-3 px-4 text-center">{makeup.students}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          makeup.status === "pending"
                            ? "bg-accent/10 text-accent"
                            : makeup.status === "scheduled"
                              ? "bg-primary/10 text-primary"
                              : "bg-green-500/10 text-green-600"
                        }`}
                      >
                        {makeup.status.charAt(0).toUpperCase() + makeup.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {makeup.status === "pending" && (
                        <Button size="sm" variant="outline">
                          Schedule
                        </Button>
                      )}
                      {makeup.status === "scheduled" && (
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
