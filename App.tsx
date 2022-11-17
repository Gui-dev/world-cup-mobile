import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { THEME } from './src/utils/theme'
import { AuthContextProvider } from './src/contexts/AuthContext'
import { Loading } from './src/components/Loading'
import { Routes } from './src/routes'

export default function App () {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return (
      <NativeBaseProvider theme={THEME}>
        <Loading />
      </NativeBaseProvider>
    )
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
