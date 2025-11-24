"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingDown, TrendingUp } from "lucide-react"

export default function DirectorAnalyticsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
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
      if (parsedUser.role !== "director") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
    } catch {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  // Mock chart data
  const absenceData = [
    { name: "Week 1", rate: 5.2 },
    { name: "Week 2", rate: 6.1 },
    { name: "Week 3", rate: 4.8 },
    { name: "Week 4", rate: 7.3 },
    { name: "Week 5", rate: 6.2 },
  ]

  const performanceData = [
    { range: "A (90-100)", students: 85 },
    { range: "B (80-89)", students: 145 },
    { range: "C (70-79)", students: 220 },
    { range: "D (60-69)", students: 98 },
    { range: "F (Below 60)", students: 52 },
  ]

  const courseEnrollment = [
    { course: "Database", enrolled: 45, completed: 42 },
    { course: "Web Dev", enrolled: 38, completed: 35 },
    { course: "Algorithms", enrolled: 52, completed: 48 },
    { course: "Networks", enrolled: 40, completed: 37 },
  ]

  return (
    <DashboardLayout userRole="director" userName={user.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Department Analytics</h1>
            <p className="text-muted-foreground">Performance metrics and insights</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Absence Rate</p>
                <p className="text-2xl font-bold">6.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-destructive" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+0.5% from last month</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg GPA</p>
                <p className="text-2xl font-bold">3.45</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+0.08 from last semester</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Course Completion</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Steady performance</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">At-Risk Students</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <TrendingDown className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">-5 from last week</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Absence Rate Trend */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Absence Rate Trend</h3>
            <div className="flex items-end gap-4 h-48 justify-around">
              {absenceData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="flex items-end gap-2 w-full">
                    <div
                      className="flex-1 bg-gradient-to-t from-primary to-primary/40 rounded-t"
                      style={{ height: `${(item.rate / 10) * 100}px` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">{item.name}</span>
                  <span className="text-xs font-semibold">{item.rate}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Grade Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
            <div className="space-y-3">
              {performanceData.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.range}</span>
                    <span className="text-sm text-muted-foreground">{item.students}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary rounded-full h-2"
                      style={{ width: `${(item.students / 220) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Course Enrollment */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Course Enrollment & Completion</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Course</th>
                  <th className="text-center py-3 px-4 font-semibold">Enrolled</th>
                  <th className="text-center py-3 px-4 font-semibold">Completed</th>
                  <th className="text-center py-3 px-4 font-semibold">Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {courseEnrollment.map((course, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{course.course}</td>
                    <td className="py-3 px-4 text-center">{course.enrolled}</td>
                    <td className="py-3 px-4 text-center">{course.completed}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${(course.completed / course.enrolled) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium min-w-12">
                          {Math.round((course.completed / course.enrolled) * 100)}%
                        </span>
                      </div>
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
