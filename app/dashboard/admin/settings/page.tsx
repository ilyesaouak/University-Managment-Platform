"use client"

import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function SettingsPage() {
  const router = useRouter()
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

    setIsLoading(false)
  }, [router])

  if (isLoading) return <div>Chargement...</div>

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres du Système</h1>
          <p className="text-muted-foreground">Configurez les paramètres à l'échelle du système</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Gestion des Données</h2>
            <p className="text-sm text-muted-foreground mb-4">Importez et exportez les données du système</p>
            <div className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Importer Utilisateurs (CSV)
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Exporter Toutes les Données
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Sauvegarder la Base de Données
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Paramètres Académiques</h2>
            <p className="text-sm text-muted-foreground mb-4">Configurez le calendrier académique</p>
            <div className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Configuration du Semestre
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Gestion des Congés
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Échelles de Notes
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Sécurité</h2>
            <p className="text-sm text-muted-foreground mb-4">Gérez les politiques de sécurité</p>
            <div className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Permissions des Utilisateurs
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Journaux d'Accès
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Paramètres 2FA
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Maintenance du Système</h2>
            <p className="text-sm text-muted-foreground mb-4">Opérations et mises à jour du système</p>
            <div className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Vérifier les Mises à Jour
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Vider le Cache
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                État du Système
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
