import { createContext, ReactNode, useEffect, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { api } from './../services/api'

type UserProps = {
  name: string
  avatarUrl: string
}

export type AuthContextProps = {
  user: UserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

WebBrowser.maybeCompleteAuthSession()

export const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.GOOGLE_ID_CLIENT,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  const signIn = async () => {
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  const signInWithGoogle = async (access_token: string) => {
    try {
      setIsUserLoading(true)
      const { data } = await api.post('/users', { access_token })
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`
      const { data: userInfoResponse } = await api.get('/me')
      setUser(userInfoResponse.user)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if (response && response.type === 'success' && response.authentication.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
