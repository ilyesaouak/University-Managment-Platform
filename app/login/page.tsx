"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

type UserRole = "student" | "teacher" | "director" | "admin"

interface LoginCredentials {
  email: string
  password: string
  role: UserRole
}

export default function LoginPage() {
  const router = useRouter()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
    role: "student",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate authentication
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message || "Échec de la connexion")
        return
      }

      const data = await response.json()

      // Store token and user info
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Route to appropriate dashboard
      const dashboardPath = {
        student: "/dashboard/student",
        teacher: "/dashboard/teacher",
        director: "/dashboard/director",
        admin: "/dashboard/admin",
      }[credentials.role]

      router.push(dashboardPath)
    } catch (err) {
      setError("Une erreur s'est produite lors de la connexion. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (role: UserRole) => {
    setCredentials((prev) => ({ ...prev, role }))
    // Simulate quick login for demo
    setTimeout(() => {
      localStorage.setItem("token", "demo-token")
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          email: `demo-${role}@university.edu`,
          role: role,
          name: `Démo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
        }),
      )

      const dashboardPath = {
        student: "/dashboard/student",
        teacher: "/dashboard/teacher",
        director: "/dashboard/director",
        admin: "/dashboard/admin",
      }[role]

      router.push(dashboardPath)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C6.5 6.253 3 9.756 3 14s3.5 7.747 9 7.747m0-13c5.5 0 9 3.503 9 7.747m0 0c0 4.244-3.5 7.747-9 7.747m0-13v13"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground">UniManager</h1>
          <p className="text-muted-foreground">Plateforme de Gestion Universitaire</p>
        </div>

        {/* Login Form */}
        <Card className="p-6 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="votre.email@universite.edu"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Mot de passe</label>
              <Input
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Rôle</label>
              <select
                name="role"
                value={credentials.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="student">Étudiant</option>
                <option value="teacher">Enseignant</option>
                <option value="director">Directeur de Département</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Connexion"}
            </Button>
          </form>

          {/* Demo Access Section */}
          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-xs text-muted-foreground text-center font-semibold">Exemples de Comptes Réels</p>
            <div className="space-y-2 bg-muted/50 p-3 rounded-lg text-xs">
              <div>
                <strong>Technologie de l'Information:</strong>
              </div>
              <div className="ml-2 space-y-1 mb-2">
                <div>Directeur: director.ti@university.edu</div>
                <div>Enseignant: teacher.ti1@university.edu</div>
                <div>Étudiant: student.ti1@university.edu</div>
              </div>
              <div>
                <strong>Génie Mécanique:</strong>
              </div>
              <div className="ml-2 space-y-1 mb-2">
                <div>Directeur: director.gm@university.edu</div>
                <div>Enseignant: teacher.gm1@university.edu</div>
                <div>Étudiant: student.gm1@university.edu</div>
              </div>
              <div>
                <strong>Génie Civil:</strong>
              </div>
              <div className="ml-2 space-y-1 mb-2">
                <div>Directeur: director.gc@university.edu</div>
                <div>Enseignant: teacher.gc1@university.edu</div>
                <div>Étudiant: student.gc1@university.edu</div>
              </div>
              <div>
                <strong>Génie Électrique:</strong>
              </div>
              <div className="ml-2 space-y-1">
                <div>Directeur: director.ge@university.edu</div>
                <div>Enseignant: teacher.ge1@university.edu</div>
                <div>Étudiant: student.ge1@university.edu</div>
              </div>
              <div className="mt-2 pt-2 border-t border-border">
                <strong>Admin:</strong> admin@university.edu
              </div>
              <div className="text-muted-foreground">
                Mot de passe pour tous: <strong>password123</strong>
              </div>
            </div>
          </div>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Première visite? Contactez votre administrateur pour accéder.
        </p>
      </div>
    </div>
  )
}
