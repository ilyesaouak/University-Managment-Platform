"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface ScheduleCell {
  time: string
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
}

export default function TeacherSchedulePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [department] = useState("Génie Mécanique")

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
    } catch {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const schedule: ScheduleCell[] = [
    {
      time: "8h30\nà\n10h00",
      monday: "",
      tuesday: "Anglais technique 1\n\nChorfi I\nSG 08",
      wednesday: "Thermodynamique\n\nMansouri A\nSG 08",
      thursday: "Qualité et sécurité\nindustrielle\n\nBen Slama S\nSG 08",
      friday: "Analyse Systèmes\nindustriels\n\nAmroussi F\nSG 08",
      saturday: "Techniques de\ncommunication 1\n\nToumi M\nSG 08",
    },
    {
      time: "10h10\nà\n11h40",
      monday: "Mécanique des\nfluides\n\nTwadla Z\nSG 08",
      tuesday: "Atelier\nasservissement\n\nBenchikh R\nLM 06",
      wednesday: "Bases de données\n\nHadhri A\nSG 08",
      thursday: "Régulation et\nasservissement\n\nBenchikh R\nSG 08",
      friday: "Mop2.2\nAtelier\nFPGA et VHDL",
      saturday: "Mesures, test et\ndiagnostic\n\nAmroussi F\nSG 08",
    },
    {
      time: "11h50\nà\n13h20",
      monday: "Automatisme\nindustriel\n\nJeddi N\nSG 08",
      tuesday: "Atelier\nd'informatique\n\nHadhri A\nLG 04",
      wednesday: "Algorithme\n\nHadhri A\nSG 08",
      thursday: "Droit de travail\n\nHadhri A\nSG 08",
      friday: "Lab\nCAO-GMAO\nK.BACCARI",
      saturday: "",
    },
    {
      time: "14h30\nà\n16h00",
      monday: "",
      tuesday: "Atelier Mécanique 3\n\nTwadla Z\nLM02",
      wednesday: "",
      thursday: "Atelier Sys info\n\nBaccari K\nLM 04\nAtelier Qualité et",
      friday: "Atelier Automatisme\nindustriel\n\nBenchikh R\nLE 02",
      saturday: "",
    },
    {
      time: "16h10\nà\n17h40",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "sécurité industrielle\n\nBen Slama S\nLG 04",
      friday: "Atelier\nSystèmes industriels\n\nAmroussi F\nLM 05",
      saturday: "",
    },
  ]

  if (isLoading || !user) {
    return <div>Chargement...</div>
  }

  return (
    <DashboardLayout userRole="teacher" userName={user.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Mon Emploi du Temps</h1>
            <p className="text-muted-foreground">Gérez vos cours et horaires</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un Cours
          </Button>
        </div>

        {/* Department Info */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Département</p>
              <p className="font-semibold text-lg">{department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Groupe</p>
              <p className="font-semibold text-lg">MI 2</p>
            </div>
          </div>
        </Card>

        {/* Timetable */}
        <Card className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-border bg-green-600 text-white p-3 text-center font-bold">Horaire</th>
                <th className="border border-border bg-green-100 p-3 text-center font-bold">Lundi</th>
                <th className="border border-border bg-green-100 p-3 text-center font-bold">Mardi</th>
                <th className="border border-border bg-green-100 p-3 text-center font-bold">Mercredi</th>
                <th className="border border-border bg-green-100 p-3 text-center font-bold">Jeudi</th>
                <th className="border border-border bg-green-100 p-3 text-center font-bold">Vendredi</th>
                <th className="border border-border bg-green-100 p-3 text-center font-bold">Samedi</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, idx) => (
                <tr key={idx}>
                  <td className="border border-border bg-gray-50 p-2 text-center font-semibold whitespace-pre-line text-xs">
                    {row.time}
                  </td>
                  <td className="border border-border p-2 bg-green-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.monday}</div>
                  </td>
                  <td className="border border-border p-2 bg-green-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.tuesday}</div>
                  </td>
                  <td className="border border-border p-2 bg-green-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.wednesday}</div>
                  </td>
                  <td className="border border-border p-2 bg-green-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.thursday}</div>
                  </td>
                  <td className="border border-border p-2 bg-green-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.friday}</div>
                  </td>
                  <td className="border border-border p-2 bg-green-50 whitespace-pre-line text-xs h-32">
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
