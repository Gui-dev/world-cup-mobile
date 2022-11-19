import { useState } from 'react'
import { Heading, Text, useToast, VStack } from 'native-base'

import { api } from '../services/api'

import Logo from './../assets/logo.svg'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const New = () => {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handlePoolCreate = async () => {
    try {
      if (!title.trim()) {
        toast.show({
          title: 'Opsssss',
          description: 'Você deve dá um nome para o bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
        return
      }
      setIsLoading(true)
      await api.post('/pools', { title })
      toast.show({
        title: 'Sucesso',
        description: 'Seu bolão foi criado',
        placement: 'top',
        bgColor: 'green.500'
      })
      setTitle('')
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Error',
        description: 'Não foi possivel criar um bolão',
        placement: 'top',
        bgColor: 'red.900'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Criar novo bolão" />
      <VStack alignItems="center" mt={8} mx={5}>
        <Logo />
        <Heading fontSize="xl" fontFamily="heading" textAlign="center" color="white" my={8}>
          Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
        </Heading>
        <Input
          mb={2}
          placeholder="Qual é o nome do bolão?"
          value={title}
          onChangeText={setTitle}
        />
        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
          _loading={{
            _spinner: { color: 'gray.900' }
          }}
        />
        <Text fontSize="sm" textAlign="center" color="gray.200" mt={4} px={10}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas
        </Text>
      </VStack>

    </VStack>
  )
}
