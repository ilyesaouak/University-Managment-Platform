"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Clock, FileText } from "lucide-react"

interface Absence {
  id: string
  course: string
  date: string
  teacher: string
  status: "pending" | "excused" | "unjustified"
  excuseSubmitted?: boolean
}

export default function StudentAbsencesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [absences, setAbsences] = useState<Absence[]>([])
  const [selectedAbsence, setSelectedAbsence] = useState<Absence | null>(null)
  const [showExcuseModal, setShowExcuseModal] = useState(false)
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
      loadAbsences()
    } catch {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const loadAbsences = () => {
    const mockAbsences: Absence[] = [
      {
        id: "1",
        course: "Database Systems",
        date: "2025-01-15",
        teacher: "Dr. Ahmed Khalil",
        status: "pending",
        excuseSubmitted: false,
      },
      {
        id: "2",
        course: "Web Development",
        date: "2025-01-13",
        teacher: "Dr. Fatima Hassan",
        status: "excused",
        excuseSubmitted: true,
      },
      {
        id: "3",
        course: "Operating Systems",
        date: "2025-01-10",
        teacher: "Dr. Leila Abdulrahman",
        status: "unjustified",
        excuseSubmitted: false,
      },
    ]
    setAbsences(mockAbsences)
  }

  const handleSubmitExcuse = (reason: string) => {
    if (selectedAbsence) {
      setAbsences(
        absences.map((a) => (a.id === selectedAbsence.id ? { ...a, status: "pending", excuseSubmitted: true } : a)),
      )
      setShowExcuseModal(false)
      setSelectedAbsence(null)
    }
  }

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  const pendingAbsences = absences.filter((a) => a.status === "pending")
  const excusedAbsences = absences.filter((a) => a.status === "excused")
  const unjustifiedAbsences = absences.filter((a) => a.status === "unjustified")
  const absenceRate = ((absences.length / 20) * 100).toFixed(1) // Assuming 20 total classes

  return (
    <DashboardLayout userRole="student" userName={user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Absences</h1>
          <p className="text-muted-foreground">View and submit excuses for your absences</p>
        </div>
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">{pendingAbsences.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Excused</p>
                <p className="text-2xl font-bold">{excusedAbsences.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unjustified</p>
                <p className="text-2xl font-bold">{unjustifiedAbsences.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absence Rate</p>
                <p className="text-2xl font-bold">{absenceRate}%</p>
              </div>
            </div>
          </Card>
        </div>
        {/* Elimination Warning */}
        {absenceRate > 10 && (
          <Card className="p-4 border-destructive/20 bg-destructive/5">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <div>
                <p className="font-semibold">Elimination Risk</p>
                <p className="text-sm">Your absence rate exceeds 10%. You may be eliminated if this continues.</p>
              </div>
            </div>
          </Card>
        )}
        {/* Absences List */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Your Absences</h2>
          <div className="space-y-3">
            {absences.map((absence) => (
              <div
                key={absence.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50"
              >
                <div className="flex-1">
                  <p className="font-semibold">{absence.course}</p>
                  <p className="text-sm text-muted-foreground">
                    {absence.date} • {absence.teacher}
                  </p>
                  {absence.excuseSubmitted && <p className="text-xs text-green-600 mt-1">Excuse submitted</p>}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      absence.status === "pending"
                        ? "bg-accent/10 text-accent"
                        : absence.status === "excused"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {absence.status.charAt(0).toUpperCase() + absence.status.slice(1)}
                  </span>
                  {absence.status === "pending" && !absence.excuseSubmitted && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedAbsence(absence)
                        setShowExcuseModal(true)
                      }}
                    >
                      Submit Excuse
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
        {/* Excuse Modal */}
        {showExcuseModal && selectedAbsence && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-2">Submit Excuse</h2>
              <p className="text-sm text-muted-foreground mb-4">
                For absence on {selectedAbsence.date} from {selectedAbsence.course}
              </p>
              <ExcuseForm onSubmit={handleSubmitExcuse} onCancel={() => setShowExcuseModal(false)} />
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function ExcuseForm({ onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    reason: "",
    attachment: null as File | null,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData.reason)
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Reason for Absence</label>
        <textarea
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          rows={4}
          placeholder="Please explain your absence..."
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Supporting Document (Optional)</label>
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, attachment: e.target.files?.[0] || null })}
          className="w-full px-3 py-2 border border-border rounded-lg"
        />
      </div>
      <div className="flex gap-2 justify-end pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit Excuse</Button>
      </div>
    </form>
  )
}
