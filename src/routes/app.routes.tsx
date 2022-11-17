import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'
import { Platform } from 'react-native'

import { New } from '../screens/New'
import { Pools } from '../screens/Pools'
import { Find } from '../screens/Find'

export const AppRoutes = () => {
  const { Navigator, Screen } = createBottomTabNavigator()
  const { colors, sizes } = useTheme()
  const size = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: sizes[22],
          backgroundColor: colors.gray[800],
          borderTopWidth: 0
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -10 : 0
        },
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300]
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: 'Novo Bolão'
        }}
      />
      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: 'Meus Bolões'
        }}
      />
      <Screen
        name="find"
        component={Find}
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  )
}
