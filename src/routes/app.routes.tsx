import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { New } from '../screens/New'
import { Pools } from '../screens/Pools'
import { Find } from '../screens/Find'

export const AppRoutes = () => {
  const { Navigator, Screen } = createBottomTabNavigator()

  return (
    <Navigator>
      <Screen name="new" component={New} />
      <Screen name="pools" component={Pools} />
      <Screen name="search" component={Find} />
    </Navigator>
  )
}
