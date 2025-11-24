export interface User {
  id: string
  email: string
  name: string
  role: "student" | "teacher" | "director" | "admin"
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const userData = localStorage.getItem("user")
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export function isAuthenticated(): boolean {
  return getStoredToken() !== null && getStoredUser() !== null
}

export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}
