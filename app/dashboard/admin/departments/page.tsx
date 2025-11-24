"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Department {
  id: string
  name: string
  head: string
  courses: number
  students: number
  teachers: number
  createdAt: string
}

export default function DepartmentsPage() {
  const router = useRouter()
  const [departments, setDepartments] = useState<Department[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingDept, setEditingDept] = useState<Department | null>(null)
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

    loadDepartments()
  }, [router])

  const loadDepartments = () => {
    const mockDepts: Department[] = [
      {
        id: "1",
        name: "Technologie de l'Information",
        head: "Haithem Hafsi",
        courses: 24,
        students: 320,
        teachers: 12,
        createdAt: "2023-09-01",
      },
      {
        id: "2",
        name: "Génie Mécanique",
        head: "Hassen Ayed CHRAYGA",
        courses: 20,
        students: 280,
        teachers: 10,
        createdAt: "2023-09-01",
      },
      {
        id: "3",
        name: "Génie Civil",
        head: "Abdelaziz BEN NASR",
        courses: 18,
        students: 240,
        teachers: 8,
        createdAt: "2023-09-01",
      },
      {
        id: "4",
        name: "Génie Électrique",
        head: "Imed LASSOUED",
        courses: 22,
        students: 300,
        teachers: 11,
        createdAt: "2023-09-01",
      },
    ]
    setDepartments(mockDepts)
    setIsLoading(false)
  }

  const handleAddDept = (data: any) => {
    const dept: Department = {
      id: Math.random().toString(),
      ...data,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setDepartments([...departments, dept])
    setShowModal(false)
  }

  const handleDeleteDept = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id))
  }

  if (isLoading) return <div>Chargement...</div>

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Départements</h1>
            <p className="text-muted-foreground">Gérez les départements de l'université</p>
          </div>
          <Button
            onClick={() => {
              setEditingDept(null)
              setShowModal(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un Département
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <Card key={dept.id} className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground">Directeur: {dept.head}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{dept.courses}</p>
                    <p className="text-xs text-muted-foreground">Cours</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{dept.students}</p>
                    <p className="text-xs text-muted-foreground">Étudiants</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{dept.teachers}</p>
                    <p className="text-xs text-muted-foreground">Enseignants</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setEditingDept(dept)
                      setShowModal(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-destructive hover:text-destructive bg-transparent"
                    onClick={() => handleDeleteDept(dept.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4 text-foreground">
                {editingDept ? "Modifier le Département" : "Ajouter un Département"}
              </h2>
              <DeptForm
                dept={editingDept}
                onSubmit={
                  editingDept
                    ? (data) => {
                        setDepartments(
                          departments.map((d) => (d.id === editingDept.id ? { ...editingDept, ...data } : d)),
                        )
                        setEditingDept(null)
                        setShowModal(false)
                      }
                    : handleAddDept
                }
                onCancel={() => setShowModal(false)}
              />
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function DeptForm({ dept, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: dept?.name || "",
    head: dept?.head || "",
    courses: dept?.courses || 0,
    students: dept?.students || 0,
    teachers: dept?.teachers || 0,
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
        <label className="block text-sm font-medium mb-1 text-foreground">Nom du Département</label>
        <Input
          placeholder="Nom du Département"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-background text-foreground border-border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Directeur du Département</label>
        <Input
          placeholder="Directeur du Département"
          value={formData.head}
          onChange={(e) => setFormData({ ...formData, head: e.target.value })}
          required
          className="bg-background text-foreground border-border"
        />
      </div>
      <div className="flex gap-2 justify-end pt-4 border-t border-border">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">{dept ? "Mettre à jour" : "Créer"}</Button>
      </div>
    </form>
  )
}
