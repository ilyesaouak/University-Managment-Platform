"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, CheckCircle, Clock } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function TeacherDashboard() {
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
      if (parsedUser.role !== "teacher") {
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
    <DashboardLayout userRole="teacher" userName={user.name}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-primary-foreground">
          <h1 className="text-3xl font-bold mb-2">Bienvenue, {user.name}!</h1>
          <p className="opacity-90">Gérez vos classes et vos interactions avec les étudiants</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Étudiants</p>
                <p className="text-2xl font-bold">142</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cours Aujourd'hui</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taux de Présence</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Demandes en Attente</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Classes */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-lg font-semibold mb-4">Cours d'Aujourd'hui</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Systèmes de Bases de Données - Groupe {i}</p>
                    <p className="text-sm text-muted-foreground">Salle {100 + i} • 45 étudiants</p>
                  </div>
                  <span className="text-sm font-medium text-primary">{9 + i}:00 AM</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              Gérer l'Emploi du Temps
            </Button>
          </Card>

          {/* Teacher Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Actions Rapides</h2>
            <div className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Marquer la Présence
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Voir les Absences
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Publier les Notes
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Message aux Étudiants
              </Button>
            </div>
          </Card>
        </div>

        {/* Absence Requests */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Demandes d'Absence en Attente</h2>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Demande d'Absence de l'Étudiant {i}</p>
                  <p className="text-sm text-muted-foreground">Demandée il y a 1 heure</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="default">
                    Approuver
                  </Button>
                  <Button size="sm" variant="outline">
                    Rejeter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
