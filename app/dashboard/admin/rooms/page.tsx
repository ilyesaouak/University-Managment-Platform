"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

interface Room {
  id: string
  code: string
  type: string
  capacity: number
  building: string
  floor: number
}

export default function RoomsPage() {
  const router = useRouter()
  const [rooms, setRooms] = useState<Room[]>([])
  const [showModal, setShowModal] = useState(false)
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

    loadRooms()
  }, [router])

  const loadRooms = () => {
    const mockRooms: Room[] = [
      { id: "1", code: "101", type: "Lecture", capacity: 60, building: "A", floor: 1 },
      { id: "2", code: "102", type: "Lecture", capacity: 45, building: "A", floor: 1 },
      { id: "3", code: "201", type: "Lab", capacity: 30, building: "B", floor: 2 },
      { id: "4", code: "202", type: "Lab", capacity: 30, building: "B", floor: 2 },
      { id: "5", code: "301", type: "Seminar", capacity: 25, building: "C", floor: 3 },
    ]
    setRooms(mockRooms)
    setIsLoading(false)
  }

  const handleAddRoom = (data: any) => {
    const room: Room = { id: Math.random().toString(), ...data }
    setRooms([...rooms, room])
    setShowModal(false)
  }

  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter((r) => r.id !== id))
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Rooms</h1>
            <p className="text-muted-foreground">Manage classrooms and facilities</p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <Card key={room.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Room {room.code}</h3>
                    <p className="text-sm text-muted-foreground">
                      {room.building}-{room.floor} • {room.type}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    Capacity: <span className="font-semibold text-foreground">{room.capacity} students</span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-900 shadow-2xl border-2 border-primary/20">
              <h2 className="text-xl font-bold mb-4 text-foreground">Add Room</h2>
              <RoomForm onSubmit={handleAddRoom} onCancel={() => setShowModal(false)} />
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function RoomForm({ onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    code: "",
    type: "Lecture",
    capacity: 30,
    building: "A",
    floor: 1,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Room Code</label>
        <Input
          placeholder="Room Code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          required
          className="bg-background text-foreground border-border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Room Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
        >
          <option value="Lecture">Lecture Hall</option>
          <option value="Lab">Laboratory</option>
          <option value="Seminar">Seminar Room</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Capacity</label>
        <Input
          type="number"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
          className="bg-background text-foreground border-border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Building</label>
        <Input
          placeholder="Building"
          value={formData.building}
          onChange={(e) => setFormData({ ...formData, building: e.target.value })}
          className="bg-background text-foreground border-border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-foreground">Floor</label>
        <Input
          type="number"
          placeholder="Floor"
          value={formData.floor}
          onChange={(e) => setFormData({ ...formData, floor: Number.parseInt(e.target.value) })}
          className="bg-background text-foreground border-border"
        />
      </div>
      <div className="flex gap-2 justify-end pt-4 border-t border-border">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Room</Button>
      </div>
    </form>
  )
}
