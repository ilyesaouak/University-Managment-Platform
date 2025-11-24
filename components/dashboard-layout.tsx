"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, X } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: string
  userName: string
}

export function DashboardLayout({ children, userRole, userName }: DashboardLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const navItems = {
    student: [
      { label: "Tableau de Bord", href: "/dashboard/student", icon: "📊" },
      { label: "Emploi du Temps", href: "/dashboard/student/schedule", icon: "📅" },
      { label: "Absences", href: "/dashboard/student/absences", icon: "📋" },
      { label: "Messages", href: "/dashboard/student/messages", icon: "💬" },
      { label: "Profil", href: "/dashboard/student/profile", icon: "👤" },
    ],
    teacher: [
      { label: "Tableau de Bord", href: "/dashboard/teacher", icon: "📊" },
      { label: "Mon Emploi du Temps", href: "/dashboard/teacher/schedule", icon: "📅" },
      { label: "Absences", href: "/dashboard/teacher/absences", icon: "✍️" },
      { label: "Messages", href: "/dashboard/teacher/messages", icon: "💬" },
      { label: "Profil", href: "/dashboard/teacher/profile", icon: "👤" },
    ],
    director: [
      { label: "Tableau de Bord", href: "/dashboard/director", icon: "📊" },
      { label: "Emplois du Temps", href: "/dashboard/director/schedules", icon: "📅" },
      { label: "Absences", href: "/dashboard/director/absences", icon: "📋" },
      { label: "Analyses", href: "/dashboard/director/analytics", icon: "📈" },
      { label: "Messages", href: "/dashboard/director/messages", icon: "💬" },
      { label: "Profil", href: "/dashboard/director/profile", icon: "👤" },
    ],
    admin: [
      { label: "Tableau de Bord", href: "/dashboard/admin", icon: "📊" },
      { label: "Utilisateurs", href: "/dashboard/admin/users", icon: "👥" },
      { label: "Départements", href: "/dashboard/admin/departments", icon: "🏢" },
      { label: "Emplois du Temps", href: "/dashboard/admin/schedules", icon: "📅" },
      { label: "Analyses", href: "/dashboard/admin/analytics", icon: "📈" },
      { label: "Messages", href: "/dashboard/admin/messages", icon: "💬" },
      { label: "Paramètres", href: "/dashboard/admin/settings", icon: "⚙️" },
    ],
  }

  const items = navItems[userRole as keyof typeof navItems] || []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-muted rounded-lg">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                <img
      src="https://iset.uvt.tn/pluginfile.php/1/theme_lambda/logo/1756369462/iset_logo.png"
      alt="ISET Logo"
      className="w-10 h-10 object-contain"
    />
              </div>
              <h1 className="font-bold text-lg">ISET Manager</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {userRole === "student" && "Étudiant"}
                {userRole === "teacher" && "Enseignant"}
                {userRole === "director" && "Directeur"}
                {userRole === "admin" && "Administrateur"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 border-r border-border bg-sidebar p-4">
            <nav className="space-y-2">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
