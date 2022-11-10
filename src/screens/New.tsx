import { Heading, Text, VStack } from 'native-base'

import Logo from './../assets/logo.svg'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const New = () => {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Criar novo bolão" />
      <VStack alignItems="center" mt={8} mx={5}>
        <Logo />
        <Heading fontSize="xl" fontFamily="heading" textAlign="center" color="white" my={8}>
          Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
        </Heading>
        <Input mb={2} placeholder="Qual é o nome do bolão?" />
        <Button title="CRIAR MEU BOLÃO" />
        <Text fontSize="sm" textAlign="center" color="gray.200" mt={4} px={10}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas
        </Text>
      </VStack>

    </VStack>
  )
}
