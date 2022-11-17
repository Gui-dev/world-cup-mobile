import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '../hooks/useAuth'
import { AppRoutes } from './app.routes'
import { SignIn } from '../screens/SignIn'

export const Routes = () => {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {
        user
          ? <AppRoutes />
          : <SignIn />
      }
    </NavigationContainer>
  )
}
