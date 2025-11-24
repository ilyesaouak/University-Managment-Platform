"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Shield, Network, Users } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function AdminDashboard() {
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
      if (parsedUser.role !== "admin") {
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
    <DashboardLayout userRole="admin" userName={user.name}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-primary-foreground">
          <h1 className="text-3xl font-bold mb-2">Administration du Système</h1>
          <p className="opacity-90">Gérez les opérations et la configuration à l'échelle de l'université</p>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Utilisateurs Totaux</p>
                <p className="text-2xl font-bold">5,230</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Network className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Départements</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Santé du Système</p>
                <p className="text-2xl font-bold">99.9%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Statut de Sécurité</p>
                <p className="text-2xl font-bold">Sécurisé</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Admin Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Management */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-lg font-semibold mb-4">Gestion du Système</h2>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                <span>Gestion des Utilisateurs</span>
                <Button size="sm" variant="ghost">
                  Configurer
                </Button>
              </div>
              <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                <span>Configuration des Départements</span>
                <Button size="sm" variant="ghost">
                  Configurer
                </Button>
              </div>
              <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                <span>Gestion des Cours</span>
                <Button size="sm" variant="ghost">
                  Configurer
                </Button>
              </div>
              <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                <span>Gestion de l'Emploi du Temps</span>
                <Button size="sm" variant="ghost">
                  Configurer
                </Button>
              </div>
              <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                <span>Sauvegarde du Système</span>
                <Button size="sm" variant="ghost">
                  Exécuter
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Actions Rapides</h2>
            <div className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Ajouter Utilisateur
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Ajouter Département
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Journaux Système
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Paramètres
              </Button>
            </div>
          </Card>
        </div>

        {/* System Status */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Statut du Système</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Base de Données</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">En Ligne</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Serveur API</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">En Ligne</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Service de Sauvegarde</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">En Ligne</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
