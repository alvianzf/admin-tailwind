/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import * as authService from '../../services/authService'

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('auth')
    return storedAuth ? JSON.parse(storedAuth) : false
  })
  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem('username')
    return storedUsername ? JSON.parse(storedUsername) : '--'
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(isAuthenticated))
    localStorage.setItem('username', JSON.stringify(username))
  }, [isAuthenticated, username])

  const login = async (username, password) => {
    try {
      const loginResult = await authService.login({username, password})
      setIsAuthenticated(true)
      setUsername(username)
      return loginResult
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('auth') // Clear localStorage on logout
  }

  const value = {
    setIsAuthenticated,
    isAuthenticated,
    login,
    logout,
    username,
    setUsername
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
