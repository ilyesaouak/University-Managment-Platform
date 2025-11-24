"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"

export default function DirectorProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
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
    } catch {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="director" userName={user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <p className="text-muted-foreground">Gérez les paramètres de votre compte</p>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Informations du Profil</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom Complet</label>
                <div className="p-2 bg-muted rounded">{user.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="p-2 bg-muted rounded">{user.email}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
