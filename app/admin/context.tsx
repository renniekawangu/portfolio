'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadSession = async () => {
      try {
        const response = await fetch('/api/admin/auth/session', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store',
        })

        if (isMounted) {
          setIsAuthenticated(response.ok)
        }
      } catch {
        if (isMounted) {
          setIsAuthenticated(false)
        }
      } finally {
        if (isMounted) {
          setIsLoaded(true)
        }
      }
    }

    loadSession()

    return () => {
      isMounted = false
    }
  }, [])

  const login = async (password: string): Promise<boolean> => {
    const response = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ password }),
    })

    if (response.ok) {
      setIsAuthenticated(true)
      return true
    }

    return false
  }

  const logout = async () => {
    await fetch('/api/admin/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })

    setIsAuthenticated(false)
  }

  if (!isLoaded) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
