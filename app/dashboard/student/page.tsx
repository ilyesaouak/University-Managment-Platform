"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Clock, BookOpen, Users } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function StudentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
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
    } catch (error) {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading || !user) {
    return <div>Chargement...</div>
  }

  return (
    <DashboardLayout userRole="student" userName={user.name}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-primary-foreground">
          <h1 className="text-3xl font-bold mb-2">Bienvenue, {user.name}!</h1>
          <p className="opacity-90">Voici un aperçu de votre portail universitaire</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cours Aujourd'hui</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absences</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Votre Moyenne</p>
                <p className="text-2xl font-bold">3.8</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alertes</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Classes */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-lg font-semibold mb-4">Votre Emploi du Temps</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Gestion des Bases de Données</p>
                    <p className="text-sm text-muted-foreground">Salle 102 • Dr. Ahmed Khalil</p>
                  </div>
                  <span className="text-sm font-medium text-primary">9:00 AM</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              Voir l'Emploi du Temps Complet
            </Button>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Actions Rapides</h2>
            <div className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Demander une Absence
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Message à l'Enseignant
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Voir les Notes
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Contacter l'Admin
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Messages */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Messages Récents</h2>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  A
                </div>
                <div className="flex-1">
                  <p className="font-medium">Professeur Ahmed</p>
                  <p className="text-sm text-muted-foreground">Veuillez réviser l'assignation...</p>
                </div>
                <span className="text-xs text-muted-foreground">Il y a 2 heures</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
