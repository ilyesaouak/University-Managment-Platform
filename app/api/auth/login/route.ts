import { type NextRequest, NextResponse } from "next/server"

// Real user database with accounts from all 4 departments
const realUsers = [
  // Admin
  {
    id: "1",
    email: "admin@university.edu",
    password: "password123",
    name: "Admin System",
    role: "admin",
    department: "Admin",
  },

  // Technologie de l'Information
  {
    id: "2",
    email: "director.ti@university.edu",
    password: "password123",
    name: "Haithem Hafsi",
    role: "director",
    department: "Technologie de l'information",
  },
  {
    id: "3",
    email: "teacher.ti1@university.edu",
    password: "password123",
    name: "Souhir HEDFI",
    role: "teacher",
    department: "Technologie de l'information",
  },
  {
    id: "4",
    email: "teacher.ti2@university.edu",
    password: "password123",
    name: "Iftikhar CHETOUI",
    role: "teacher",
    department: "Technologie de l'information",
  },
  {
    id: "5",
    email: "teacher.ti3@university.edu",
    password: "password123",
    name: "Rana RHILI",
    role: "teacher",
    department: "Technologie de l'information",
  },
  {
    id: "6",
    email: "teacher.ti4@university.edu",
    password: "password123",
    name: "Taheya BACCARI",
    role: "teacher",
    department: "Technologie de l'information",
  },
  {
    id: "7",
    email: "teacher.ti5@university.edu",
    password: "password123",
    name: "Ibrahim CHRAIT",
    role: "teacher",
    department: "Technologie de l'information",
  },
  {
    id: "8",
    email: "student.ti1@university.edu",
    password: "password123",
    name: "Yassine Ben Ahmed",
    role: "student",
    department: "Technologie de l'information",
  },
  {
    id: "9",
    email: "student.ti2@university.edu",
    password: "password123",
    name: "Amina Khalil",
    role: "student",
    department: "Technologie de l'information",
  },
  {
    id: "10",
    email: "student.ti3@university.edu",
    password: "password123",
    name: "Mohamed Triki",
    role: "student",
    department: "Technologie de l'information",
  },
  {
    id: "11",
    email: "student.ti4@university.edu",
    password: "password123",
    name: "Hana Zahra",
    role: "student",
    department: "Technologie de l'information",
  },
  {
    id: "12",
    email: "student.ti5@university.edu",
    password: "password123",
    name: "Ali Tounsi",
    role: "student",
    department: "Technologie de l'information",
  },

  // Génie Mécanique
  {
    id: "13",
    email: "director.gm@university.edu",
    password: "password123",
    name: "Hassen CHRAYGA",
    role: "director",
    department: "Génie Mécanique",
  },
  {
    id: "14",
    email: "teacher.gm1@university.edu",
    password: "password123",
    name: "Tawfik Zouaghi",
    role: "teacher",
    department: "Génie Mécanique",
  },
  {
    id: "15",
    email: "teacher.gm2@university.edu",
    password: "password123",
    name: "Mansouri Ahmed",
    role: "teacher",
    department: "Génie Mécanique",
  },
  {
    id: "16",
    email: "teacher.gm3@university.edu",
    password: "password123",
    name: "Benchikh Riad",
    role: "teacher",
    department: "Génie Mécanique",
  },
  {
    id: "17",
    email: "teacher.gm4@university.edu",
    password: "password123",
    name: "Jadi Nemri",
    role: "teacher",
    department: "Génie Mécanique",
  },
  {
    id: "18",
    email: "teacher.gm5@university.edu",
    password: "password123",
    name: "Amoussi Farah",
    role: "teacher",
    department: "Génie Mécanique",
  },
  {
    id: "19",
    email: "student.gm1@university.edu",
    password: "password123",
    name: "Karim Mechani",
    role: "student",
    department: "Génie Mécanique",
  },
  {
    id: "20",
    email: "student.gm2@university.edu",
    password: "password123",
    name: "Fatima Saleh",
    role: "student",
    department: "Génie Mécanique",
  },
  {
    id: "21",
    email: "student.gm3@university.edu",
    password: "password123",
    name: "Amir Bouaziz",
    role: "student",
    department: "Génie Mécanique",
  },
  {
    id: "22",
    email: "student.gm4@university.edu",
    password: "password123",
    name: "Leila Moradi",
    role: "student",
    department: "Génie Mécanique",
  },
  {
    id: "23",
    email: "student.gm5@university.edu",
    password: "password123",
    name: "Nadir Bahri",
    role: "student",
    department: "Génie Mécanique",
  },

  // Génie Civil
  {
    id: "24",
    email: "director.gc@university.edu",
    password: "password123",
    name: "Abdelaziz BEN NASR",
    role: "director",
    department: "Génie Civil",
  },
  {
    id: "25",
    email: "teacher.gc1@university.edu",
    password: "password123",
    name: "Rekik Hassan",
    role: "teacher",
    department: "Génie Civil",
  },
  {
    id: "26",
    email: "teacher.gc2@university.edu",
    password: "password123",
    name: "Belgacem Zahra",
    role: "teacher",
    department: "Génie Civil",
  },
  {
    id: "27",
    email: "teacher.gc3@university.edu",
    password: "password123",
    name: "Haddad Slimane",
    role: "teacher",
    department: "Génie Civil",
  },
  {
    id: "28",
    email: "teacher.gc4@university.edu",
    password: "password123",
    name: "Chouqui Mohamed",
    role: "teacher",
    department: "Génie Civil",
  },
  {
    id: "29",
    email: "teacher.gc5@university.edu",
    password: "password123",
    name: "Ellouch Hassan",
    role: "teacher",
    department: "Génie Civil",
  },
  {
    id: "30",
    email: "student.gc1@university.edu",
    password: "password123",
    name: "Omar Civil",
    role: "student",
    department: "Génie Civil",
  },
  {
    id: "31",
    email: "student.gc2@university.edu",
    password: "password123",
    name: "Zahra Kadri",
    role: "student",
    department: "Génie Civil",
  },
  {
    id: "32",
    email: "student.gc3@university.edu",
    password: "password123",
    name: "Samir Construction",
    role: "student",
    department: "Génie Civil",
  },
  {
    id: "33",
    email: "student.gc4@university.edu",
    password: "password123",
    name: "Nadia Brahim",
    role: "student",
    department: "Génie Civil",
  },
  {
    id: "34",
    email: "student.gc5@university.edu",
    password: "password123",
    name: "Hassan Azab",
    role: "student",
    department: "Génie Civil",
  },

  // Génie Électrique
  {
    id: "35",
    email: "director.ge@university.edu",
    password: "password123",
    name: "Imed LASSOUED",
    role: "director",
    department: "Génie Électrique",
  },
  {
    id: "36",
    email: "teacher.ge1@university.edu",
    password: "password123",
    name: "Ben Hamed Youssef",
    role: "teacher",
    department: "Génie Électrique",
  },
  {
    id: "37",
    email: "teacher.ge2@university.edu",
    password: "password123",
    name: "Houmia Mohamed",
    role: "teacher",
    department: "Génie Électrique",
  },
  {
    id: "38",
    email: "teacher.ge3@university.edu",
    password: "password123",
    name: "Takriuni Ahmed",
    role: "teacher",
    department: "Génie Électrique",
  },
  {
    id: "39",
    email: "teacher.ge4@university.edu",
    password: "password123",
    name: "Boubaker Wajdi",
    role: "teacher",
    department: "Génie Électrique",
  },
  {
    id: "40",
    email: "teacher.ge5@university.edu",
    password: "password123",
    name: "Saidi Zaineb",
    role: "teacher",
    department: "Génie Électrique",
  },
  {
    id: "41",
    email: "student.ge1@university.edu",
    password: "password123",
    name: "Khaled Electric",
    role: "student",
    department: "Génie Électrique",
  },
  {
    id: "42",
    email: "student.ge2@university.edu",
    password: "password123",
    name: "Mariam Cirkit",
    role: "student",
    department: "Génie Électrique",
  },
  {
    id: "43",
    email: "student.ge3@university.edu",
    password: "password123",
    name: "Nizar Charge",
    role: "student",
    department: "Génie Électrique",
  },
  {
    id: "44",
    email: "student.ge4@university.edu",
    password: "password123",
    name: "Layla Akbar",
    role: "student",
    department: "Génie Électrique",
  },
  {
    id: "45",
    email: "student.ge5@university.edu",
    password: "password123",
    name: "Rashed Energy",
    role: "student",
    department: "Génie Électrique",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, role } = body

    const user = realUsers.find((u) => u.email === email && u.password === password && u.role === role)

    if (!user) {
      return NextResponse.json({ message: "Identifiants invalides" }, { status: 401 })
    }

    // Generate mock token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department,
      },
    })
  } catch (error) {
    return NextResponse.json({ message: "Échec de la connexion" }, { status: 500 })
  }
}
