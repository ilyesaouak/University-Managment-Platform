"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingDown } from "lucide-react"

interface StudentAbsenceRecord {
  id: string
  name: string
  absenceCount: number
  eliminationRisk: boolean
  courses: string[]
}

export default function DirectorAbsencesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<StudentAbsenceRecord[]>([])
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
      loadData()
    } catch {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const loadData = () => {
    const mockStudents: StudentAbsenceRecord[] = [
      {
        id: "1",
        name: "Ali Ahmed",
        absenceCount: 12,
        eliminationRisk: true,
        courses: ["Database", "Web Dev"],
      },
      {
        id: "2",
        name: "Noor Hassan",
        absenceCount: 8,
        eliminationRisk: true,
        courses: ["Algorithms", "Networks"],
      },
      {
        id: "3",
        name: "Karim Saleh",
        absenceCount: 5,
        eliminationRisk: false,
        courses: ["Database", "Security"],
      },
      {
        id: "4",
        name: "Sara Ibrahim",
        absenceCount: 3,
        eliminationRisk: false,
        courses: ["Web Dev"],
      },
    ]
    setStudents(mockStudents)
  }

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  const atRiskStudents = students.filter((s) => s.eliminationRisk)
  const avgAbsence = (students.reduce((sum, s) => sum + s.absenceCount, 0) / students.length).toFixed(1)

  return (
    <DashboardLayout userRole="director" userName={user.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Department Absences</h1>
            <p className="text-muted-foreground">Monitor student attendance and absences</p>
          </div>
          <Button>Export Report</Button>
        </div>

        {/* Risk Alert */}
        {atRiskStudents.length > 0 && (
          <Card className="p-4 border-destructive/20 bg-destructive/5">
            <div className="flex items-center gap-3 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              <div>
                <p className="font-semibold">{atRiskStudents.length} Students at Elimination Risk</p>
                <p className="text-sm">Students have exceeded absence limits</p>
              </div>
            </div>
          </Card>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Absences</p>
                <p className="text-2xl font-bold">{avgAbsence}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-2xl font-bold text-destructive">{atRiskStudents.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* At-Risk Students */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Students at Elimination Risk</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-center py-3 px-4 font-semibold">Absences</th>
                  <th className="text-left py-3 px-4 font-semibold">Courses</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {atRiskStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{student.name}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 rounded bg-destructive/10 text-destructive font-semibold">
                        {student.absenceCount}
                      </span>
                    </td>
                    <td className="py-3 px-4">{student.courses.join(", ")}</td>
                    <td className="py-3 px-4 text-right">
                      <Button size="sm" variant="outline">
                        Send Alert
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* All Students */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">All Students Attendance</h2>
          <div className="space-y-2">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.courses.join(", ")}</p>
                </div>
                <span className={`font-semibold ${student.eliminationRisk ? "text-destructive" : "text-green-600"}`}>
                  {student.absenceCount} absences
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
