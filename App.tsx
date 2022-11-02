import { StatusBar } from 'expo-status-bar'
import { Box, NativeBaseProvider } from 'native-base'
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'

import { THEME } from './src/utils/theme'

export default function App () {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Box>Hello world</Box>
    </NativeBaseProvider>
  )
}
