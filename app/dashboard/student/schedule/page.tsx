"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"

interface ScheduleCell {
  time: string
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
}

export default function StudentSchedulePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [department] = useState("Technologie de l'Information")
  const [group] = useState("TI 11")

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
    } catch {
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const schedule: ScheduleCell[] = [
    {
      time: "8h30\nà\n10h00",
      monday: "Développement\nweb et multimédia I\n\nSourir HEDFI\nLI 09",
      tuesday: "Algorithmique et\nprogrammation 1\n\nIftikhar CHETOUI\nSI 01",
      wednesday: "Architecture des\nOrdinateurs\n\nRana RHILI\nSI 01",
      thursday: "Algorithmique et\nprogrammation 1\n\nIftikhar CHETOUI\nSI 01",
      friday: "",
      saturday: "",
    },
    {
      time: "10h10\nà\n11h40",
      monday: "Atelier\nDéveloppement\nWeb et Multimédia I\n\nSourir HEDFI\nLI 09",
      tuesday: "Mathématique\nAppliquée",
      wednesday: "Systèmes Logiques\n\nWahbi RAJHI\nSI 01",
      thursday: "Technique\nd'expression 1\n\nTaheya BACCARI\nSI 01",
      friday: "IT Essentials\n\nYousra GHAOUAR",
      saturday: "",
    },
    {
      time: "11h50\nà\n13h20",
      monday: "Atelier\nProgrammation\n\nIftikhar CHETOUI",
      tuesday: "Taher BEN YOUSSEF\n\nSI 01",
      wednesday: "Business Culture\n\nDaoud SALAH\nSI 01",
      thursday: "Bureautique\n\nFadwa TOUATI\nLI 09",
      friday: "2CN\n\nTaha SFAYA",
      saturday: "",
    },
    {
      time: "14h30\nà\n16h00",
      monday: "Atelier\nProgrammation\n\nIftikhar CHETOUI\nLI 09\nAtelier\nDéveloppement Web",
      tuesday: "English for\ncomputing 1\n\nIbrahim CHRAIT\nSI 01",
      wednesday: "",
      thursday: "Atelier\nMathématiques\nAppliquées\n\nHouda NAJJARI\nLG 01",
      friday: "",
      saturday: "",
    },
    {
      time: "16h10\nà\n17h40",
      monday: "et Multimédia I\n\nSourir HEDFI",
      tuesday: "",
      wednesday: "",
      thursday: "Atelier Systèmes\nLogiques\n\nRana RHILI\nLG 01",
      friday: "",
      saturday: "",
    },
  ]

  if (isLoading || !user) {
    return <div>Chargement...</div>
  }

  return (
    <DashboardLayout userRole="student" userName={user.name}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Mon Emploi du Temps</h1>
          <p className="text-muted-foreground">Visualisez vos cours et votre horaire</p>
        </div>

        {/* Schedule Info */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Département</p>
              <p className="font-semibold text-lg">{department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Groupe</p>
              <p className="font-semibold text-lg">{group}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Semestre</p>
              <p className="font-semibold text-lg">1er semestre 2025/2026</p>
            </div>
          </div>
        </Card>

        {/* Timetable */}
        <Card className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-border bg-primary text-primary-foreground p-3 text-center font-bold">
                  Horaire
                </th>
                <th className="border border-border bg-blue-100 p-3 text-center font-bold">Lundi</th>
                <th className="border border-border bg-blue-100 p-3 text-center font-bold">Mardi</th>
                <th className="border border-border bg-blue-100 p-3 text-center font-bold">Mercredi</th>
                <th className="border border-border bg-blue-100 p-3 text-center font-bold">Jeudi</th>
                <th className="border border-border bg-blue-100 p-3 text-center font-bold">Vendredi</th>
                <th className="border border-border bg-blue-100 p-3 text-center font-bold">Samedi</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, idx) => (
                <tr key={idx}>
                  <td className="border border-border bg-gray-50 p-2 text-center font-semibold whitespace-pre-line text-xs">
                    {row.time}
                  </td>
                  <td className="border border-border p-2 bg-blue-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.monday}</div>
                  </td>
                  <td className="border border-border p-2 bg-blue-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.tuesday}</div>
                  </td>
                  <td className="border border-border p-2 bg-blue-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.wednesday}</div>
                  </td>
                  <td className="border border-border p-2 bg-blue-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.thursday}</div>
                  </td>
                  <td className="border border-border p-2 bg-blue-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.friday}</div>
                  </td>
                  <td className="border border-border p-2 bg-blue-50 whitespace-pre-line text-xs h-32">
                    <div className="h-full flex items-center justify-center text-center">{row.saturday}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Legend */}
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Format:</span> Cours (Enseignant - Salle)
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}
