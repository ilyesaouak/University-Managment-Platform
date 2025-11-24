"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingDown, Users, Building2, AlertTriangle } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function DirectorDashboard() {
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
      if (parsedUser.role !== "director") {
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
    <DashboardLayout userRole="director" userName={user.name}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-primary-foreground">
          <h1 className="text-3xl font-bold mb-2">Aperçu du Département</h1>
          <p className="opacity-90">Gérez les opérations et les analyses de votre département</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Étudiants</p>
                <p className="text-2xl font-bold">1,240</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Building2 className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Classes</p>
                <p className="text-2xl font-bold">48</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingDown className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taux d'Absentéisme</p>
                <p className="text-2xl font-bold">6.2%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Étudiants à Risque</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Overview */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-lg font-semibold mb-4">Statut du Département</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Cours Offerts</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Bases de Données", "Réseaux", "IA", "Développement Web", "Sécurité", "Cloud"].map((course) => (
                    <div key={course} className="p-2 bg-muted rounded text-sm text-center">
                      {course}
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full bg-transparent" variant="outline">
                Gérer le Département
              </Button>
            </div>
          </Card>

          {/* Director Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            <div className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Créer un Emploi du Temps
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Voir les Analyses
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Gérer le Personnel
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Rapports
              </Button>
            </div>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="p-6 border-destructive/20 bg-destructive/5">
          <h2 className="text-lg font-semibold mb-4 text-destructive">Alertes Importantes</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>3 étudiants éliminés en raison du taux
              d'absence
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Conflit d'emploi du temps détecté dans la Salle 301
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              15 demandes de rattrapage en attente
            </li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  )
}
