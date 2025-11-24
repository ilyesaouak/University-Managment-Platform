"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Users, BarChart3, TrendingUp } from "lucide-react"

export default function AdminAnalyticsPage() {
  const router = useRouter()
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

    setIsLoading(false)
  }, [router])

  if (isLoading) return <div>Loading...</div>

  // Mock data
  const departmentStats = [
    { name: "Computer Science", students: 320, teachers: 12, courses: 24, avgGPA: 3.52 },
    { name: "Engineering", students: 280, teachers: 10, courses: 18, avgGPA: 3.38 },
    { name: "Business Admin", students: 240, teachers: 8, courses: 16, avgGPA: 3.21 },
  ]

  const systemHealth = [
    { metric: "Database Uptime", value: 99.9, status: "good" },
    { metric: "API Response Time", value: 142, status: "good" },
    { metric: "Active Users", value: 1240, status: "good" },
    { metric: "System Load", value: 45, status: "good" },
  ]

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Analytics</h1>
            <p className="text-muted-foreground">University-wide performance and insights</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Full Report
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">5,230</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold">487</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">System Health</p>
                <p className="text-2xl font-bold">99.8%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Department Comparison */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Department Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Department</th>
                  <th className="text-center py-3 px-4 font-semibold">Students</th>
                  <th className="text-center py-3 px-4 font-semibold">Teachers</th>
                  <th className="text-center py-3 px-4 font-semibold">Courses</th>
                  <th className="text-center py-3 px-4 font-semibold">Avg GPA</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((dept, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{dept.name}</td>
                    <td className="py-3 px-4 text-center">{dept.students}</td>
                    <td className="py-3 px-4 text-center">{dept.teachers}</td>
                    <td className="py-3 px-4 text-center">{dept.courses}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary font-semibold">{dept.avgGPA}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">System Health Monitoring</h2>
            <div className="space-y-4">
              {systemHealth.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.metric}</span>
                    <span
                      className={`text-sm font-semibold ${
                        item.status === "good"
                          ? "text-green-600"
                          : item.status === "warning"
                            ? "text-accent"
                            : "text-destructive"
                      }`}
                    >
                      {item.value}
                      {item.metric.includes("Time") ? "ms" : item.metric.includes("Users") ? "" : "%"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`rounded-full h-2 ${
                        item.status === "good"
                          ? "bg-green-500"
                          : item.status === "warning"
                            ? "bg-accent"
                            : "bg-destructive"
                      }`}
                      style={{ width: `${Math.min(item.value, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Usage Statistics */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Peak Usage Hours</h2>
            <div className="flex items-end gap-2 h-40 justify-around">
              {[8, 10, 6, 12, 15, 14, 11, 9, 7, 13, 16, 12].map((value, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div
                    className="flex-1 w-full bg-gradient-to-t from-secondary to-secondary/40 rounded-t"
                    style={{ height: `${(value / 16) * 100}px` }}
                  />
                  <span className="text-xs text-muted-foreground mt-1">{idx}:00</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Export Reports */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Generate Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Academic Performance Report
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Attendance Analysis
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              System Audit Log
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
