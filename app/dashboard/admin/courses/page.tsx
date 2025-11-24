"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Course {
  id: string
  name: string
  code: string
  department: string
  teacher: string
  credits: number
  students: number
}

export default function CoursesPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [showModal, setShowModal] = useState(false)
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

    loadCourses()
  }, [router])

  const loadCourses = () => {
    const mockCourses: Course[] = [
      {
        id: "1",
        name: "Systèmes de Gestion de Bases de Données",
        code: "TI301",
        department: "Technologie de l'Information",
        teacher: "Ahmed Khalil",
        credits: 3,
        students: 45,
      },
      {
        id: "2",
        name: "Développement Web",
        code: "TI201",
        department: "Technologie de l'Information",
        teacher: "Fatima Hassan",
        credits: 3,
        students: 38,
      },
      {
        id: "3",
        name: "Structures de Données",
        code: "TI101",
        department: "Technologie de l'Information",
        teacher: "Mohamed Saleh",
        credits: 4,
        students: 52,
      },
    ]
    setCourses(mockCourses)
    setIsLoading(false)
  }

  const handleAddCourse = (data: any) => {
    const course: Course = {
      id: Math.random().toString(),
      ...data,
    }
    setCourses([...courses, course])
    setShowModal(false)
  }

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id))
  }

  if (isLoading) return <div>Chargement...</div>

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Cours</h1>
            <p className="text-muted-foreground">Gérez tous les cours</p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un Cours
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Département</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Enseignant</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Crédits</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Étudiants</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium">{course.code}</td>
                    <td className="px-6 py-4 text-sm">{course.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{course.department}</td>
                    <td className="px-6 py-4 text-sm">{course.teacher}</td>
                    <td className="px-6 py-4 text-center text-sm">{course.credits}</td>
                    <td className="px-6 py-4 text-center text-sm">{course.students}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4 text-foreground">Ajouter un Cours</h2>
              <CourseForm onSubmit={handleAddCourse} onCancel={() => setShowModal(false)} />
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function CourseForm({ onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
    teacher: "",
    credits: 3,
    students: 0,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Code du Cours</label>
        <Input
          placeholder="Code du Cours (ex: TI301)"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          required
          className="bg-background text-foreground border-border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Nom du Cours</label>
        <Input
          placeholder="Nom du Cours"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-background text-foreground border-border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Département</label>
        <Input
          placeholder="Département"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
          className="bg-background text-foreground border-border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Enseignant</label>
        <Input
          placeholder="Enseignant"
          value={formData.teacher}
          onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
          required
          className="bg-background text-foreground border-border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Crédits</label>
        <Input
          type="number"
          placeholder="Crédits"
          value={formData.credits}
          onChange={(e) => setFormData({ ...formData, credits: Number.parseInt(e.target.value) })}
          className="bg-background text-foreground border-border"
        />
      </div>
      <div className="flex gap-2 justify-end pt-4 border-t border-border">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">Ajouter un Cours</Button>
      </div>
    </form>
  )
}
