"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, AlertTriangle } from "lucide-react"

export default function AdminSchedulesPage() {
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

  const departments = [
    { name: "Technologie de l'Information", courses: 24, classes: 48, conflicts: 2, status: "En attente" },
    { name: "Génie Mécanique", courses: 20, classes: 40, conflicts: 3, status: "En attente" },
    { name: "Génie Civil", courses: 18, classes: 36, conflicts: 1, status: "Validé" },
    { name: "Génie Électrique", courses: 22, classes: 44, conflicts: 2, status: "En attente" },
  ]

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestion Globale des Emplois du Temps</h1>
            <p className="text-muted-foreground">Supervisez les emplois du temps de tous les départements</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Créer un Emploi Global
          </Button>
        </div>

        {/* Alert */}
        <Card className="p-4 border-destructive/20 bg-destructive/5">
          <div className="flex items-center gap-3 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <p className="font-semibold">8 Conflits Non Résolus dans les Départements</p>
              <p className="text-sm text-destructive/80">Vérifiez et résolvez les conflits des départements</p>
            </div>
          </div>
        </Card>

        {/* Department Schedule Status */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">État des Emplois du Temps par Département</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Département</th>
                  <th className="text-center py-3 px-4 font-semibold">Cours</th>
                  <th className="text-center py-3 px-4 font-semibold">Classes</th>
                  <th className="text-center py-3 px-4 font-semibold">Conflits</th>
                  <th className="text-center py-3 px-4 font-semibold">État</th>
                  <th className="text-right py-3 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.name} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{dept.name}</td>
                    <td className="py-3 px-4 text-center">{dept.courses}</td>
                    <td className="py-3 px-4 text-center">{dept.classes}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-destructive font-semibold">{dept.conflicts}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          dept.status === "Validé" ? "bg-green-100 text-green-700" : "bg-accent/10 text-accent"
                        }`}
                      >
                        {dept.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button size="sm" variant="outline">
                        Vérifier
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* System Wide Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">84</p>
            <p className="text-sm text-muted-foreground mt-1">Cours au Total</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-secondary">168</p>
            <p className="text-sm text-muted-foreground mt-1">Classes Planifiées</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-accent">8</p>
            <p className="text-sm text-muted-foreground mt-1">Conflits Actifs</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">94%</p>
            <p className="text-sm text-muted-foreground mt-1">Résolus</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
