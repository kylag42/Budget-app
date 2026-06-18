import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { auth } from "@/firebase/firebase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
      }
    )

    return unsubscribe
  }, [])

  const logout = async () => {
    await signOut(auth)
  }

  return {
    user,
    logout,
  }
}