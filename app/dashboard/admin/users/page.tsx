"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2, Download } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "director" | "admin"
  department?: string
  createdAt: string
}

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
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

    loadUsers()
  }, [router])

  const loadUsers = () => {
    const mockUsers: User[] = [
      {
        id: "1",
        name: "Ahmed Khalil",
        email: "ahmed.khalil@university.edu",
        role: "teacher",
        department: "Technologie de l'Information",
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        name: "Fatima Hassan",
        email: "fatima.hassan@university.edu",
        role: "student",
        department: "Technologie de l'Information",
        createdAt: "2024-02-01",
      },
      {
        id: "3",
        name: "Mohamed Saleh",
        email: "mohamed.saleh@university.edu",
        role: "director",
        department: "Génie Mécanique",
        createdAt: "2024-01-10",
      },
      {
        id: "4",
        name: "Leila Abdulrahman",
        email: "leila.abdulrahman@university.edu",
        role: "teacher",
        department: "Génie Civil",
        createdAt: "2024-01-20",
      },
      {
        id: "5",
        name: "Omar Hassan",
        email: "omar.hassan@university.edu",
        role: "student",
        department: "Génie Électrique",
        createdAt: "2024-02-05",
      },
    ]
    setUsers(mockUsers)
    setIsLoading(false)
  }

  const handleAddUser = (newUser: Partial<User>) => {
    const user: User = {
      id: Math.random().toString(),
      name: newUser.name || "",
      email: newUser.email || "",
      role: newUser.role || "student",
      department: newUser.department || "",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setUsers([...users, user])
    setShowModal(false)
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
    setEditingUser(null)
    setShowModal(false)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleExport = () => {
    const csv = [
      ["ID", "Nom", "Email", "Rôle", "Département", "Créé le"],
      ...users.map((u) => [u.id, u.name, u.email, u.role, u.department || "", u.createdAt]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "utilisateurs.csv"
    a.click()
  }

  if (isLoading) return <div>Chargement...</div>

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
            <p className="text-muted-foreground">Gérez tous les utilisateurs du système</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button
              onClick={() => {
                setEditingUser(null)
                setShowModal(true)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Utilisateur
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="all">Tous les Rôles</option>
              <option value="student">Étudiant</option>
              <option value="teacher">Enseignant</option>
              <option value="director">Directeur</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Rôle</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Département</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Créé</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {user.role === "student" && "Étudiant"}
                        {user.role === "teacher" && "Enseignant"}
                        {user.role === "director" && "Directeur"}
                        {user.role === "admin" && "Admin"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{user.department || "-"}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.createdAt}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingUser(user)
                            setShowModal(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteUser(user.id)}
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

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4 text-foreground">
                {editingUser ? "Modifier l'Utilisateur" : "Ajouter un Nouvel Utilisateur"}
              </h2>
              <UserForm
                user={editingUser}
                onSubmit={(formData) => {
                  if (editingUser) {
                    handleUpdateUser({ ...editingUser, ...formData })
                  } else {
                    handleAddUser(formData)
                  }
                }}
                onCancel={() => setShowModal(false)}
              />
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function UserForm({
  user,
  onSubmit,
  onCancel,
}: {
  user?: User | null
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "student",
    department: user?.department || "",
    password: user ? "" : "",
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
        <label className="block text-sm font-medium mb-1 text-foreground">Nom</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-background text-foreground border-border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-background text-foreground border-border"
        />
      </div>
      {!user && (
        <div>
          <label className="block text-sm font-medium mb-1 text-foreground">Mot de passe</label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Entrez le mot de passe du nouvel utilisateur"
            required
            className="bg-background text-foreground border-border"
          />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Rôle</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
        >
          <option value="student">Étudiant</option>
          <option value="teacher">Enseignant</option>
          <option value="director">Directeur</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Département</label>
        <Input
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          className="bg-background text-foreground border-border"
        />
      </div>
      <div className="flex gap-2 justify-end pt-4 border-t border-border">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">Enregistrer l'Utilisateur</Button>
      </div>
    </form>
  )
}
