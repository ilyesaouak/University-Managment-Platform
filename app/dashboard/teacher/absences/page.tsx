"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface StudentAttendance {
  id: string
  name: string
  present: boolean | null
  marked: boolean
}

export default function TeacherAbsencesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedClass, setSelectedClass] = useState("1")
  const [attendance, setAttendance] = useState<StudentAttendance[]>([])
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
      loadAttendance()
    } catch {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const loadAttendance = () => {
    const mockAttendance: StudentAttendance[] = [
      { id: "1", name: "Ahmed Hassan", present: null, marked: false },
      { id: "2", name: "Fatima Ali", present: null, marked: false },
      { id: "3", name: "Mohamed Ibrahim", present: null, marked: false },
      { id: "4", name: "Leila Omar", present: null, marked: false },
      { id: "5", name: "Omar Saleh", present: null, marked: false },
      { id: "6", name: "Aisha Karim", present: null, marked: false },
    ]
    setAttendance(mockAttendance)
  }

  const handleMarkAttendance = (studentId: string, present: boolean) => {
    setAttendance(attendance.map((a) => (a.id === studentId ? { ...a, present, marked: true } : a)))
  }

  const handleSaveAttendance = () => {
    console.log("Attendance saved:", attendance)
    alert("Attendance marked successfully!")
  }

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  const presentCount = attendance.filter((a) => a.present === true).length
  const absentCount = attendance.filter((a) => a.present === false).length

  return (
    <DashboardLayout userRole="teacher" userName={user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mark Attendance</h1>
          <p className="text-muted-foreground">Record student attendance for your classes</p>
        </div>

        {/* Class Selection */}
        <Card className="p-4">
          <label className="block text-sm font-medium mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="1">Database Systems - Group A (Monday 09:00)</option>
            <option value="2">Database Systems - Group B (Monday 11:00)</option>
            <option value="3">Database Lab (Tuesday 14:00)</option>
          </select>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{attendance.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-destructive">{absentCount}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Attendance Grid */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Student Attendance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {attendance.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50"
              >
                <span className="font-medium">{student.name}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={student.present === true ? "default" : "outline"}
                    className={student.present === true ? "bg-green-500 hover:bg-green-600" : ""}
                    onClick={() => handleMarkAttendance(student.id, true)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Present
                  </Button>
                  <Button
                    size="sm"
                    variant={student.present === false ? "default" : "outline"}
                    className={student.present === false ? "bg-destructive hover:bg-destructive/90" : ""}
                    onClick={() => handleMarkAttendance(student.id, false)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Absent
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Save Button */}
        <Button className="w-full py-6 text-lg" onClick={handleSaveAttendance}>
          Save Attendance
        </Button>
      </div>
    </DashboardLayout>
  )
}
