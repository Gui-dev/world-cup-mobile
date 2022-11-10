import { Icon, VStack } from 'native-base'
import { Octicons } from '@expo/vector-icons'

import { Header } from '../components/Header'
import { Button } from '../components/Button'

export const Pools = () => {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />
      <VStack mt={6} mx={5} mb={4} pb={4} borderBottomWidth={1} borderBottomColor="gray.600">
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" size="md" color="black" />}
        />
      </VStack>
    </VStack>
  )
}
