"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Plus } from "lucide-react"

interface ScheduleCell {
  time: string
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
}

export default function DirectorSchedulesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [department] = useState("Génie Civil")

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

  const schedule: ScheduleCell[] = [
    {
      time: "8h30\nà\n10h00",
      monday: "Mathématique 1\n\nChraygui MK\nSI 08",
      tuesday: "Atelier Technologies\nde Construction 1\n\nRekik H\nSI 08",
      wednesday: "Statique\n\nHaddad S\nSI 08",
      thursday: "Mathématique 1\n\nChraygui MK\nSI 08",
      friday: "Français\n\nToumi M\nSI 08",
      saturday: "",
    },
    {
      time: "10h10\nà\n11h40",
      monday: "Statique\n\nHaddad S\nSI 08",
      tuesday: "",
      wednesday: "Matériaux de\nConstruction 1\n\nHammadi H\nSI 08",
      thursday: "Anglais 1\n\nBouyahya N\nSI 08",
      friday: "2CN\n\nMbarki R\nLI 07",
      saturday: "",
    },
    {
      time: "11h50\nà\n13h20",
      monday: "Topographie\ngénérale 1\n\nElleuch H\nSI 08",
      tuesday: "Technologies de\nConstruction 1\n\nBelgacem Z\nSI 08",
      wednesday: "Matériaux de\nConstruction 1\n\nHammadi H\nSI 08",
      thursday: "Technologies de\nConstruction 1\n\nBelgacem Z\nSI 08",
      friday: "",
      saturday: "",
    },
    {
      time: "14h30\nà\n16h00",
      monday: "Dessin 1 - G1\n\nRekik H\nSI 07\nAtelier de génie civil",
      tuesday: "Dessin 1 - G2\n\nRekik H\nSI 07",
      wednesday: "",
      thursday: "Atelier Matériaux de\nConstruction\n\nHammadi H\nLM 04",
      friday: "Atelier Topographie\n\nZadvi A\nLM 02",
      saturday: "",
    },
    {
      time: "16h10\nà\n17h40",
      monday: "- G2\n\nBelgacem Z\nLM 03",
      tuesday: "Atelier de génie civil\n- G1\n\nBelgacem Z\nLM 03",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
    },
  ]

  if (isLoading || !user) {
    return <div>Chargement...</div>
  }

  return (
    <DashboardLayout userRole="director" userName={user.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Emplois du Temps</h1>
            <p className="text-muted-foreground">Créez et gérez les horaires du département</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Créer un Emploi du Temps
          </Button>
        </div>

        {/* Department Info */}
        <Card className="p-6 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Département</p>
              <p className="font-semibold text-lg">{department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Groupe</p>
              <p className="font-semibold text-lg">GC 12</p>
            </div>
          </div>
        </Card>

        {/* Conflicts Alert */}
        <Card className="p-4 border-amber-200 bg-amber-50">
          <div className="flex items-center gap-3 text-amber-700">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <p className="font-semibold">Emploi du Temps Validé</p>
              <p className="text-sm text-amber-600">Aucun conflit détecté</p>
            </div>
          </div>
        </Card>

        {/* Timetable */}
        <Card className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-border bg-amber-700 text-white p-3 text-center font-bold">Horaire</th>
                <th className="border border-border bg-amber-100 p-3 text-center font-bold">Lundi</th>
                <th className="border border-border bg-amber-100 p-3 text-center font-bold">Mardi</th>
                <th className="border border-border bg-amber-100 p-3 text-center font-bold">Mercredi</th>
                <th className="border border-border bg-amber-100 p-3 text-center font-bold">Jeudi</th>
                <th className="border border-border bg-amber-100 p-3 text-center font-bold">Vendredi</th>
                <th className="border border-border bg-amber-100 p-3 text-center font-bold">Samedi</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, idx) => (
                <tr key={idx}>
                  <td className="border border-border bg-gray-50 p-2 text-center font-semibold whitespace-pre-line text-xs">
                    {row.time}
                  </td>
                  <td className="border border-border p-2 bg-amber-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.monday}</div>
                  </td>
                  <td className="border border-border p-2 bg-amber-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.tuesday}</div>
                  </td>
                  <td className="border border-border p-2 bg-amber-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.wednesday}</div>
                  </td>
                  <td className="border border-border p-2 bg-amber-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.thursday}</div>
                  </td>
                  <td className="border border-border p-2 bg-amber-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.friday}</div>
                  </td>
                  <td className="border border-border p-2 bg-amber-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.saturday}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </DashboardLayout>
  )
}
