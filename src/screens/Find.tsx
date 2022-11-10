import { Heading, VStack } from 'native-base'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const Find = () => {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack alignItems="center" mt={8} mx={5}>
        <Heading fontSize="xl" fontFamily="heading" textAlign="center" color="white" mb={8}>
          Encontre um bolão através{'\n'} de seu código único
        </Heading>
        <Input mb={2} placeholder="Qual é o código do bolão?" />
        <Button title="BUSCAR BOLÃO" />
      </VStack>

    </VStack>
  )
}
